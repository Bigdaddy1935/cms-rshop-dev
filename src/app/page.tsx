"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";

import {
  containerVariants,
  itemUpVariants,
  mainCardMotion,
  blobTopLeft,
  blobBottomRight,
  iconAuraPulse,
  iconEnter,
  hoverTapCTA,
} from "@/core/motions/homePageVariants";
import Link from "next/link";

export default function Home() {
  return (
    <div
      dir="rtl"
      className="relative h-screen w-full overflow-hidden bg-gradient-to-tr from-indigo-100 via-white to-blue-100 dark:from-[#0b1020] dark:via-[#0a0f1b] dark:to-[#0f1730]"
    >
      {/* بلاب‌های پس‌زمینه با فرمرموشن */}
      <motion.div
        className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-indigo-400/25 blur-3xl dark:bg-indigo-600/20"
        {...blobTopLeft}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-blue-400/25 blur-3xl dark:bg-blue-600/20"
        {...blobBottomRight}
      />

      {/* شبکه لطیف */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_60%,transparent_100%)] dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* بدنه */}
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4">
          {/* گرادیان‌بوردر دور باکس (CSS انیمیشن خودت رو نگه داشتیم) */}
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-0.5 -z-10 rounded-[26px] bg-[conic-gradient(from_180deg_at_50%_50%,#6d6ff9_0%,#60a5fa_25%,#a78bfa_50%,#60a5fa_75%,#6d6ff9_100%)] opacity-90 blur-[2px] [background-size:200%_200%] motion-safe:animate-[border-pan_9s_linear_infinite]" />

            {/* کارت اصلی با motion */}
            <motion.section
              className="relative w-full rounded-[24px] p-6 sm:p-8 shadow-2xl backdrop-blur-xl border border-white/50 dark:border-white/10 
                         bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,255,255,0.85),rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.55)_100%),linear-gradient(to_bottom_right,rgba(99,102,241,0.08),rgba(59,130,246,0.08))]
                         dark:bg-[radial-gradient(120%_100%_at_50%_0%,rgba(15,23,42,0.85),rgba(15,23,42,0.7)_40%,rgba(15,23,42,0.55)_100%),linear-gradient(to_bottom_right,rgba(99,102,241,0.15),rgba(59,130,246,0.12))]"
              {...mainCardMotion}
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {/* هاله آیکن با پالس */}
              <motion.div
                className="absolute top-6 left-1/2 -translate-x-1/2 -z-10 h-24 w-24 rounded-full bg-indigo-400/20 dark:bg-indigo-500/15"
                {...iconAuraPulse}
              />

              {/* آیکن */}
              <motion.div
                className="mb-4 flex items-center justify-center"
                variants={itemUpVariants}
              >
                <motion.div className="relative" {...iconEnter}>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500 to-blue-500 blur-md opacity-30" />
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white ring-1 ring-white/20 shadow-lg">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
                      {/* آیکن امنیّت (به‌جای FaUserShield مستقیم SVG یا پایین از react-icons) */}
                    </svg>
                    {/* یا اگر همون react-icons رو می‌خوای: */}
                    <FaUserShield className="absolute h-8 w-8" />
                  </div>
                </motion.div>
              </motion.div>

              {/* تیتر */}
              <motion.h2
                variants={itemUpVariants}
                className="mb-2 text-center text-xl sm:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-indigo-600 via-fuchsia-500 to-blue-600"
              >
                خوش آمدید به پنل ادمین آرشاپ
              </motion.h2>

              {/* توضیح */}
              <motion.p
                variants={itemUpVariants}
                className="mb-6 text-center text-gray-600 dark:text-gray-300"
              >
                برای مدیریت سیستم وارد حساب خود شوید.
              </motion.p>

              {/* CTA */}
              <motion.div variants={itemUpVariants} className="space-y-3">
                <motion.div {...hoverTapCTA}>
                  <Button
                    as={Link}
                    href="/signin"
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-6 text-lg font-bold text-white 
                               transition-all hover:from-indigo-500 hover:to-blue-500 focus-visible:outline-none focus-visible:ring-2 
                               focus-visible:ring-indigo-400 dark:from-indigo-500 dark:to-blue-500"
                    aria-label="ورود به پنل مدیریت"
                  >
                    ورود به پنل
                  </Button>
                </motion.div>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
