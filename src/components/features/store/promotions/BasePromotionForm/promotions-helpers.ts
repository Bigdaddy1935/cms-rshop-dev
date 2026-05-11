import { FORM_CONFIGS } from "./form-configs-promotions";
import {
  PromotionActionType,
  PromotionAPI,
  PromotionConditionType,
  PromotionForm,
} from "../promotions-types";

export function normalizeSelectableProducts(
  items: { product_id: number; variants: number[] | null }[] = []
) {
  const productIds: number[] = [];
  const variantIds: number[] = [];

  for (const it of items) {
    if (!it) continue;
    const pid = Number(it.product_id);
    if (!Number.isNaN(pid)) productIds.push(pid);

    if (Array.isArray(it.variants)) {
      for (const v of it.variants) {
        const vid = Number(v);
        if (!Number.isNaN(vid)) variantIds.push(vid);
      }
    }
  }

  // dedupe
  return {
    productIds: Array.from(new Set(productIds)),
    variantIds: Array.from(new Set(variantIds)),
  };
}

export function mapAPIToLocalForm(
  initialData: any,
  formType: string
): PromotionForm {
  const allowedProducts =
    (initialData?.allowed_products || []).map((p: any) => {
      if (p?.product_id)
        return { product_id: p.product_id, variants: p.variants ?? null };
      if (typeof p === "object" && p.productId)
        return { product_id: p.productId, variants: p.variantIds ?? null };
      return { product_id: p, variants: null };
    }) || [];

  const firstOrderCond = !!initialData?.conditions?.some(
    (c: any) => c.type === "first_order"
  );
  
  const minOrderAmount = initialData?.conditions?.find(
    (c: any) => c.type === "min_order_amount"
  );
  
  const percentDiscount = initialData?.actions?.find(
    (c: any) => c.type === "percent_discount"
  );
  
  const amountDiscount = initialData?.actions?.find(
    (c: any) => c.type === "amount_discount"
  );
  
  return {
    name: initialData?.name || "",
    code: initialData?.code || "",
    percent_discount: percentDiscount?.value ?? 0,
    amount_discount: amountDiscount?.value ?? 0,
    usage_limit: initialData?.usage_limit,
    min_order_amount: minOrderAmount?.min_amount || null,
    max_discount_amount: initialData?.max_discount_amount,
    starts_at: initialData?.starts_at,
    ends_at: initialData?.ends_at,
    is_active: initialData?.is_active ?? true,
    first_order: firstOrderCond || formType === "first_order",
    allowed_users: initialData?.allowed_users || [],
    allowed_products: allowedProducts,
    allowed_categories: initialData?.allowed_categories || [],
  };
}

export function mapLocalFormToAPI(
  form: PromotionForm,
  formType: keyof typeof FORM_CONFIGS
): PromotionAPI {
  const actions: PromotionActionType[] = [];
  if (form.percent_discount > 0)
    actions.push({ type: "percent_discount", value: +form.percent_discount });
  if (form.amount_discount > 0)
    actions.push({ type: "amount_discount", value: +form.amount_discount });

  const conditions: PromotionConditionType[] = [];
  if (form.min_order_amount)
    conditions.push({
      type: "min_order_amount",
      min_amount: form.min_order_amount,
    });
  if (form.allowed_products?.length) {
    conditions.push({ type: "product", products: form.allowed_products });
  }
  if (form.allowed_categories?.length)
    conditions.push({
      type: "category",
      category_ids: form.allowed_categories,
    });
  if (form.allowed_users?.length)
    conditions.push({ type: "user", user_ids: form.allowed_users });
  if (form.first_order) conditions.push({ type: "first_order" });

  return {
    name: form.name,
    code: form.code,
    actions,
    conditions,
    usage_limit: form.usage_limit,
    max_discount_amount: form.max_discount_amount,
    starts_at: form.starts_at,
    ends_at: form.ends_at,
    is_active: form.is_active,
    type: formType,
  };
}
