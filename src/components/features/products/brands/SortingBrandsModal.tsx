"use client";

import SortModal from "@/components/ui/modals/SortModal";
import {
  BiSortDown,
  BiSortUp,
} from "react-icons/bi";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
    label: "ID نزولی (جدیدترین)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "ID صعودی (قدیمی‌ترین)",
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
    key: "logo-asc",
    value: "logo:ASC",
    label: "لوگو (A→Z)",
    icon: <AiOutlineSortDescending className="text-xl" />,
  },
  {
    key: "logo-desc",
    value: "logo:DESC",
    label: "لوگو (Z→A)",
    icon: <AiOutlineSortAscending className="text-xl" />,
  },
];

const SortBrandsModal = () => {
  return <SortModal title="مرتب‌سازی برندها" options={SORT_OPTIONS} size="sm" />;
};

export default SortBrandsModal;
