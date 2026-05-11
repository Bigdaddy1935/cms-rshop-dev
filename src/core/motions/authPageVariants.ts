// src/animations/authPageVariants.ts
import { Variants } from "framer-motion";

// محتوای کلی صفحه (stagger)
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

// هر آیتم (fade-in از پایین)
export const itemVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

// تب‌ها (نمایش نرم)
export const tabContentVariants: Variants = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.2 } },
};

// کارت اصلی (ورود نرم با scale)
export const mainCardMotion = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

// چک موفقیت
export const successCheckMotion = {
  initial: { scale: 0.7, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 180, damping: 12 },
};