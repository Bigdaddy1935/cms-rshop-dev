export interface ProductResponse {
  id: number;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  is_limited_stock: boolean;
  is_same_day_shipping: boolean;
  order_limit: number;
  requires_preparation: boolean;
  preparation_days: number | null;

  media_pinned: MediaPinned | null;
  media_pinned_id: number | null;

  category: Category | null;
  category_id: number | null;

  brand: Brand | null;
  brand_id: number | null;

  discount_amount: number | string | null;
  discount_percent: number | string | null;
  is_featured: boolean;

  weight: number;
  weight_unit: string;

  helper: Helper | null;
  helper_id: number | null;

  is_visible: boolean;

  average_raiting?: number;
  reviews_count?: number;

  medias: Media[];
  media_ids: number[];

  variants: Variant[];

  specifications: any[];
  attribute_nodes: AttributeNode[];
  sku: string
  is_active: boolean
}

export interface CreateProductRequest {
  name: string;
  price: number;
  stock: number;
  is_limited_stock: boolean;
  category_id: number;
  discount_amount: number;
  discount_percent: number;
  is_featured: boolean;
  weight: number;
  weight_unit: string;
  is_same_day_shipping: boolean;
  requires_preparation: boolean;
  preparation_days: number | null;
  description: string | null;
  order_limit: number;
  is_visible: boolean;
  media_ids: number[];
  media_pinned_id: number | null;
  helper_id: number | null;
  brand_id: number | null;
  sku: string
  is_active: boolean
}


/* ---------------- Subtypes ---------------- */

export interface Media {
  id: number;
  url: string;
  alt: string | null;
  type: "image" | "video" | string;
}

export interface MediaPinned {
  id: number;
  url: string;
  type: string;
  alt_text: string | null;
  product_id: number | null;
  category_id: number | null;
  user_id: number | null;
  created_at: string;
}

export interface Category {
  id: number;
  title: string;
  slug: string;
  parent_id: number | null;
  level: number;
  discount: string | number;
  display_order: number;
  is_active: boolean;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo: string;
  is_active: boolean;
}

export interface Helper {
  id: number;
  title: string;
  description: string;
  image: string;
}

/* ---------------- Variants ---------------- */

export interface Variant {
  id: number;
  name: string;
  product_id: number;
  sku: string;
  price: number;
  discount_amount: string | number;
  discount_percent: string | number;
  stock: number;
  attributes: VariantAttribute[];
}

export interface VariantAttribute {
  id: number;
  name: string;
  slug: string;
  type: string;
  values: VariantAttributeValue;
}

export interface VariantAttributeValue {
  id: number;
  value: string;
  display_color: string | null;
  is_active: boolean;
  display_order: number | null;
}

/* ------------- Attribute Nodes ------------- */

export interface AttributeNode {
  id: number;
  name: string;
  slug: string;
  display_order: number;
  attributes: AttributeNodeItem[];
}

export interface AttributeNodeItem {
  id: number;
  name: string;
  slug: string;
  is_public: boolean;
  group_id: number;
  type: string;
  display_order: number;
  is_variant: boolean;
  values: AttributeNodeValue[];
}

export interface AttributeNodeValue {
  id: number;
  value: string;
  attribute_id: number;
  display_color: string | null;
  display_order: number | null;
  is_active: boolean;
}
