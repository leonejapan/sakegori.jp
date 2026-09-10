"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CutoutImage } from "@/data/menu";

export type DrinkGridItem = {
  id: string;
  name: string;
  description: string;
  priceLabel: string;
  image: CutoutImage;
};

export default function DrinkGrid({ items }: { items: DrinkGridItem[] }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-4 sm:gap-6">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -10, scale: 1.06 }}
        >
          <div className="animate-float flex h-32 items-end justify-center sm:h-40" style={{ animationDelay: `${i * 0.35}s` }}>
            <Image
              src={item.image.src}
              alt={item.name}
              width={item.image.width}
              height={item.image.height}
              className="floating-shadow h-full w-auto object-contain"
              style={{ scale: item.image.scale ?? 1 }}
              sizes="180px"
              priority={i < 2}
            />
          </div>
          <h3 className="mt-4 font-heading text-base text-navy">{item.name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-navy/60">{item.description}</p>
          <p className="mt-1.5 font-heading text-sm text-gold">{item.priceLabel}</p>
        </motion.div>
      ))}
    </div>
  );
}
