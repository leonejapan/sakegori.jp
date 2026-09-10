import type { KakigoriId } from "./menu";

export type GalleryProductEntry = {
  id: string;
  flavor: KakigoriId;
  variant: "alcohol" | "nonAlcohol";
  image: string;
};

// Ordered so each flavor's Alcohol / Non-Alcohol pair sits together.
export const galleryProducts: GalleryProductEntry[] = [
  { id: "white-alcohol", flavor: "white", variant: "alcohol", image: "/images/gallery/product-white-alcohol.jpg" },
  { id: "white-nonalcohol", flavor: "white", variant: "nonAlcohol", image: "/images/gallery/product-white-nonalcohol.jpg" },
  { id: "black-alcohol", flavor: "black", variant: "alcohol", image: "/images/gallery/product-black-alcohol.jpg" },
  { id: "black-nonalcohol", flavor: "black", variant: "nonAlcohol", image: "/images/gallery/product-black-nonalcohol.jpg" },
  { id: "matcha-alcohol", flavor: "matcha", variant: "alcohol", image: "/images/gallery/product-matcha-alcohol.jpg" },
  { id: "matcha-nonalcohol", flavor: "matcha", variant: "nonAlcohol", image: "/images/gallery/product-matcha-nonalcohol.jpg" },
  { id: "coffee-alcohol", flavor: "coffee", variant: "alcohol", image: "/images/gallery/product-coffee-alcohol.jpg" },
  { id: "coffee-nonalcohol", flavor: "coffee", variant: "nonAlcohol", image: "/images/gallery/product-coffee-nonalcohol.jpg" },
  { id: "seasonal-alcohol", flavor: "seasonal", variant: "alcohol", image: "/images/gallery/product-seasonal-alcohol.jpg" },
  { id: "seasonal-nonalcohol", flavor: "seasonal", variant: "nonAlcohol", image: "/images/gallery/product-seasonal-nonalcohol.jpg" },
];

export const gallerySpaceImages: string[] = Array.from(
  { length: 8 },
  (_, i) => `/images/gallery/space-${String(i + 1).padStart(2, "0")}.jpg`
);
