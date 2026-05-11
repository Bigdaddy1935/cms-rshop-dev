"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { IoReceiptOutline } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { motion } from "framer-motion";
import Item from "./Item";

// انیمیشن‌ها
import {
  asideEnterMotion,
  logoVariants,
  logoFrameReveal,
  logoFloatLoop,
  rotatingRingMotion,
  titleRevealMotion,
  badgeRevealMotion,
  underlineAppearMotion,
  underlineShineMotion,
  navVariants,
  navItemVariants,
  itemHoverTap,
  glowPulse,
  activePillMotion,
  iconFloat,
} from "@/core/motions/sidebarVariants";
import { BsShop } from "react-icons/bs";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (routeName: string) =>
    pathname?.includes(`/admin/${routeName}`);

  return (
    <motion.aside
      className="h-fit w-full lg:h-[auto] left-0 right-0 p-2 rounded-2xl shadow-none"
      {...asideEnterMotion}
    >
      {/* مرکزکننده: در دسکتاپ محتوا را وسط ویوپورت می‌نشاند، بدون نیاز به ارتفاع 100vh */}
      <div className="lg:transform rounded-2xl">
        {/* برای جلوگیری از اسکرول افقی ناخواسته */}
        <div className="relative overflow-hidden">
          {/* هدر (لوگو + عنوان زیرش) */}
          <motion.div
            className="hidden lg:flex pt-6 pb-4 items-center justify-center relative over"
            variants={logoVariants}
            initial="hidden"
            animate="show"
          >
            <div className="flex flex-col items-center">
              {/* قاب ثابت لوگو (بدون تغییر ابعاد؛ همه‌ی انیمیشن‌ها transform-only) */}
              <motion.div className="relative h-36 w-36" {...logoFrameReveal}>
                {/* رینگِ گرادیانی چرخان؛ کاملاً داخل قاب */}
                <motion.span
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg at 50% 50%, #c7d2fe, #bae6fd, #ddd6fe, #bae6fd, #c7d2fe)",
                  }}
                  {...rotatingRingMotion}
                />
                {/* ماسک برای ایجاد حلقه توخالی (بدون اثر روی layout) */}
                <span
                  className="absolute inset-0 rounded-2xl bg-white"
                  style={{
                    mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: 8,
                  }}
                />
                {/* خود تصویر لوگو: داخل قاب ثابت؛ فقط transform می‌شود */}
                <motion.img
                  src="/images/logo.png"
                  alt="logo"
                  className="absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] object-contain rounded-2xl ring-1 ring-black/5 bg-white p-3"
                  {...logoFloatLoop}
                />
              </motion.div>

              {/* عنوان و برچسب زیر عکس */}
              <motion.span
                className="mt-6 font-semibold text-slate-800 text-[15px] leading-5 tracking-tight"
                {...titleRevealMotion}
              >
                فروشگاه آرشاپ
              </motion.span>
              <motion.span
                className="mt-1 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/85 px-2 py-[2px] text-[10px] text-slate-600 shadow-sm"
                {...badgeRevealMotion}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                پنل مدیریت
              </motion.span>

              {/* خط زیرین با شاین ظریف */}
              <motion.div
                className="mt-3 mb-6 h-px w-40 overflow-hidden"
                {...underlineAppearMotion}
              >
                <div className="relative h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent">
                  <motion.span
                    className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent"
                    {...underlineShineMotion}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Nav: کلاس‌ها دقیقاً دست‌نخورده؛ هیچ max-height یا overflow-y-auto نداریم */}
          <motion.nav
            className="bg-white border border-b-none w-fit lg:w-full mx-auto lg:border-0 p-0 sm:p-2 lg:p-0 rounded-t-3xl lg:rounded-none overflow-hidden fixed bottom-0 left-0 right-0 lg:relative lg:bg-transparent flex flex-row justify-center lg:flex-col xs:gap-4 text-end"
            variants={navVariants}
            initial="hidden"
            animate="show"
          >
            {/* خانه */}
            <motion.div
              className="relative"
              variants={navItemVariants}
              {...itemHoverTap}
            >
              {isActive("dashboard") && (
                <motion.span
                  {...activePillMotion}
                  className="absolute inset-0 -z-10 rounded-2xl lg:rounded-xl bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent ring-1 ring-green-600/10"
                />
              )}
              <motion.span
                className="pointer-events-none absolute inset-0 -z-20 rounded-2xl lg:rounded-xl"
                style={{
                  background:
                    "radial-gradient(65% 55% at 50% 50%, rgba(16,185,129,0.10), transparent 70%)",
                }}
                {...glowPulse}
              />
              <Item
                title="داشبورد"
                icon={
                  <motion.span {...iconFloat}>
                    <TbBrandGoogleAnalytics className="text-2xl" />
                  </motion.span>
                }
                routeName="dashboard"
                parentStyle="text-green-700 w-full hover:text-green-700 hover:bg-green-700/5"
                iconStyle="bg-green-700/10"
                active="bg-green-700/5"
              />
            </motion.div>

            {/* سفارشات */}
            <motion.div
              className="relative"
              variants={navItemVariants}
              {...itemHoverTap}
            >
              {isActive("orders") && (
                <motion.span
                  {...activePillMotion}
                  className="absolute inset-0 -z-10 rounded-2xl lg:rounded-md bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent ring-1 ring-blue-600/10"
                />
              )}
              <motion.span
                className="pointer-events-none absolute inset-0 -z-20 rounded-2xl lg:rounded-md"
                style={{
                  background:
                    "radial-gradient(65% 55% at 50% 50%, rgba(59,130,246,0.10), transparent 70%)",
                }}
                {...glowPulse}
              />
              <Item
                title="سفارشات"
                icon={
                  <motion.span {...iconFloat}>
                    <IoReceiptOutline className="text-2xl" />
                  </motion.span>
                }
                routeName="orders"
                parentStyle="text-blue-700 w-full hover:text-blue-700 hover:bg-blue-700/5"
                iconStyle="bg-blue-700/10"
                active="bg-blue-700/5"
              />
            </motion.div>

            {/* محصولات */}
            <motion.div
              className="relative"
              variants={navItemVariants}
              {...itemHoverTap}
            >
              {isActive("products") && (
                <motion.span
                  {...activePillMotion}
                  className="absolute inset-0 -z-10 rounded-2xl lg:rounded-md bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent ring-1 ring-orange-600/10"
                />
              )}
              <motion.span
                className="pointer-events-none absolute inset-0 -z-20 rounded-2xl lg:rounded-md"
                style={{
                  background:
                    "radial-gradient(65% 55%  at 50% 50%, rgba(249,115,22,0.12), transparent 70%)",
                }}
                {...glowPulse}
              />
              <Item
                title="محصولات"
                icon={
                  <motion.span {...iconFloat}>
                    <LuPackage className="text-2xl" />
                  </motion.span>
                }
                routeName="products"
                parentStyle="text-orange-700 w-full hover:text-orange-700 hover:bg-orange-700/5"
                iconStyle="bg-orange-700/10"
                active="bg-orange-700/5"
              />
            </motion.div>

            {/* تنظیمات */}
            <motion.div
              className="relative"
              variants={navItemVariants}
              {...itemHoverTap}
            >
              {isActive("store") && (
                <motion.span
                  {...activePillMotion}
                  className="absolute inset-0 -z-10 rounded-2xl lg:rounded-md bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-transparent ring-1 ring-sky-600/10"
                />
              )}
              <motion.span
                className="pointer-events-none absolute inset-0 -z-20 rounded-2xl lg:rounded-md"
                style={{
                  background:
                    "radial-gradient(65% 55% at 50% 50%, rgba(14,165,233,0.11), transparent 70%)",
                }}
                {...glowPulse}
              />
              <Item
                title="فروشگاه"
                icon={
                  <motion.span {...iconFloat}>
                    <BsShop className="text-2xl" />
                  </motion.span>
                }
                routeName="store"
                parentStyle="text-sky-700 w-full hover:text-sky-700 hover:bg-sky-700/5"
                iconStyle="bg-sky-700/10"
                active="bg-sky-700/5"
              />
            </motion.div>
          </motion.nav>
        </div>
      </div>
    </motion.aside>
  );
}
