// src/animations/homePageVariants.ts
import { Variants } from "framer-motion";

/** ظرف کلی برای استگر بچه‌ها داخل کارت */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

/** آیتم‌های داخل کارت (ورود نرم از پایین) */
export const itemUpVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

/** کارت اصلی (ورود نرم با scale) */
export const mainCardMotion = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

/** بلابِ پس‌زمینه سمت چپ/بالا */
export const blobTopLeft = {
  initial: { x: 0, y: 0, rotate: 0 },
  animate: { x: [0, 10, 0], y: [0, -14, 0], rotate: [0, 8, 0] },
  transition: { duration: 14, repeat: Infinity, ease: "easeInOut" },
};

/** بلابِ پس‌زمینه سمت راست/پایین */
export const blobBottomRight = {
  initial: { x: 0, y: 0, rotate: 0 },
  animate: { x: [0, -12, 0], y: [0, 16, 0], rotate: [0, -6, 0] },
  transition: { duration: 16, repeat: Infinity, ease: "easeInOut" },
};

/** هاله‌ی پشت آیکن (پالس ملایم) */
export const iconAuraPulse = {
  initial: { scale: 0.98, opacity: 0.4 },
  animate: { scale: [0.98, 1.06, 0.98], opacity: [0.4, 0.75, 0.4] },
  transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

/** خود آیکن (درآمدن با اسپرینگ) */
export const iconEnter = {
  initial: { scale: 0.9, opacity: 0, y: 6 },
  animate: { scale: 1, opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 180, damping: 14 },
};

/** افکت hover/tap برای CTA (روی یک motion.div رَپر) */
export const hoverTapCTA = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.985 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};
