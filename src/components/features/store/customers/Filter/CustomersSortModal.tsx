"use client";

import SortModal from "@/components/ui/modals/SortModal";
import {
  BiSortDown,
  BiSortUp,
  BiUser,
  BiEnvelope,
  BiPhone,
} from "react-icons/bi";

const SORT_OPTIONS = [
  {
    key: "id-desc",
    value: "id:DESC",
    label: "جدیدترین (ID نزولی)",
    icon: <BiSortDown className="text-xl" />,
  },
  {
    key: "id-asc",
    value: "id:ASC",
    label: "قدیمی‌ترین (ID صعودی)",
    icon: <BiSortUp className="text-xl" />,
  },
  {
    key: "firstName-asc",
    value: "firstName:ASC",
    label: "نام (الف → ی)",
    icon: <BiUser className="text-xl" />,
  },
  {
    key: "firstName-desc",
    value: "firstName:DESC",
    label: "نام (ی → الف)",
    icon: <BiUser className="text-xl" />,
  },
  {
    key: "email-asc",
    value: "email:ASC",
    label: "ایمیل (A → Z)",
    icon: <BiEnvelope className="text-xl" />,
  },
  {
    key: "email-desc",
    value: "email:DESC",
    label: "ایمیل (Z → A)",
    icon: <BiEnvelope className="text-xl" />,
  },
  {
    key: "phone-asc",
    value: "phone:ASC",
    label: "تلفن (صعودی)",
    icon: <BiPhone className="text-xl" />,
  },
  {
    key: "phone-desc",
    value: "phone:DESC",
    label: "تلفن (نزولی)",
    icon: <BiPhone className="text-xl" />,
  },
];

const CustomersSortModal = () => {
  return <SortModal options={SORT_OPTIONS} title="مرتب‌سازی کاربران" />;
};

export default CustomersSortModal;
