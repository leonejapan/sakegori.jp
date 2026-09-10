import { Noto_Serif, Noto_Sans } from "next/font/google";

// next/font/google's bundled subset metadata for the CJK Noto families (JP/SC/KR)
// is incomplete in this Next.js version (missing the japanese/chinese-simplified/korean
// subsets), so those are loaded via a classic Google Fonts <link> stylesheet in the root
// layout instead. Latin fonts work fine through next/font and stay self-hosted here.
export const notoSerifEn = Noto_Serif({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif-en",
  display: "swap",
});
export const notoSansEn = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-en",
  display: "swap",
});

export const allFontVariables = [notoSerifEn.variable, notoSansEn.variable].join(" ");

export const googleFontsCjkHref =
  "https://fonts.googleapis.com/css2?" +
  [
    "family=Noto+Serif+JP:wght@500;600;700",
    "family=Noto+Sans+JP:wght@400;500;600",
    "family=Noto+Serif+SC:wght@500;600;700",
    "family=Noto+Sans+SC:wght@400;500;600",
    "family=Noto+Serif+KR:wght@500;600;700",
    "family=Noto+Sans+KR:wght@400;500;600",
  ].join("&") +
  "&display=swap";
