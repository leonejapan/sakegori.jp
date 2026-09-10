export type KakigoriId = "white" | "black" | "matcha" | "coffee" | "seasonal";
export type DrinkId = "cafeLatte" | "matchaLatte" | "brownSugarLatte" | "kabosuSoda";
export type ToppingId = "condensedMilk" | "shavedBrownSugar" | "roastedSoybeanFlour";

export const kakigoriIds: KakigoriId[] = ["white", "black", "matcha", "coffee", "seasonal"];

export const kakigoriPrices: Record<KakigoriId, number> = {
  white: 990,
  black: 990,
  matcha: 990,
  coffee: 990,
  seasonal: 1200,
};

export const drinkIds: DrinkId[] = ["cafeLatte", "matchaLatte", "brownSugarLatte", "kabosuSoda"];

export const drinkPrice = 650;

export type CutoutImage = { src: string; width: number; height: number; scale?: number };

// Background-removed cutout photography (floats freely, no card/frame — see
// MenuScrollStrip / DrinkGrid). width/height are each cutout's real trimmed
// pixel size, required by next/image to preserve aspect ratio. `scale` is an
// optional visual-weight correction: Kabosu Soda's crop includes a kabosu
// slice garnish extending above/beside the cup, so the cup itself reads
// smaller than the other drinks' cups at the same frame height — scaled up
// to match their visual size.
export const drinkImages: Record<DrinkId, CutoutImage> = {
  cafeLatte: { src: "/images/cutout-cafe-latte.png", width: 663, height: 807 },
  matchaLatte: { src: "/images/cutout-matcha-latte.png", width: 664, height: 808 },
  brownSugarLatte: { src: "/images/cutout-brown-sugar-latte.png", width: 660, height: 805 },
  kabosuSoda: { src: "/images/cutout-kabosu-soda.png", width: 818, height: 961, scale: 1.22 },
};

// Real per-flavor kakigori cutout photography, separate for the Alcohol and
// Non-Alcohol version of each flavor (the Seasonal flavor differs between the
// two: Plum Black Tea for Alcohol, Kabosu for Non-Alcohol).
export const kakigoriAlcoholImages: Record<KakigoriId, CutoutImage> = {
  white: { src: "/images/cutout-kakigori-white-alcohol.png", width: 1080, height: 1350 },
  black: { src: "/images/cutout-kakigori-black-alcohol.png", width: 1080, height: 1350 },
  matcha: { src: "/images/cutout-kakigori-matcha-alcohol.png", width: 1080, height: 1350 },
  coffee: { src: "/images/cutout-kakigori-coffee-alcohol.png", width: 1080, height: 1350 },
  seasonal: { src: "/images/cutout-kakigori-seasonal-alcohol.png", width: 1080, height: 1350 },
};

export const kakigoriNonAlcoholImages: Record<KakigoriId, CutoutImage> = {
  white: { src: "/images/cutout-kakigori-white-nonalcohol.png", width: 1080, height: 1350 },
  black: { src: "/images/cutout-kakigori-black-nonalcohol.png", width: 1080, height: 1350 },
  matcha: { src: "/images/cutout-kakigori-matcha-nonalcohol.png", width: 1080, height: 1350 },
  coffee: { src: "/images/cutout-kakigori-coffee-nonalcohol.png", width: 1080, height: 1350 },
  seasonal: { src: "/images/cutout-kakigori-seasonal-nonalcohol.png", width: 1080, height: 1350 },
};

export const toppingIds: ToppingId[] = ["condensedMilk", "shavedBrownSugar", "roastedSoybeanFlour"];

export const toppingPrice = 100;

// Alcohol kakigori item name differs from the shared kakigori name for "matcha"
// on the printed menu (酒氷 SAKEGORI Menu A4 Landscape.pdf): the alcohol version
// is styled "Matcha Latte" / 抹茶ラテ while the non-alcohol version stays "Matcha" / 抹茶.
export const kakigoriAlcoholNameOverrideIds: KakigoriId[] = ["matcha"];

export type SakeId = "yuzuSparkling" | "juliaSparkling" | "todaysSake";

export const sakeIds: SakeId[] = ["yuzuSparkling", "juliaSparkling", "todaysSake"];

export const sakeInfo: Record<SakeId, { price: number; abv?: string; volume?: string }> = {
  yuzuSparkling: { price: 1980, abv: "4%", volume: "250ml" },
  juliaSparkling: { price: 1980, abv: "5%", volume: "250ml" },
  todaysSake: { price: 660 },
};

// 酒氷 SET: any kakigori + any drink, bundled
export const setPrice = 1500;
export const setPriceSeasonal = 1800;

export const yen = (amount: number) => `¥${amount.toLocaleString("en-US")}`;
