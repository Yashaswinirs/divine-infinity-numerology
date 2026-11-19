export interface RecognitionCardData {
  id?: string;
  title: string;
  description: string;
  boldHighlight?: string;
  leftLeafIcon?: string;
  rightLeafIcon?: string;
}

export interface RecognitionData {
  name: string;
  heading: string;
  description: string;
  card: RecognitionCardData;
}

export const defaultRecognition: RecognitionData = {
  name: "Teejaswinni",
  heading: "Recognition Along the Journey",
  description:
    "Every milestone reflects {name}'s dedication to continuous learning and her commitment to helping others through knowledge and guidance.",
  card: {
    id: "recognition-card-1",
    title: "Top 30 Numerologists National Numerology Conference",
    description:
      "Honoured as one of the Top 30 Numerologists at the National Numerology Conference held in February 2025, presented by Arviend Sud.",
    boldHighlight: "Arviend Sud",
    leftLeafIcon: "/images/recognition/gold-leaves-left.svg",
    rightLeafIcon: "/images/recognition/gold-leaves-right.svg",
  },
};
