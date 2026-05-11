export type OrderStepKey =
  | "pending_approval" // 1
  | "awaiting_payment" // 2
  | "confirming_payment" // 3 (جدید — مخصوص تایید رسید کارت به کارت)
  | "preparing" // 4
  | "shipping" // 5
  | "delivered"; // 6

// عنوان هر استپ برای تب‌ها
export const STEP_TITLES: Record<OrderStepKey, string> = {
  pending_approval: "درخواست شده",
  awaiting_payment: "در انتظار پرداخت",
  confirming_payment: "تایید پرداخت",
  preparing: "در حال آماده‌سازی",
  shipping: "در حال ارسال",
  delivered: "تحویل شده",
};

// مپ کردن وضعیت واقعی سفارش → استپ ویزارد
export const statusToStepMap: Record<string, OrderStepKey> = {
  pending_approval: "pending_approval",
  awaiting_payment: "awaiting_payment",
  payment_confirmation_pending: "confirming_payment", // این مهمه! رسید آپلود شده → استپ ۳
  preparing: "preparing",
  shipping: "shipping",
  not_delivered: "shipping", // هنوز در حال ارسال
  delivered: "delivered",
  expired: "awaiting_payment",
  rejected: "awaiting_payment",
  cancelled: "pending_approval",
  refunded: "delivered", // یا می‌تونی یه استپ جدا بزنی مثلا refunded
  payment_failed: "awaiting_payment",
};

export const getCurrentStep = (status?: string): OrderStepKey => {
  return status && status in statusToStepMap
    ? statusToStepMap[status]
    : "pending_approval";
};
