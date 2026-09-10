"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { CutoutImage } from "@/data/menu";

export type ScrollStripItem = {
  id: string;
  name: string;
  subLabel?: string;
  priceLabel: string;
  image: CutoutImage;
};

export default function MenuScrollStrip({
  items,
  scrollHint,
}: {
  items: ScrollStripItem[];
  scrollHint: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    function checkOverflow() {
      if (!el) return;
      setScrollable(el.scrollWidth > el.clientWidth + 1);
    }

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  function scrollByAmount(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 420);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className={`no-scrollbar scroll-snap-x flex gap-6 overflow-x-auto scroll-px-5 px-5 pb-6 pt-8 sm:gap-8 sm:scroll-px-8 sm:px-8 sm:pt-9 ${
          scrollable ? "" : "justify-safe-center"
        }`}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className="scroll-snap-item flex w-32 shrink-0 flex-col items-center text-center sm:w-40"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.08 }}
          >
            <div
              className="animate-float flex h-28 items-end justify-center sm:h-36"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <Image
                src={item.image.src}
                alt={item.name}
                width={item.image.width}
                height={item.image.height}
                className="floating-shadow h-full w-auto object-contain"
                style={{ scale: item.image.scale ?? 1 }}
                sizes="160px"
                priority={i < 2}
              />
            </div>
            <p className="mt-4 font-heading text-sm text-navy sm:text-base">{item.name}</p>
            {item.subLabel && <p className="text-[11px] uppercase tracking-wide text-navy/40">{item.subLabel}</p>}
            <p className="mt-1 text-xs text-gold sm:text-sm">{item.priceLabel}</p>
          </motion.div>
        ))}
      </div>

      {scrollable && (
        <div className="mt-1 flex items-center justify-center gap-4 px-5 sm:px-8">
          <p className="text-xs tracking-wide text-navy/40">{scrollHint} →</p>
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Scroll left"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-navy/20 text-navy/70 transition hover:border-gold hover:text-gold"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Scroll right"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-espresso transition hover:bg-gold-soft"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
