"use client";

import type { FormEvent, ReactNode } from "react";
import { ChevronDownIcon, ChevronRightIcon, DocIcon, MailIcon, PhoneIcon, UserIcon } from "./icons";

export interface EnquiryFormProps {
  labelledBy: string;
  interestOptions: readonly string[];
  labels: {
    fullName: string;
    mobile: string;
    email: string;
    interest: string;
    subject: string;
    submit: string;
  };
}

// Figma desktop (measured): field 58 high, radius 8, 1px border #FFF0DB at 25%, padding 12 with gap 14, icon 24,
// text Lato 500 18/22.6 Light. Row gap 28, column gap 30, textarea 143 high, button 48 high (179 wide, radius 50,
// padding 10 10 10 16, gap 12). Tablet and phone values are estimated from the canvas
// (TODO(figma): field 52, text 16 / 14, textarea 124, button 253 wide on tablet and full width on phone).
// From lg (1024 to 1279) the column gap and the text shrink so the right column still fits.
const styles = {
  form: "flex flex-col gap-9.25",
  grid: "grid grid-cols-1 gap-y-7 lg:grid-cols-2 lg:gap-x-4 xl:gap-x-7.5",
  field:
    "relative flex h-13 items-center gap-2.5 rounded-lg border border-secondary/25 px-3 focus-within:border-accent lg:h-14.5 lg:gap-3.5",
  icon: "size-5 shrink-0 text-light lg:size-6",
  rule: "h-5 w-px shrink-0 bg-light/40 lg:h-6",
  control:
    "min-w-0 flex-1 bg-transparent text-sm font-medium text-light outline-none placeholder:text-light tab:text-base lg:text-sm xl:text-lg xl:leading-[22.6px]",
  select: "w-full appearance-none pr-6 [&>option]:bg-gradient-stop-5 [&>option]:text-light",
  chevron: "pointer-events-none absolute right-3 size-4 text-light",
  textarea:
    "h-31 rounded-lg border border-secondary/25 px-3 py-4 focus-within:border-accent lg:col-span-2 lg:h-35.75",
  textareaControl:
    "size-full resize-none bg-transparent text-sm font-medium text-light outline-none placeholder:text-light tab:text-base lg:text-sm xl:text-lg xl:leading-[22.6px]",
  submit:
    "flex h-10.5 w-full items-center justify-center gap-3 rounded-full bg-accent py-2.5 pr-2.5 pl-4 text-base font-bold tracking-[0.01em] text-primary tab:mx-auto tab:w-63.25 lg:h-12 lg:w-fit",
  arrow: "grid size-7 place-items-center rounded-full bg-primary text-accent",
} as const;

function Field({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <label className={styles.field}>
      <span className="sr-only">{label}</span>
      {icon}
      <span aria-hidden="true" className={styles.rule} />
      {children}
    </label>
  );
}

export function EnquiryForm({ labelledBy, interestOptions, labels }: EnquiryFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(client): send the enquiry (API route or email service). Nothing is sent yet.
  }

  return (
    <form aria-labelledby={labelledBy} onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.grid}>
        <Field icon={<UserIcon className={styles.icon} />} label={labels.fullName}>
          <input
            type="text"
            name="fullName"
            autoComplete="name"
            required
            placeholder={labels.fullName}
            className={styles.control}
          />
        </Field>

        <Field icon={<PhoneIcon className={styles.icon} />} label={labels.mobile}>
          <input
            type="tel"
            name="mobile"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder={labels.mobile}
            className={styles.control}
          />
        </Field>

        <Field icon={<MailIcon className={styles.icon} />} label={labels.email}>
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder={labels.email}
            className={styles.control}
          />
        </Field>

        <Field icon={<DocIcon className={styles.icon} />} label={labels.interest}>
          <select
            name="interest"
            required
            defaultValue=""
            className={`${styles.control} ${styles.select}`}
          >
            <option value="" disabled>
              {labels.interest}
            </option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDownIcon className={styles.chevron} />
        </Field>

        <label className={styles.textarea}>
          <span className="sr-only">{labels.subject}</span>
          <textarea
            name="subject"
            placeholder={labels.subject}
            className={styles.textareaControl}
          />
        </label>
      </div>

      <button type="submit" className={styles.submit}>
        {labels.submit}
        <span className={styles.arrow}>
          <ChevronRightIcon className="size-3.5" />
        </span>
      </button>
    </form>
  );
}
