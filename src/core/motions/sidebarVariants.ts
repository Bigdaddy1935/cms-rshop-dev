// src/animations/sidebarVariants.ts
import { Variants } from "framer-motion";

/** ورود نرم کل سایدبار */
export const asideEnterMotion = {
  initial: { x: 16, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.45, ease: "easeOut" },
};

/** کانتینر لوگو (فقط برای ورود) */
export const logoVariants: Variants = {
  hidden: { y: -8, opacity: 0 },
  show: {
    y: 0, opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
};

/** فِرِیم لوگو: مرحله‌ی ظاهر شدن | بعداً حلقهٔ float روی خود تصویر اجرا می‌شود */
export const logoFrameReveal = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.55, ease: "easeOut" },
};

/** حلقهٔ فلوُتِ نرم برای خود تصویر (بعد از ریویل شروع می‌شود) */
export const logoFloatLoop = {
  animate: { y: [0, -2, 0], scale: [1, 1.005, 1] },
  transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.55 },
};

/** رینگ گرادیانی چرخان (کاملاً داخل قاب و بدون تغییر لایه‌بندی) */
export const rotatingRingMotion = {
  animate: { rotate: 360 },
  transition: { duration: 16, repeat: Infinity, ease: "linear" },
};

/** عنوان و بدجِ زیر لوگو */
export const titleRevealMotion = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut", delay: 0.05 },
};
export const badgeRevealMotion = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut", delay: 0.12 },
};

/** خط زیر لوگو (شاین) */
export const underlineAppearMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay: 0.35 },
};
export const underlineShineMotion = {
  animate: { x: ["-20%", "120%"] },
  transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
};

/** استگر آیتم‌های ناوبری */
export const navVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};
export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 16 },
  },
};

/** افکت hover/tap آیتم */
export const itemHoverTap = {
  whileHover: { scale: 1.02, x: -2 },
  whileTap: { scale: 0.985, x: 0 },
  transition: { type: "spring", stiffness: 300, damping: 22 },
};

/** گلوو لطیف پس‌زمینه‌ی آیتم (absolute و transform-only) */
export const glowPulse = {
  initial: { opacity: 0.15, scale: 0.98 },
  animate: { opacity: [0.12, 0.28, 0.12], scale: [0.98, 1.03, 0.98] },
  transition: { duration: 3.6, repeat: Infinity, ease: "easeInOut" },
};

/** اندیکاتور فعال */
export const activePillMotion = {
  layoutId: "sbActive",
  transition: { type: "spring", stiffness: 500, damping: 40, mass: 0.6 },
};

/** تیلت/شنا آیکن روی hover والد */
export const iconFloat = {
  whileHover: { rotate: [-2, 2, 0], y: [-1, 1, 0] },
  transition: { duration: 0.35, ease: "easeInOut" },
};
