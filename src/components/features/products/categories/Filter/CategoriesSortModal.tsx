"use client";

import SortModal from "@/components/ui/modals/SortModal";
import { BiSortDown, BiSortUp, BiCalendarAlt } from "react-icons/bi";

const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
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
    key: "title-asc",
    value: "title:ASC",
    label: "عنوان (صعودی - الف تا ی)",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "title-desc",
    value: "title:DESC",
    label: "عنوان (نزولی - ی تا الف)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "level-asc",
    value: "level:ASC",
    label: "سطح (صعودی - مبتدی تا پیشرفته)",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "level-desc",
    value: "level:DESC",
    label: "سطح (نزولی - پیشرفته تا مبتدی)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "displayOrder-asc",
    value: "displayOrder:ASC",
    label: "ترتیب نمایش (صعودی)",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "displayOrder-desc",
    value: "displayOrder:DESC",
    label: "ترتیب نمایش (نزولی)",
    icon: <BiSortDown className="text-xl" />,
  },
];

const CategoriesSortModal = () => {
  return <SortModal options={SORT_OPTIONS} title="مرتب‌سازی" />;
};

export default CategoriesSortModal;
