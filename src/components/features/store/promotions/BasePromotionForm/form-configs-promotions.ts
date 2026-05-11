import { PromotionFormConfig } from "../promotions-types";

export const FORM_CONFIGS = {
  coupon: {
    code: true,
    discount_fields: true,
    usage_limit: true,
    min_order_amount: true,
    max_discount_amount: true,
    first_order: false,
    scope: ["product", "category", "user"],
  },

  first_order: {
    code: false,
    discount_fields: true,
    usage_limit: false,
    min_order_amount: true,
    max_discount_amount: true,
    first_order: true,
    scope: ["user"],
  },

  next_order_reward: { 
    code: false,
    discount_fields: true,
    usage_limit: true,
    min_order_amount: true,
    max_discount_amount: true,
    first_order: false,
    scope: ["user"],
  },

  free_shipping: {
    code: false,
    discount_fields: false,
    usage_limit: true,
    min_order_amount: true,
    max_discount_amount: false,
    first_order: false,
    scope: ["user"],
  },

  flash_deal: {
    code: false,
    discount_fields: true,
    usage_limit: false,
    min_order_amount: false,
    max_discount_amount: true,
    first_order: false,
    scope: ["product", "category"],
  },
} satisfies Record<string, PromotionFormConfig>;
