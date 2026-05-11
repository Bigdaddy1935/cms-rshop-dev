export type StatusOrder =
  | "start_order"
  | "pending_approval"
  | "awaiting_payment"
  | "payment_confirmation_pending"
  | "preparing"
  | "shipping"
  | "delivered"
  | "not_delivered"
  | "expired"
  | "rejected"
  | "refunded"
  | "payment_failed"
  | "processing"
  | "cancelled";

export type OrderData = {
  id: number;
  status: StatusOrder;
  subtotal: string;
  discount_total: string;
  total: string;
  payment_gateway_ref: string | null;
  coupon_code: string | null;
  coupon_discount_amount: string;
  is_manual: boolean;
  note: string | null;
  created_at: string;
  user: {
    id: number;
    first_name: string | null;
    last_name: string | null;
    phone: string;
    is_phone_verified: boolean;
    email: string | null;
    is_active: boolean;
    last_login_at: string;
    avatar_url: string | null;
    media_id: number | null;
    created_at: string;
  };
  address: any;
  payment: any;
  items: any;
  updated_at?: string;
  shipping_cost: number;
  promotion_code: string;
  customer_note: string;
  manual_discount_applied: number;
  total_weight: number;

  gift_message: "";
  gift_wrapping: null;
  gift_wrapping_cost: 0;
  is_gift: boolean;
  manual_discount_type: string;
  manual_discount_value: number;
  promotions_discount_type: string;
  promotions_discount_value: number;
  promotions_discount_applied: number;
};

export type OrderSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "createdAt:ASC"
  | "createdAt:DESC"
  | "total:ASC"
  | "total:DESC"
>;
