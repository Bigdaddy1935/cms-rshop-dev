export type VariantAttribute = {
  name: string;
  value: string;
  display_color?: string;
};

export type InvoiceItemVariant = {
  id: number;
  quantity: number;
  line_total: number;
  discount: number;
  variant: {
    id: number;
    sku: string;
    price: number;
    variant_discount: {
      percent: number;
      amount: number;
    };
    attributes: VariantAttribute[];
  };
};

export type InvoiceItemProduct = {
  id: number;
  name: string;
  image: string;
  price: number;
  product_discount: {
    percent: number;
    amount: number;
  };
};

export type InvoiceItem = {
  line_total: number;
  discount: number;
  quantity: number;
  product: InvoiceItemProduct;
  variants: InvoiceItemVariant[];
};

/* GET invoice */

export type InvoiceItemPayload = {
  id: number;
  line_total: number;
  discount: number;
  quantity: number;
  variant: {
    id: number;
    price: number;
    sku: string;
    attributes: { value: string }[];
    variant_discount: { percent: number; amount: number };
  };
  product: {
    id: number;
    image: string;
    name: string;
    price: number;
    product_discount: { percent: number; amount: number };
  };
};
