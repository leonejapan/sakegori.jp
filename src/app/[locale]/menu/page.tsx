import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import Reveal from "@/components/Reveal";
import DrinkGrid from "@/components/DrinkGrid";
import {
  kakigoriIds,
  kakigoriPrices,
  kakigoriAlcoholImages,
  kakigoriNonAlcoholImages,
  drinkIds,
  drinkPrice,
  drinkImages,
  toppingIds,
  toppingPrice,
  sakeIds,
  sakeInfo,
  setPrice,
  setPriceSeasonal,
  yen,
  type CutoutImage,
} from "@/data/menu";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menuPage" });
  return { title: `${t("title")} — 酒氷 SAKEGORI` };
}

function KakigoriList({
  variant,
  items,
}: {
  variant: "Alcohol" | "NonAlcohol";
  items: { id: string; name: string; description: string; price: number; image: CutoutImage }[];
}) {
  return (
    <ul className="divide-y divide-navy/10">
      {items.map((item) => (
        <li key={`${variant}-${item.id}`} className="flex items-center gap-4 py-5 first:pt-0">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center sm:h-24 sm:w-24">
            <Image
              src={item.image.src}
              alt={item.name}
              width={item.image.width}
              height={item.image.height}
              className="floating-shadow h-full w-full object-contain"
              sizes="96px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-lg text-navy sm:text-xl">{item.name}</h3>
              <span className="whitespace-nowrap font-heading text-lg text-gold">{yen(item.price)}</span>
            </div>
            <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-navy/65">{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("menuPage");
  const tItems = await getTranslations("menuPage.items");

  const alcoholItems = kakigoriIds.map((id) => ({
    id,
    name: tItems.has(`${id}.nameAlcohol`) ? tItems(`${id}.nameAlcohol`) : tItems(`${id}.name`),
    description: tItems(`${id}.descriptionAlcohol`),
    price: kakigoriPrices[id],
    image: kakigoriAlcoholImages[id],
  }));

  const nonAlcoholItems = kakigoriIds.map((id) => ({
    id,
    name: tItems(`${id}.name`),
    description: tItems(`${id}.descriptionNonAlcohol`),
    price: kakigoriPrices[id],
    image: kakigoriNonAlcoholImages[id],
  }));

  const toppingItems = toppingIds.map((id) => ({
    id,
    name: tItems(`${id}.name`),
    description: tItems(`${id}.description`),
  }));

  const tSake = await getTranslations("menuPage.sakeItems");
  const sakeItems = sakeIds.map((id) => ({
    id,
    name: tSake(`${id}.name`),
    description: tSake(`${id}.description`),
    ...sakeInfo[id],
  }));

  const drinkGridItems = drinkIds.map((id) => ({
    id,
    name: tItems(`${id}.name`),
    description: tItems(`${id}.description`),
    priceLabel: yen(drinkPrice),
    image: drinkImages[id],
  }));

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="text-center">
          <h1 className="font-heading text-4xl text-navy sm:text-5xl">{t("title")}</h1>
          <p className="mt-3 text-sm text-navy/60 sm:text-base">{t("subtitle")}</p>
        </div>
      </Reveal>

      {/* Kakigori */}
      <Reveal>
        <div className="mt-16 grid gap-12 sm:mt-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-heading text-2xl text-navy">{t("kakigoriAlcoholTitle")}</h2>
            <div className="mt-1 h-px w-12 bg-gold" />
            <div className="mt-6">
              <KakigoriList variant="Alcohol" items={alcoholItems} />
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl text-navy">{t("kakigoriNonAlcoholTitle")}</h2>
            <div className="mt-1 h-px w-12 bg-gold" />
            <div className="mt-6">
              <KakigoriList variant="NonAlcohol" items={nonAlcoholItems} />
            </div>
          </div>
        </div>
      </Reveal>

      {/* SET promo */}
      <Reveal>
        <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-gold/40 bg-cream-deep/60 px-6 py-8 text-center sm:mt-16 sm:px-10">
          <h3 className="font-heading text-2xl font-bold text-navy sm:text-3xl">{t("setTitle")}</h3>
          <div className="mt-5 flex items-center justify-center gap-3 text-sm text-navy sm:text-base">
            <span>{t("setDescription")}</span>
            <span className="font-heading text-lg text-gold">{yen(setPrice)}</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-3 text-xs text-navy/60 sm:text-sm">
            <span>{t("setSeasonalNote")}</span>
            <span className="font-heading text-base text-gold">{yen(setPriceSeasonal)}</span>
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-10 max-w-2xl space-y-2 text-center text-xs text-navy/50">
        <p>{t("seasonalNote")}</p>
        <p>{t("brownSugarNote")}</p>
      </div>

      {/* Japanese Sake */}
      <Reveal>
        <div className="mt-20 sm:mt-24">
          <h2 className="text-center font-heading text-2xl text-navy sm:text-3xl">{t("sakeTitle")}</h2>
          <div className="mx-auto mt-1 h-px w-12 bg-gold" />
          <div className="mx-auto mt-8 grid max-w-3xl gap-x-10 gap-y-8 sm:grid-cols-3">
            {sakeItems.map((item) => (
              <div key={item.id} className="text-center">
                <h3 className="font-heading text-base text-navy sm:text-lg">{item.name}</h3>
                {(item.abv || item.volume) && (
                  <p className="mt-1 text-xs text-navy/50">
                    {item.abv && `${t("abvLabel")} ${item.abv}`}
                    {item.abv && item.volume && " · "}
                    {item.volume}
                  </p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-navy/60">{item.description}</p>
                {!item.volume && <p className="mt-1 text-xs text-navy/50">{t("servedInGlass")}</p>}
                <p className="mt-2 font-heading text-sm text-gold">{yen(item.price)}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Drinks */}
      <Reveal>
        <div className="mt-20 sm:mt-24">
          <h2 className="text-center font-heading text-2xl text-navy sm:text-3xl">{t("drinksTitle")}</h2>
          <div className="mx-auto mt-1 h-px w-12 bg-gold" />
          <DrinkGrid items={drinkGridItems} />
        </div>
      </Reveal>

      {/* Toppings */}
      <Reveal>
        <div className="mt-20 sm:mt-24">
          <h2 className="text-center font-heading text-2xl text-navy sm:text-3xl">{t("toppingsTitle")}</h2>
          <div className="mx-auto mt-1 h-px w-12 bg-gold" />
          <div className="mx-auto mt-8 grid max-w-3xl gap-x-10 gap-y-6 sm:grid-cols-3">
            {toppingItems.map((item) => (
              <div key={item.id} className="text-center sm:text-left">
                <h3 className="font-heading text-base text-navy">{item.name}</h3>
                <p className="mt-1 text-xs leading-relaxed text-navy/60">{item.description}</p>
                <p className="mt-1.5 font-heading text-sm text-gold">+{yen(toppingPrice)}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-16 max-w-2xl space-y-1 text-center text-xs text-navy/40">
        <p>{t("priceNote")}</p>
        <p>{t("allergyNote")}</p>
      </div>
    </div>
  );
}
