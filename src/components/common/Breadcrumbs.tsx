"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

const breadcrumbMap: Record<string, string> = {
  // top-level
  "": "خانه",
  admin: "مدیریت",
  dashboard: "داشبورد",
  signin: "ورود",

  // settings group (inside admin/(settings)/...)
  store: "فروشگاه",
  icons: "آیکون ها",
  permissions: "دسترسی ها",
  staff: "اطلاعات کارمند",
  "store-pages": "صفحات فروشگاه",
  about_us: "درباره ما",
  purchase_guide: "راهنمای خرید",
  return_policy: "شرایط بازگشت کالا",
  faqs: "سوالات متداول",
  "faqs-cat": "دسته بندی سوالات",
  "home-builder": "صفحه اصلی",
  collections: "مجموعه ها",
  finance: "گزارشات مالی",
  infos: "اطلاعات فروشگاه",
  social: "شبکه‌های اجتماعی",
  "user-infos": "اطلاعات کاربر",

  // store pages
  categories: "دسته‌بندی‌ها",
  "size-guide": "راهنما سایز",
  "gift-wrapping": "بسته بندی ها",
  "card-to-card": "کارت به کارت",
  support: "پشتیبانی",
  blog: "بلاگ",
  comments: "دیدگاه ها",
  customers: "کاربران",
  "pre-order": "پیش‌سفارش",
  promotions: "پروموشن ها",
  coupon: "کد تخفیف",
  "flash-deal": "پیشنهاد شگفت‌انگیز",
  "free-shipping": "ارسال رایگان",
  "first-order": "تخفیف خرید اول",
  "next-order-reward": "تخفیف خرید بعدی",
  sms: "ارسال پیامک",

  // orders
  orders: "سفارش‌ها",
  "manual-order": "سفارش دستی",
  "payment-log": "لاگ های پرداخت",
  order: "سفارش",

  // products
  products: "محصولات",
  brands: "برندها",
  variants: "تنوع محصولات",
  create: "ایجاد",
  edit: "ویرایش",

  // generic/fallback keys
  users: "کاربران",
  profile: "پروفایل",
};

/** اگر segment عددی به نظر بیاد (id) یا GUID، label مناسب برمی‌گردونه */
function isIdSegment(seg: string) {
  // عدد یا uuid-like (حالت ساده)
  return /^\d+$/.test(seg) || /^[0-9a-fA-F\-]{8,}$/.test(seg);
}

function segmentToLabel(seg: string) {
  if (!seg) return breadcrumbMap[""] || seg;
  const cleaned = decodeURIComponent(seg);
  if (breadcrumbMap[cleaned]) return breadcrumbMap[cleaned];

  if (isIdSegment(cleaned)) return "جزئیات";
  // fallback: جای - یا _ رو فاصله کن و اول کلمه رو بزرگ کن (تا فارسی/انگلیسی مخلوط بهتر دیده بشه)
  const replaced = cleaned.replace(/[-_]/g, " ");
  // اگر فارسی باشه همین نمایش داده میشه، اگر لاتین باشه هم بهتره
  return replaced;
}

export default function Breadcrumbs() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean); // ['admin','store','customers','create']
  const breadcrumbHrefMap: Record<string, string> = {
    admin: "/admin/dashboard",
  };
  const crumbs = segments.map((seg, idx) => {
    const href =
      breadcrumbHrefMap[seg] ?? "/" + segments.slice(0, idx + 1).join("/");

    const label = segmentToLabel(seg);
    const isLast = idx === segments.length - 1;

    return (
      <span key={href} className="flex items-center whitespace-nowrap">
        {idx > 0 && (
          <span className="mx-2 text-gray-300">
            <IoChevronBack className="text-xl" />
          </span>
        )}
        {isLast ? (
          <span className="text-gray-600">{label}</span>
        ) : (
          <Link href={href} className="text-sky-600 hover:underline">
            {label}
          </Link>
        )}
      </span>
    );
  });

  // اگر مسیر خالی باشه (index) ، فقط "خانه" رو نشون بده
  if (segments.length === 0) {
    return <nav className="text-sm text-gray-600">خانه</nav>;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-fit text-sm flex bg-white shadow rounded-xl py-2.5 px-4"
    >
      {crumbs}
    </nav>
  );
}
