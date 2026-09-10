"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

const navKeys = ["home", "menu", "gallery", "store", "merch"] as const;
const navHrefs: Record<(typeof navKeys)[number], string> = {
  home: "/",
  menu: "/menu",
  gallery: "/gallery",
  store: "/store",
  merch: "/merch",
};

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image src="/images/logo.png" alt="酒氷 SAKEGORI" width={32} height={32} className="h-8 w-8" priority />
          <span className="font-heading text-base tracking-wide text-navy sm:text-lg">酒氷</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navKeys.map((key) => {
            const href = navHrefs[key];
            const active = pathname === href;
            return (
              <Link
                key={key}
                href={href}
                className={`text-sm tracking-wide transition hover:text-gold ${
                  active ? "text-gold" : "text-navy/75"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M0 1H20" stroke="#001830" strokeWidth="1.5" />
            <path d="M0 7H20" stroke="#001830" strokeWidth="1.5" />
            <path d="M0 13H20" stroke="#001830" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-white px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navKeys.map((key) => {
              const href = navHrefs[key];
              const active = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-2 py-3 text-base ${
                    active ? "text-gold" : "text-navy/85"
                  }`}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
