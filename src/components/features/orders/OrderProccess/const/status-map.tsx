"use client";

import { TfiShoppingCartFull } from "react-icons/tfi";
import { StatusOrder } from "@/components/features/orders/order-types";
import { LuClock } from "react-icons/lu";
import { PiHandArrowDownFill, PiMoneyWavy } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineCheckCircle, MdOutlineCancel, MdOutlinePayment, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaRegFileAlt, FaUndo } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import {
  PaymentLogStatus,
  PaymentLogStatusType,
  PaymentMethod,
  PaymentMethodType,
  PaymentStatus,
  PaymentStatusType,
} from "./payment-constants";
import {
  getPaymentLogStatusText,
  getPaymentMethodText,
  getPaymentStatusDetailText,
} from "./payment-constants-fa";
import { GoIssueClosed } from "react-icons/go";
import { AiOutlineCloseCircle, AiOutlineCreditCard } from "react-icons/ai";
import { HiOutlineBanknotes, HiOutlineBuildingLibrary } from "react-icons/hi2";

export const statusMap: Record<
  StatusOrder,
  {
    title: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
    borderColor: string;
  }
> = {
  start_order: {
    title: "ثبت اولیه",
    icon: <BiLoader />,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    borderColor: "border-sky-200",
  },
  pending_approval: {
    title: "در انتظار تایید",
    icon: <LuClock />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  awaiting_payment: {
    title: "در انتظار پرداخت",
    icon: <PiMoneyWavy />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  payment_confirmation_pending: {
    title: "در انتظار تایید پرداخت",
    icon: <LuClock />,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-purple-200",
  },
  preparing: {
    title: "در حال آماده‌سازی",
    icon: <TfiShoppingCartFull />,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  shipping: {
    title: "در حال ارسال",
    icon: <TbTruckDelivery />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  delivered: {
    title: "تحویل گرفته",
    icon: <MdOutlineCheckCircle />,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  not_delivered: {
    title: "تحویل نگرفته",
    icon: <PiHandArrowDownFill />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  expired: {
    title: "منقضی شده",
    icon: <MdOutlineCancel />,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
  rejected: {
    title: "رد شده",
    icon: <MdOutlineCancel />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  refunded: {
    title: "مرجوع شده",
    icon: <FaUndo />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  payment_failed: {
    title: "پرداخت ناموفق",
    icon: <MdOutlineCancel />,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  processing: {
    title: "در حال پردازش",
    icon: <TfiShoppingCartFull />,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  cancelled: {
    title: "لغو شده",
    icon: <MdOutlineCancel />,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
  },
};

export const getPaymentLogStatusMap = (status: PaymentLogStatusType) => {
  const baseMap = {
    [PaymentLogStatus.INITIATED]: {
      icon: <BiLoader />,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
    },
    [PaymentLogStatus.VERIFIED]: {
      icon: <GoIssueClosed size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    [PaymentLogStatus.FAILED]: {
      icon: <AiOutlineCloseCircle size={20} />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    [PaymentLogStatus.CALLBACK_RECEIVED]: {
      icon: <HiOutlineBanknotes size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    [PaymentLogStatus.USER_CANCELLED]: {
      icon: <MdOutlineCancel size={20} />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  };

  return {
    title: getPaymentLogStatusText(status),
    ...baseMap[status],
  };
};

export const getPaymentStatusMap = (status: PaymentStatusType) => {
  const baseMap = {
    [PaymentStatus.PENDING]: {
      icon: <BiLoader className="animate-spin" size={20} />,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
    },
    [PaymentStatus.IN_PROGRESS]: {
      icon: <BiLoader size={20} />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    [PaymentStatus.SUCCESS]: {
      icon: <GoIssueClosed size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    [PaymentStatus.FAILED]: {
      icon: <AiOutlineCloseCircle size={20} />,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    [PaymentStatus.CANCELLED]: {
      icon: <MdOutlineCancel size={20} />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    [PaymentStatus.VERIFIED]: {
      icon: <HiOutlineBanknotes size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    [PaymentStatus.REFUNDED]: {
      icon: <HiOutlineBanknotes size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  };

  return {
    title: getPaymentStatusDetailText(status),
    ...baseMap[status],
  };
};

export const getPaymentMethodMap = (method: PaymentMethodType) => {
  const baseMap = {
    [PaymentMethod.ONLINE]: {
      icon: <MdOutlinePayment size={20} />,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
    },
    [PaymentMethod.CASH]: {
      icon: <HiOutlineBanknotes size={20} />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    [PaymentMethod.CARD_TO_CARD]: {
      icon: <AiOutlineCreditCard size={20} />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    [PaymentMethod.CHEQUE]: {
      icon: <FaRegFileAlt size={20} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    [PaymentMethod.BANK_TRANSFER]: {
      icon: <HiOutlineBuildingLibrary size={20} />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    [PaymentMethod.CREDIT]: {
      icon: <MdOutlineAccountBalanceWallet size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    [PaymentMethod.WALLET]: {
      icon: <MdOutlineAccountBalanceWallet size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  };

  return {
    title: getPaymentMethodText(method),
    ...baseMap[method],
  };
};
