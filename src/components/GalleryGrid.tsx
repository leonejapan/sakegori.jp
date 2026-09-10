"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export type GalleryTile = {
  id: string;
  image: string;
  caption?: string;
  subCaption?: string;
};

export default function GalleryGrid({
  tiles,
  aspect = "aspect-square",
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
}: {
  tiles: GalleryTile[];
  aspect?: string;
  columns?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % tiles.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + tiles.length) % tiles.length));
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [openIndex, tiles.length]);

  const active = openIndex !== null ? tiles[openIndex] : null;

  return (
    <>
      <div className={`grid ${columns} gap-4 sm:gap-5`}>
        {tiles.map((tile, i) => (
          <motion.figure
            key={tile.id}
            className="m-0 flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className={`relative ${aspect} block w-full overflow-hidden bg-cream-deep`}
              aria-label={tile.caption ? `View larger photo: ${tile.caption}` : "View larger photo"}
            >
              <Image
                src={tile.image}
                alt={tile.caption ?? "酒氷 SAKEGORI"}
                fill
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </button>
            {tile.caption && (
              <figcaption className="mt-2.5 text-center">
                <p className="font-heading text-sm text-navy">{tile.caption}</p>
                {tile.subCaption && <p className="text-xs text-navy/50">{tile.subCaption}</p>}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-espresso/95 p-4 sm:p-8"
            onClick={() => setOpenIndex(null)}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition hover:bg-cream/10 hover:text-cream sm:right-6 sm:top-6"
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M2 2L20 20M20 2L2 20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </button>

            {tiles.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex((i) => (i === null ? i : (i - 1 + tiles.length) % tiles.length));
                  }}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/80 transition hover:bg-cream/10 hover:text-cream sm:left-6"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex((i) => (i === null ? i : (i + 1) % tiles.length));
                  }}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-cream/80 transition hover:bg-cream/10 hover:text-cream sm:right-6"
                >
                  ›
                </button>
              </>
            )}

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-full max-w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={active.caption ?? "酒氷 SAKEGORI"}
                className="max-h-[85vh] max-w-[92vw] object-contain"
              />
            </motion.div>

            {active.caption && (
              <div className="mt-4 text-center">
                <p className="font-heading text-base text-cream">{active.caption}</p>
                {active.subCaption && <p className="text-xs text-cream/60">{active.subCaption}</p>}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
