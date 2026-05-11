import {
  CardToCardStatus,
  CardToCardStatusType,
  PaymentGateway,
  PaymentGatewayType,
  PaymentLogStatus,
  PaymentLogStatusType,
  PaymentMethod,
  PaymentMethodType,
  PaymentStatus,
  PaymentStatusType,
} from "./payment-constants";

export const getPaymentOnlineStatusText = (
  status?: PaymentStatusType,
): string => {
  switch (status) {
    case PaymentStatus.SUCCESS:
      return "پرداخت موفق";
    case PaymentStatus.FAILED:
      return "پرداخت ناموفق";
    case PaymentStatus.CANCELLED:
      return "لغو شده توسط کاربر";
    case PaymentStatus.REFUNDED:
      return "وجه بازگشت داده شد";
    case PaymentStatus.VERIFIED:
      return "تأیید شده";
    case PaymentStatus.PENDING:
    case PaymentStatus.IN_PROGRESS:
      return "در انتظار پرداخت";
    default:
      return "وضعیت پرداخت نامشخص";
  }
};

export const getPaymentLogStatusText = (
  status?: PaymentLogStatusType,
): string => {
  switch (status) {
    case PaymentLogStatus.INITIATED:
      return "آغاز شده";
    case PaymentLogStatus.VERIFIED:
      return "تأیید شده";
    case PaymentLogStatus.FAILED:
      return "ناموفق";
    case PaymentLogStatus.CALLBACK_RECEIVED:
      return "دریافت بازخورد از درگاه";
    case PaymentLogStatus.USER_CANCELLED:
      return "لغو توسط کاربر";
    default:
      return "نامشخص";
  }
};

export const getPaymentMethodText = (method?: PaymentMethodType): string => {
  switch (method) {
    case PaymentMethod.ONLINE:
      return "آنلاین";
    case PaymentMethod.CASH:
      return "نقدی";
    case PaymentMethod.CARD_TO_CARD:
      return "کارت به کارت";
    case PaymentMethod.CHEQUE:
      return "چک";
    case PaymentMethod.BANK_TRANSFER:
      return "حواله بانکی";
    case PaymentMethod.CREDIT:
      return "اعتباری (نسیه)";
    case PaymentMethod.WALLET:
      return "کیف پول";
    default:
      return "نامشخص";
  }
};

export const getPaymentStatusDetailText = (
  status?: PaymentStatusType,
): string => {
  switch (status) {
    case PaymentStatus.PENDING:
      return "در انتظار پرداخت";
    case PaymentStatus.IN_PROGRESS:
      return "در حال پرداخت";
    case PaymentStatus.SUCCESS:
      return "پرداخت موفق";
    case PaymentStatus.FAILED:
      return "پرداخت ناموفق";
    case PaymentStatus.CANCELLED:
      return "لغو شده";
    case PaymentStatus.VERIFIED:
      return "تأیید شده";
    case PaymentStatus.REFUNDED:
      return "بازگشت وجه";
    default:
      return "وضعیت نامشخص";
  }
};

export const getCardToCardStatusText = (
  status?: CardToCardStatusType,
): string => {
  switch (status) {
    case CardToCardStatus.PENDING:
      return "منتظر آپلود رسید";
    case CardToCardStatus.UPLOADED:
      return "رسید آپلود شد";
    case CardToCardStatus.APPROVED:
      return "تأیید شده";
    case CardToCardStatus.REJECTED:
      return "رد شده";
    default:
      return "وضعیت نامشخص";
  }
};

export const getPaymentGatewayText = (gateway?: PaymentGatewayType): string => {
  switch (gateway) {
    case PaymentGateway.ZARINPAL:
      return "زرین‌پال";
    case PaymentGateway.MELAT:
      return "ملت";
    case PaymentGateway.MELI:
      return "ملی";
    default:
      return "نامشخص";
  }
};

export interface PaymentInfo {
  payment_method?: PaymentMethodType;
  gateway?: string;
  status?: PaymentStatusType;
  card_to_card_status?: CardToCardStatusType;
}

export const getFullPaymentInfo = (payment: PaymentInfo) => {
  return {
    method: getPaymentMethodText(payment.payment_method),
    status: getPaymentOnlineStatusText(payment.status),
    cardToCardStatus: getCardToCardStatusText(payment.card_to_card_status),
    gateway: getPaymentGatewayText(payment.gateway as PaymentGatewayType),
    logStatus: getPaymentLogStatusText(payment.status as PaymentLogStatusType),
  };
};

export const getPaymentStatusText = (payment: PaymentInfo): string => {
  if (!payment) return "پرداخت نشده";

  const { payment_method, gateway, status, card_to_card_status } = payment;

  // کارت به کارت
  if (payment_method === PaymentMethod.CARD_TO_CARD) {
    switch (card_to_card_status) {
      case CardToCardStatus.PENDING:
        return "منتظر آپلود رسید";
      case CardToCardStatus.UPLOADED:
        return "رسید آپلود شد (در انتظار تأیید)";
      case CardToCardStatus.APPROVED:
        return "تأیید شده توسط ادمین";
      case CardToCardStatus.REJECTED:
        return "رسید رد شد";
      default:
        return "کارت به کارت — در انتظار رسید";
    }
  }

  // پرداخت آنلاین
  if (payment_method === PaymentMethod.ONLINE || gateway) {
    return getPaymentOnlineStatusText(status);
  }

  // سایر روش‌ها
  if (payment_method) {
    const methodText = getPaymentMethodText(payment_method);
    if (status) {
      const statusText = getPaymentStatusDetailText(status);
      return `پرداخت ${methodText} - وضعیت: ${statusText}`;
    }
    return `پرداخت ${methodText}`;
  }

  return "پرداخت نشده";
};
