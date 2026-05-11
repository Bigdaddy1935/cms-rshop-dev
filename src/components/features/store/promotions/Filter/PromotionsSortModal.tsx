"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp, BiCalendarAlt } from "react-icons/bi";

const SORT_OPTIONS = [
  { key: "id-desc", value: "id:DESC", label: "جدیدترین (شناسه نزولی)", icon: <BiSortDown className="text-xl" /> },
  { key: "id-asc", value: "id:ASC", label: "قدیمی‌ترین (شناسه صعودی)", icon: <BiSortUp className="text-xl" /> },
  { key: "startsAt-desc", value: "startsAt:DESC", label: "تاریخ شروع (جدیدترین)", icon: <BiCalendarAlt className="text-xl" /> },
  { key: "startsAt-asc", value: "startsAt:ASC", label: "تاریخ شروع (قدیمی‌ترین)", icon: <BiCalendarAlt className="text-xl rotate-180" /> },
  { key: "endsAt-desc", value: "endsAt:DESC", label: "تاریخ پایان (جدیدترین)", icon: <BiCalendarAlt className="text-xl text-danger-500" /> },
  { key: "endsAt-asc", value: "endsAt:ASC", label: "تاریخ پایان (قدیمی‌ترین)", icon: <BiCalendarAlt className="text-xl text-danger-500 rotate-180" /> },
];

const PromotionsSortModal = () => {
  return <SortModal options={SORT_OPTIONS} title="مرتب‌سازی" />;
};

export default PromotionsSortModal;
