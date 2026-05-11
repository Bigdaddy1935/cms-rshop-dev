"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import { LuClock } from "react-icons/lu";

const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DES",
    label: "جدیدترین (شناسه نزولی)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "قدیمی‌ترین (شناسه صعودی)",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "rating-desc",
    value: "rating:DESC",
    label: "بیشترین امتیاز",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "createdAt-desc",
    value: "createdAt:DESC",
    label: "جدیدترین زمان ایجاد",
    icon: <LuClock className="text-xl" />,
  },
  {
    key: "createdAt-asc",
    value: "createdAt:ASC",
    label: "قدیمی‌ترین زمان ایجاد",
    icon: <LuClock className="text-xl rotate-180" />,
  },
];

const ReviewsSortModal = () => {
  return <SortModal options={SORT_OPTIONS} title="مرتب‌سازی نظرات" />;
};

export default ReviewsSortModal;
