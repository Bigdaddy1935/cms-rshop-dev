import { ProductVariants } from "../../products/SelectableProduct/selectable-product";

// ------------------------------
// Action Types
// ------------------------------
export type PromotionActionType =
  | { type: "percent_discount"; value: number }
  | { type: "amount_discount"; value: number }
  | { type: "free_shipping" }
  | { type: "next_order_coupon"; meta: { reward_amount: number } };

// ------------------------------
// Condition Types
// ------------------------------
export type PromotionConditionType =
  | { type: "min_order_amount"; min_amount: number }
  | {
      type: "product";
      products: ProductVariants;
    }
  | { type: "category"; category_ids: number[] }
  | { type: "user"; user_ids: number[] }
  | { type: "first_order" };

// ------------------------------
// Base Promotion (Core Fields)
// ------------------------------
export type PromotionBase = {
  id?: number;
  name: string;
  code?: string | null;
  type: PromotionTypes;
  actions: PromotionActionType[];
  conditions?: PromotionConditionType[];
  starts_at?: string | null;
  ends_at?: string | null;
  usage_limit?: number;
  used_count: number;
  is_active: boolean;
  created_at?: string;
  max_discount_amount?: number;
};

// ------------------------------
// API Payload (POST / PATCH)
// ------------------------------
export type PromotionAPI = Omit<
  PromotionBase,
  "id" | "used_count" | "created_at"
>;

// ------------------------------
// Promotion Sort By Options
// ------------------------------
export type PromotionSortBy = Array<
  | "id:DESC"
  | "id:ASC"
  | "startsAt:DESC"
  | "startsAt:ASC"
  | "endsAt:DESC"
  | "endsAt:ASC"
>;

export type PromotionTypes =
  | "coupon"
  | "flash_deal"
  | "free_shipping"
  | "first_order"
  | "next_order_reward";

/*  */

export type PromotionForm = {
  name: string;
  code?: string;
  percent_discount: number;
  amount_discount: number;
  usage_limit?: number;
  min_order_amount?: number;
  max_discount_amount?: number;
  starts_at?: string | null;
  ends_at?: string | null;
  is_active: boolean;
  first_order?: boolean;
  allowed_products?: ProductVariants;
  allowed_categories?: number[];
  allowed_users?: number[];
};

export type PromotionFormConfig = {
  code: boolean;
  discount_fields: boolean;
  usage_limit: boolean;
  min_order_amount: boolean;
  max_discount_amount: boolean;
  first_order: boolean;
  scope: Array<"product" | "category" | "user">;
};
