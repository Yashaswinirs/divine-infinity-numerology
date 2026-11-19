import { InsightsCta } from "@/components/shared";
import { contactInsightsContent } from "@/data/contact";

export function ContactInsights() {
  const { title, text, cta, image } = contactInsightsContent;

  return (
    <InsightsCta
      titleId="contact-insights-title"
      title={title}
      text={text}
      cta={cta}
      image={image}
    />
  );
}
