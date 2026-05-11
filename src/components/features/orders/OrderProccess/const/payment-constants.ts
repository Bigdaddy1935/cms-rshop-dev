export const PaymentStatus = {
  PENDING: 'pending', // پرداخت ایجاد شده ولی هنوز انجام نشده
  IN_PROGRESS: 'in_progress', // کاربر در درگاه پرداخت است
  SUCCESS: 'success', // پرداخت با موفقیت تایید شد
  FAILED: 'failed', // پرداخت شکست خورده
  CANCELLED: 'cancelled', // توسط کاربر لغو شد
  VERIFIED: 'verified', // تایید شده ولی فاکتور هنوز صادر نشده
  REFUNDED: 'refunded', // بازگشت وجه
} as const;

export type PaymentStatusType = typeof PaymentStatus[keyof typeof PaymentStatus];

export const PaymentLogStatus = {
  INITIATED: 'initiated',
  VERIFIED: 'verified',
  FAILED: 'failed',
  CALLBACK_RECEIVED: 'callback_received',
  USER_CANCELLED: 'user_cancelled',
} as const;

export type PaymentLogStatusType = typeof PaymentLogStatus[keyof typeof PaymentLogStatus];

export const PaymentGateway = {
  ZARINPAL: 'zarinpal',
  MELAT: 'melat',
  MELI: 'meli',
} as const;

export type PaymentGatewayType = typeof PaymentGateway[keyof typeof PaymentGateway];

export const PaymentMethod = {
  ONLINE: 'online', // آنلاین
  CASH: 'cash', // نقدی
  CARD_TO_CARD: 'card_to_card', // کارت به کارت
  CHEQUE: 'cheque', // چک
  BANK_TRANSFER: 'bank_transfer', // حواله بانکی
  CREDIT: 'credit', // اعتباری (نسیه)
  WALLET: 'wallet', // کیف پول
} as const;

export type PaymentMethodType = typeof PaymentMethod[keyof typeof PaymentMethod];

export const CardToCardStatus = {
  PENDING: 'pending', // منتظر آپلود رسید
  UPLOADED: 'uploaded', // رسید آپلود شده، منتظر تایید
  APPROVED: 'approved', // تایید شده توسط ادمین
  REJECTED: 'rejected', // رد شده توسط ادمین
} as const;

export type CardToCardStatusType = typeof CardToCardStatus[keyof typeof CardToCardStatus];