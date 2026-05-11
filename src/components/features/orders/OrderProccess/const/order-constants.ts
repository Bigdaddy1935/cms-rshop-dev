import { StatusOrder } from "../../order-types";

export const OrderStatus = {
  START_ORDER: "start_order", // شروع سفارش
  PENDING_APPROVAL: "pending_approval", // در انتظار تایید
  AWAITING_PAYMENT: "awaiting_payment", // در انتظار پرداخت
  PAYMENT_CONFIRMATION_PENDING: "payment_confirmation_pending", // تایید پرداخت در انتظار
  PREPARING: "preparing", // در حال آماده‌سازی
  SHIPPING: "shipping", // در حال ارسال
  DELIVERED: "delivered", // تحویل شده
  NOT_DELIVERED: "not_delivered", // تحویل نشده
  EXPIRED: "expired", // منقضی شده
  REJECTED: "rejected", // رد شده
  REFUNDED: "refunded", // بازپرداخت شده
  PAYMENT_FAILED: "payment_failed", // پرداخت ناموفق
  PROCESSING: "processing", // در حال پردازش
  CANCELLED: "cancelled", // لغو شده
} as const;

export type OrderStatusType = (typeof OrderStatus)[keyof typeof OrderStatus];

export const orderStatusOptions: { key: StatusOrder; title: string }[] = [
  { key: "start_order", title: "ثبت اولیه" },
  { key: "pending_approval", title: "در انتظار تایید" },
  { key: "awaiting_payment", title: "در انتظار پرداخت" },
  { key: "payment_confirmation_pending", title: "در انتظار تأیید پرداخت" },
  { key: "preparing", title: "در حال آماده‌سازی" },
  { key: "shipping", title: "در حال ارسال" },
  { key: "delivered", title: "تحویل شده" },
  { key: "not_delivered", title: "تحویل نشده" },
  { key: "expired", title: "منقضی شده" },
  { key: "rejected", title: "رد شده" },
  { key: "refunded", title: "مرجوع شده" },
  { key: "payment_failed", title: "پرداخت ناموفق" },
  { key: "processing", title: "درحال پردازش" },
  { key: "cancelled", title: "لغو شده" },
];
