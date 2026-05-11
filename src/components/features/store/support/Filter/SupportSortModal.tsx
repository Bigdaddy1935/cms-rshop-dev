"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
    label: "جدیدترین",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "قدیمی‌ترین",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "updatedAt-asc",
    value: "updatedAt:ASC",
    label: "آخرین بروزرسانی (قدیمی→جدید)",
    icon: <AiOutlineSortAscending className="text-xl" />,
  },
  {
    key: "updatedAt-desc",
    value: "updatedAt:DESC",
    label: "آخرین بروزرسانی (جدید→قدیمی)",
    icon: <AiOutlineSortDescending className="text-xl" />,
  },
];

const SupportSortModal = () => {
  return <SortModal options={SORT_OPTIONS} />;
};

export default SupportSortModal;
