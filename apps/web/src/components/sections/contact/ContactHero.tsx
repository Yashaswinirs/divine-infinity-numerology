import { PageHero } from "@/components/shared";
import { contactHeroContent } from "@/data/contact";

export function ContactHero() {
  const { title, paragraphs, compactParagraphs, background, image } = contactHeroContent;

  return (
    <PageHero
      titleId="contact-hero-heading"
      title={title}
      paragraphs={paragraphs}
      compactParagraphs={compactParagraphs}
      background={background}
      image={image}
    />
  );
}
