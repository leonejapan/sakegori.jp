import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";
import Reveal from "@/components/Reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "merchPage" });
  return { title: `${t("title")} — 酒氷 SAKEGORI` };
}

export default async function MerchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("merchPage");

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <Reveal className="flex flex-col items-center">
        <Image
          src="/images/logo.png"
          alt="酒氷 SAKEGORI"
          width={72}
          height={72}
          className="animate-float h-16 w-16 opacity-90"
        />
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold">{t("eyebrow")}</p>
        <h1 className="mt-3 font-heading text-4xl text-navy sm:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-navy/65 sm:text-base">{t("body")}</p>

        <a
          href="https://www.instagram.com/sakegori_honten/"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-9 rounded-full bg-gold px-7 py-3 text-sm font-medium tracking-wide text-espresso transition hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-lg"
        >
          {t("cta")}
        </a>
      </Reveal>
    </div>
  );
}
