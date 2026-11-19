export interface GalleryImage {
  src: string;
  alt: string;
}

export interface RecognisedForExcellenceData {
  name: string; // "Teejaswinni K Lokesh"
  heading: string; // "Recognised for Excellence"
  description: string; // contains the "{name}" placeholder
  images: GalleryImage[]; // exactly 5, first = featured big image
}

export const defaultRecognisedForExcellence: RecognisedForExcellenceData = {
  name: "Teejaswinni K Lokesh",
  heading: "Recognised for Excellence",
  description:
    "A glimpse into the moments that reflect {name}’s passion for learning, teaching, and guiding others.",
  images: [
    {
      src: "/images/recognized-for-excellence/excellence-image-lg.webp",
      alt: "Teejaswinni K Lokesh recognised for excellence featured photo",
    },
    {
      src: "/images/recognized-for-excellence/excellence-image-sm-1.webp",
      alt: "Teejaswinni K Lokesh gallery photo 1",
    },
    {
      src: "/images/recognized-for-excellence/excellence-image-sm-2.webp",
      alt: "Teejaswinni K Lokesh gallery photo 2",
    },
    {
      src: "/images/recognized-for-excellence/excellence-image-sm-3.webp",
      alt: "Teejaswinni K Lokesh gallery photo 3",
    },
    {
      src: "/images/recognized-for-excellence/excellence-image-sm-4.webp",
      alt: "Teejaswinni K Lokesh gallery photo 4",
    },
  ],
};
