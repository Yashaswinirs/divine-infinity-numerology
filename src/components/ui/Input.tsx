import * as React from "react";
import { cn } from "@/lib";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      helperText,
      error,
      iconLeft,
      iconRight,
      id,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold tracking-wide text-[#1e1633]"
          >
            {label}
            {required && <span className="ml-1 text-[#8061a5]">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {iconLeft && (
            <div className="pointer-events-none absolute left-3.5 flex items-center text-neutral-400">
              {iconLeft}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              // TODO(figma): Verify input height (h-11 / 44px), padding (px-3.5), and radius (rounded-xl) against Figma
              "flex h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-[#1e1633] shadow-2xs transition-colors",
              "placeholder:text-neutral-400",
              "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-hidden",
              iconLeft && "pl-10",
              iconRight && "pr-10",
              error
                ? // TODO(figma): Verify error border and ring color against Figma
                  "border-red-500 focus-visible:ring-red-500"
                : // TODO(figma): Verify input border color #e5dff0 against Figma tokens
                  "border-[#e5dff0] focus-visible:border-[#8061a5] focus-visible:ring-[#8061a5]",
              disabled && "cursor-not-allowed bg-neutral-100 opacity-50",
              className
            )}
            {...props}
          />

          {iconRight && (
            <div className="absolute right-3.5 flex items-center text-neutral-400">{iconRight}</div>
          )}
        </div>

        {error && (
          <p id={errorId} className="animate-fadeIn text-xs font-medium text-red-600">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-[#8c8c8c]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
