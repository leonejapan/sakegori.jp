import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const c = useTranslations("contact");

  return (
    <footer className="border-t border-cream-deep bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/images/logo.png" alt="酒氷 SAKEGORI" width={32} height={32} className="h-8 w-8" />
              <span className="font-heading text-lg text-cream">酒氷 SAKEGORI</span>
            </Link>
            <p className="mt-3 text-sm text-cream/70">{t("tagline")}</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-10">
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-gold-soft">{nav("home")}</p>
              <ul className="space-y-2 text-sm text-cream/80">
                <li><Link href="/menu" className="hover:text-gold-soft">{nav("menu")}</Link></li>
                <li><Link href="/gallery" className="hover:text-gold-soft">{nav("gallery")}</Link></li>
                <li><Link href="/store" className="hover:text-gold-soft">{nav("store")}</Link></li>
                <li><Link href="/merch" className="hover:text-gold-soft">{nav("merch")}</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-gold-soft">{c("addressLabel")}</p>
              <ul className="space-y-2 text-sm text-cream/80">
                <li><a href="tel:+81703293-8443" className="hover:text-gold-soft">{c("phone")}</a></li>
                <li><a href="mailto:sakegori.jp@gmail.com" className="hover:text-gold-soft">{c("email")}</a></li>
                <li className="text-cream/70">{c("address")}</li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-widest text-gold-soft">Instagram</p>
              <a
                href="https://www.instagram.com/sakegori_honten/"
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-cream/80 hover:text-gold-soft"
              >
                @sakegori_honten
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6 text-xs text-cream/50">
          © {new Date().getFullYear()} 酒氷 SAKEGORI. {t("rights")}
        </div>
      </div>
    </footer>
  );
}
