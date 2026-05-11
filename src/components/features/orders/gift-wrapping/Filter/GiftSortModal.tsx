"use client";

import SortModal from "@/components/ui/modals/SortModal";
import {
  BiSortDown,
  BiSortUp,
  BiTrendingUp,
  BiTrendingDown,
  BiBarChartAlt2,
} from "react-icons/bi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const SORT_OPTIONS = [
  {
    key: "createdAt-desc",
    value: "createdAt:DESC",
    label: "جدیدترین",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "createdAt-asc",
    value: "createdAt:ASC",
    label: "قدیمی‌ترین",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "name-asc",
    value: "name:ASC",
    label: "نام (الف→ی)",
    icon: <AiOutlineSortDescending className="text-xl" />,
  },
  {
    key: "name-desc",
    value: "name:DESC",
    label: "نام (ی→الف)",
    icon: <AiOutlineSortAscending className="text-xl" />,
  },
  {
    key: "price-desc",
    value: "price:DESC",
    label: "بیشترین قیمت",
    icon: <BiTrendingUp className="text-xl" />,
  },
  {
    key: "price-asc",
    value: "price:ASC",
    label: "کمترین قیمت",
    icon: <BiTrendingDown className="text-xl" />,
  },
  {
    key: "displayOrder-asc",
    value: "displayOrder:ASC",
    label: "اولویت نمایش (کم→زیاد)",
    icon: <BiBarChartAlt2 className="text-xl" />,
  },
  {
    key: "displayOrder-desc",
    value: "displayOrder:DESC",
    label: "اولویت نمایش (زیاد→کم)",
    icon: <BiBarChartAlt2 className="text-xl rotate-180" />,
  },
];

const GiftSortModal = () => {
  return <SortModal options={SORT_OPTIONS} />;
};

export default GiftSortModal;
