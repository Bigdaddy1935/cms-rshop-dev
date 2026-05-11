"use client";

import React, { useEffect, useState, useRef } from "react";
import MultiProductVariantsModal from "./ProductVariants/MultiProductVariantsModal";
import { useProductsSelection } from "./ProductsSelectionContext";
import ProductVariantsCard from "../ProductVariantsCard";
import { TbPackage, TbPackages } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ProductVariants } from "./selectable-product";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

const InnerMultiProductVariantsSelectorQuantityCard: React.FC<{
  onChange?: (products: any[]) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedProducts, removeProduct, setSelectedProducts } =
    useProductsSelection();
  const isFirstRender = useRef(true);

  // تعداد برای واریانت‌ها: key = "productId-variantId"
  const [variantQuantities, setVariantQuantities] = useState<
    Record<string, number>
  >({});

  // تعداد برای محصولات ساده (بدون واریانت)
  const [simpleProductQuantities, setSimpleProductQuantities] = useState<
    Record<number, number>
  >({});

  // مقداردهی اولیه برای محصولات ساده و واریانت‌ها
  useEffect(() => {
    const newSimpleQty: Record<number, number> = { ...simpleProductQuantities };
    const newVariantQty: Record<string, number> = { ...variantQuantities };

    let hasChange = false;

    selectedProducts.forEach((p: any) => {
      // محصولات ساده
      if (!p.variants || p.variants.length === 0) {
        if (newSimpleQty[p.id] === undefined) {
          newSimpleQty[p.id] = 1;
          hasChange = true;
        }
      }
      // محصولات با واریانت
      else if (p.variants?.length > 0) {
        p.variants.forEach((v: any) => {
          const key = `${p.id}-${v.id}`;
          if (newVariantQty[key] === undefined) {
            newVariantQty[key] = 1;
            hasChange = true;
          }
        });
      }
    });

    // پاک کردن مقادیر مربوط به محصولاتی که حذف شدن
    Object.keys(newSimpleQty).forEach((idStr) => {
      const id = Number(idStr);
      if (!selectedProducts.find((p: any) => p.id === id)) {
        delete newSimpleQty[id];
        hasChange = true;
      }
    });

    if (hasChange) {
      setSimpleProductQuantities(newSimpleQty);
      setVariantQuantities(newVariantQty);
    }
  }, [selectedProducts]);

  // هر تغییری در محصولات یا تعداد → به والد اطلاع بده
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const productsWithQuantity = selectedProducts.map((product: any) => {
      if (!product.variants || product.variants.length === 0) {
        // محصول ساده
        return {
          ...product,
          quantity: simpleProductQuantities[product.id] ?? 1,
          variants: [],
        };
      } else {
        // محصول با واریانت
        return {
          ...product,
          quantity: undefined, // مهم نیست، بک‌اند از variant_ids استفاده می‌کنه
          variants: product.variants.map((v: any) => ({
            ...v,
            quantity: variantQuantities[`${product.id}-${v.id}`] ?? 1,
          })),
        };
      }
    });

    onChange?.(productsWithQuantity);
  }, [selectedProducts, simpleProductQuantities, variantQuantities]);

  // آپدیت تعداد محصول ساده
  const updateSimpleQuantity = (productId: number, qty: number) => {
    setSimpleProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, qty || 1),
    }));
  };

  // آپدیت تعداد واریانت
  const updateVariantQuantity = (
    productId: number,
    variantId: number,
    qty: number
  ) => {
    setVariantQuantities((prev) => ({
      ...prev,
      [`${productId}-${variantId}`]: Math.max(1, qty || 1),
    }));
  };

  // حذف واریانت از محصول
  const removeVariantFromProduct = (productId: number, variantId: number) => {
    setSelectedProducts((prev: any[]) =>
      prev.map((p: any) => {
        if (p.id === productId && p.variants?.length > 0) {
          const newVariants = p.variants.filter((v: any) => v.id !== variantId);
          return { ...p, variants: newVariants };
        }
        return p;
      })
    );
  };

  return (
    <EmptyStateContainer
      title="محصولات انتخاب‌شده با تنوع ها"
      icon={TbPackage}
      initial={selectedProducts}
      modal={<MultiProductVariantsModal />}
      error={error}
    >
      <div className="flex flex-col gap-6 py-4">
        {selectedProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            هیچ محصولی انتخاب نشده است
          </p>
        ) : (
          selectedProducts.map((product) => (
            <ProductVariantsCard
              key={product.id}
              product={product}
              showVariants={!!product.variants?.length}
              contentProduct={
                <>
                  <div className="deselect-icon !-mt-8 !-left-4">
                    <AiOutlineCloseCircle
                      onClick={() => removeProduct(product.id)}
                    />
                  </div>

                  <div className="absolute top-3 left-2">
                    {/* تعداد برای محصول بدون واریانت */}
                    {!product.variants?.length && (
                      <input
                        type="number"
                        min="1"
                        value={simpleProductQuantities[product.id] ?? 1}
                        onChange={(e) =>
                          updateSimpleQuantity(product.id, +e.target.value)
                        }
                        className="w-12 h-7 text-center border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </>
              }
              contentVariant={(variant: any) => (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={
                      variantQuantities[`${product.id}-${variant.id}`] ?? 1
                    }
                    onChange={(e) =>
                      updateVariantQuantity(
                        product.id,
                        variant.id,
                        +e.target.value
                      )
                    }
                    className="w-12 h-7 text-center border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <div className="deselect-icon !-left-6 !top-2">
                    <AiOutlineCloseCircle
                      className=""
                      onClick={() =>
                        removeVariantFromProduct(product.id, variant.id)
                      }
                    />
                  </div>
                </div>
              )}
            />
          ))
        )}
      </div>
    </EmptyStateContainer>
  );
};

type Props = {
  onChange?: (data: ProductVariants) => void;
  error?: boolean;
};

const ProductVariantQuantitySelectionBox: React.FC<Props> = ({
  onChange,
  error,
}) => {
  return (
    <InnerMultiProductVariantsSelectorQuantityCard onChange={onChange} error={error} />
  );
};

export default ProductVariantQuantitySelectionBox;
