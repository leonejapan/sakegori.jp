import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import MenuScrollStrip, { type ScrollStripItem } from "@/components/MenuScrollStrip";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import {
  kakigoriIds,
  kakigoriPrices,
  kakigoriAlcoholImages,
  kakigoriNonAlcoholImages,
  drinkIds,
  drinkPrice,
  drinkImages,
  yen,
} from "@/data/menu";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("hero");
  const tPreview = await getTranslations("menuPreview");
  const tMenu = await getTranslations("menuPage");
  const tItems = await getTranslations("menuPage.items");

  const kakigoriItems: ScrollStripItem[] = [
    ...kakigoriIds.map((id) => ({
      id: `${id}-alcohol`,
      name: tItems.has(`${id}.nameAlcohol`) ? tItems(`${id}.nameAlcohol`) : tItems(`${id}.name`),
      subLabel: tPreview("alcoholTag"),
      priceLabel: yen(kakigoriPrices[id]),
      image: kakigoriAlcoholImages[id],
    })),
    ...kakigoriIds.map((id) => ({
      id: `${id}-nonalcohol`,
      name: tItems(`${id}.name`),
      subLabel: tPreview("nonAlcoholTag"),
      priceLabel: yen(kakigoriPrices[id]),
      image: kakigoriNonAlcoholImages[id],
    })),
  ];

  const drinkItems: ScrollStripItem[] = drinkIds.map((id) => ({
    id,
    name: tItems(`${id}.name`),
    priceLabel: yen(drinkPrice),
    image: drinkImages[id],
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <HeroVideo
          src="/videos/hero-animation.mp4"
          poster="/images/hero-shaved-ice.png"
          alt="酒氷 shaved ice served in a Japanese wooden masu"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">{t("eyebrow")}</p>
            <h1 className="mt-4 font-heading text-6xl text-cream sm:text-7xl">{t("title")}</h1>
            <p className="mt-1 text-sm uppercase tracking-[0.4em] text-cream/70">{t("titleRomaji")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl font-heading text-xl text-cream sm:text-2xl">{t("tagline")}</p>
            <p className="mt-2 max-w-xl text-sm text-cream/60">{t("taglineEn")}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/85 sm:text-base">{t("body")}</p>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="rounded-full bg-gold px-6 py-3 text-sm font-medium tracking-wide text-espresso transition hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg"
              >
                {t("ctaMenu")}
              </Link>
              <Link
                href="/store"
                className="rounded-full border border-cream/40 px-6 py-3 text-sm tracking-wide text-cream transition hover:-translate-y-0.5 hover:border-cream"
              >
                {t("ctaStore")}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Menu preview */}
      <section className="py-16 sm:py-20">
        <Reveal>
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-3xl text-navy sm:text-4xl">{tPreview("title")}</h2>
                <p className="mt-2 text-sm text-navy/60">{tPreview("subtitle")}</p>
              </div>
              <Link
                href="/menu"
                className="text-sm font-medium tracking-wide text-gold underline-offset-4 hover:underline"
              >
                {tPreview("viewAll")} →
              </Link>
            </div>
          </div>
        </Reveal>

        <div className="mt-8">
          <p className="mb-3 text-center text-xs uppercase tracking-widest text-navy/40">
            酒氷 · SAKEGORI
          </p>
          <MenuScrollStrip items={kakigoriItems} scrollHint={tPreview("scrollHint")} />
        </div>

        <div className="mt-10">
          <p className="mb-3 text-center text-xs uppercase tracking-widest text-navy/40">
            {tMenu("drinksTitle")}
          </p>
          <MenuScrollStrip items={drinkItems} scrollHint={tPreview("scrollHint")} />
        </div>
      </section>
    </div>
  );
}
