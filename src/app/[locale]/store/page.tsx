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
  const t = await getTranslations({ locale, namespace: "storePage" });
  return { title: `${t("title")} — 酒氷 SAKEGORI` };
}

const MAP_QUERY = encodeURIComponent("大分県別府市駅前町3-9 酒氷");

export default async function StorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("storePage");
  const c = await getTranslations("contact");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="text-center">
          <h1 className="font-heading text-4xl text-navy sm:text-5xl">{t("title")}</h1>
          <p className="mt-3 text-sm text-navy/60 sm:text-base">{t("subtitle")}</p>
        </div>
      </Reveal>

      {/* Current store */}
      <Reveal>
      <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="font-heading text-2xl text-navy sm:text-3xl">{t("currentStoreTitle")}</h2>
          <div className="mt-1 h-px w-12 bg-gold" />

          <dl className="mt-8 space-y-6">
            <div>
              <dt className="text-xs uppercase tracking-widest text-navy/40">{t("addressLabel")}</dt>
              <dd className="mt-1 text-base text-navy">{t("addressJa")}</dd>
              <dd className="text-sm text-navy/60">{t("address")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-navy/40">{t("accessLabel")}</dt>
              <dd className="mt-1 text-sm text-navy/80">{t("accessBody")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-navy/40">{t("hoursLabel")}</dt>
              <dd className="mt-1 text-sm text-navy/80">{t("hours")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-navy/40">{t("phoneLabel")}</dt>
              <dd className="mt-1 text-sm text-navy/80">
                <a href="tel:+81703293-8443" className="hover:text-gold">{c("phone")}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-navy/40">{t("emailLabel")}</dt>
              <dd className="mt-1 text-sm text-navy/80">
                <a href="mailto:sakegori.jp@gmail.com" className="hover:text-gold">{c("email")}</a>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-navy/40">{t("instagramLabel")}</dt>
              <dd className="mt-1 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/sakegori_honten/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm font-medium text-gold hover:underline"
                >
                  @sakegori_honten
                </a>
                <Image
                  src="/images/instagram-qr.png"
                  alt="Instagram QR code for @sakegori_honten"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg border border-navy/10"
                />
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-widest text-navy/40">{t("mapLabel")}</p>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-navy/10 bg-cream-deep sm:aspect-square lg:aspect-[4/5]">
            <iframe
              title="酒氷 store map"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              className="h-full w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      </Reveal>

      {/* Future locations */}
      <Reveal>
        <div className="mt-20 rounded-3xl border border-dashed border-gold/40 bg-cream-deep/60 px-6 py-14 text-center sm:mt-24 sm:px-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">酒氷</p>
          <h2 className="mt-3 font-heading text-2xl text-navy sm:text-3xl">{t("futureTitle")}</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-navy/65">{t("futureBody")}</p>
        </div>
      </Reveal>
    </div>
  );
}
