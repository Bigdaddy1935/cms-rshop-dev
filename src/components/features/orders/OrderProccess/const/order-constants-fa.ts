import { OrderStatus, OrderStatusType } from "./order-constants";

export const getOrderStatusText = (status?: OrderStatusType): string => {
  switch (status) {
    case OrderStatus.START_ORDER:
      return "ثبت اولیه";
    case OrderStatus.PENDING_APPROVAL:
      return "در انتظار تأیید";
    case OrderStatus.AWAITING_PAYMENT:
      return "در انتظار پرداخت";
    case OrderStatus.PAYMENT_CONFIRMATION_PENDING:
      return "در انتظار تأیید پرداخت";
    case OrderStatus.PREPARING:
      return "در حال آماده‌سازی";
    case OrderStatus.SHIPPING:
      return "در حال ارسال";
    case OrderStatus.DELIVERED:
      return "تحویل شده";
    case OrderStatus.NOT_DELIVERED:
      return "تحویل نشده";
    case OrderStatus.EXPIRED:
      return "منقضی شده";
    case OrderStatus.REJECTED:
      return "رد شده";
    case OrderStatus.REFUNDED:
      return "مرجوع شده";
    case OrderStatus.PAYMENT_FAILED:
      return "پرداخت ناموفق";
    case OrderStatus.PROCESSING:
      return "در حال پردازش";
    case OrderStatus.CANCELLED:
      return "لغو شده";
    default:
      return "وضعیت نامشخص";
  }
};