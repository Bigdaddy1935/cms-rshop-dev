"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp, BiTrendingDown, BiTrendingUp } from "react-icons/bi";

const SORT_OPTIONS = [
  {
    key: "createdAt-desc",
    value: "createdAt:DESC",
    label: "جدیدترین",
    description: "نمایش جدیدترین سفارش‌ها",
    icon: <BiSortDown className="text-2xl" />,
  },
  {
    key: "createdAt-asc",
    value: "createdAt:ASC",
    label: "قدیمی‌ترین",
    description: "نمایش قدیمی‌ترین سفارش‌ها",
    icon: <BiSortUp className="text-2xl" />,
  },
  {
    key: "total-desc",
    value: "total:DESC",
    label: "بیشترین مبلغ",
    description: "سفارش‌ها با بیشترین مبلغ",
    icon: <BiTrendingUp className="text-2xl" />,
  },
  {
    key: "total-asc",
    value: "total:ASC",
    label: "کمترین مبلغ",
    description: "سفارش‌ها با کمترین مبلغ",
    icon: <BiTrendingDown className="text-2xl" />,
  },
];

const OrdersSortModal = () => {
  return <SortModal options={SORT_OPTIONS} title="مرتب‌سازی سفارشات" />;
};

export default OrdersSortModal;
