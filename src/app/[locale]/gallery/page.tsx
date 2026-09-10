import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import Reveal from "@/components/Reveal";
import GalleryGrid, { type GalleryTile } from "@/components/GalleryGrid";
import { galleryProducts, gallerySpaceImages } from "@/data/gallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "galleryPage" });
  return { title: `${t("title")} — 酒氷 SAKEGORI` };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("galleryPage");
  const tItems = await getTranslations("menuPage.items");
  const tPreview = await getTranslations("menuPreview");

  const productTiles: GalleryTile[] = galleryProducts.map((p) => {
    const name =
      p.flavor === "seasonal"
        ? p.variant === "alcohol"
          ? t("seasonalAlcoholName")
          : t("seasonalNonAlcoholName")
        : p.variant === "alcohol" && tItems.has(`${p.flavor}.nameAlcohol`)
          ? tItems(`${p.flavor}.nameAlcohol`)
          : tItems(`${p.flavor}.name`);

    return {
      id: p.id,
      image: p.image,
      caption: name,
      subCaption: p.variant === "alcohol" ? tPreview("alcoholTag") : tPreview("nonAlcoholTag"),
    };
  });

  const spaceTiles: GalleryTile[] = gallerySpaceImages.map((image, i) => ({
    id: `space-${i}`,
    image,
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="text-center">
          <h1 className="font-heading text-4xl text-navy sm:text-5xl">{t("title")}</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm text-navy/60 sm:text-base">{t("subtitle")}</p>
        </div>
      </Reveal>

      <div className="mt-16 sm:mt-20">
        <h2 className="text-center font-heading text-2xl text-navy sm:text-3xl">{t("spaceTitle")}</h2>
        <div className="mx-auto mt-1 h-px w-12 bg-gold" />
        <div className="mt-8">
          <GalleryGrid tiles={spaceTiles} aspect="aspect-[3/4]" />
        </div>
      </div>

      <div className="mt-20 sm:mt-24">
        <h2 className="text-center font-heading text-2xl text-navy sm:text-3xl">{t("productTitle")}</h2>
        <div className="mx-auto mt-1 h-px w-12 bg-gold" />
        <div className="mt-8">
          <GalleryGrid tiles={productTiles} aspect="aspect-square" />
        </div>
      </div>
    </div>
  );
}
