import type { ProductResponse, CreateProductRequest } from "./types/product";

const toNumber = (
  value: string | number | null | undefined,
  defaultValue = 0,
) => (value === null || value === undefined ? defaultValue : Number(value));

export function mapAPIToLocalProduct(p: ProductResponse): CreateProductRequest {
  const mediaIds = p.media_ids?.length
    ? p.media_ids
    : (p.medias?.map((m) => m.id) ?? []);

  return {
    name: p.name ?? "",
    price: toNumber(p.price),
    stock: p.stock ?? 0,
    is_limited_stock: !!p.is_limited_stock,
    category_id: p.category_id ?? 0,
    discount_amount: toNumber(p.discount_amount),
    discount_percent: toNumber(p.discount_percent),
    is_featured: !!p.is_featured,
    weight: toNumber(p.weight),
    weight_unit: p.weight_unit ?? "کیلوگرم",
    is_same_day_shipping: !!p.is_same_day_shipping,
    requires_preparation: !!p.requires_preparation,
    preparation_days: toNumber(p.preparation_days),
    description: p.description ?? "",
    order_limit: toNumber(p.order_limit),
    is_visible: !!p.is_visible,
    media_ids: mediaIds,
    media_pinned_id: p.media_pinned_id ?? null,
    helper_id: p.helper?.id ?? p.helper_id ?? null,
    brand_id: p.brand?.id ?? p.brand_id ?? null,
    sku: p.sku || "",
    is_active: p.is_active,
  };
}
