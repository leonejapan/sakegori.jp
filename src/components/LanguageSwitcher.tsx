"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { localeLabels } from "@/i18n/localeMeta";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  function switchTo(next: Locale) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="flex items-center gap-1.5 rounded-full border border-navy/15 px-3 py-1.5 text-xs tracking-wide text-navy/80 transition hover:border-gold hover:text-navy"
      >
        {localeLabels[locale]}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-navy/10 bg-white py-1 shadow-lg"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                onClick={() => switchTo(loc)}
                className={`block w-full px-4 py-2 text-left text-sm transition hover:bg-cream ${
                  loc === locale ? "text-gold font-medium" : "text-navy/80"
                }`}
              >
                {localeLabels[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
