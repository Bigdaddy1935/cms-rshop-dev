"use client";

import React, { useEffect } from "react";
import MultiProductVariantsModal from "./MultiProductVariantsModal";
import { useProductsSelection } from "../ProductsSelectionContext";
import ProductVariantsCard from "../../ProductVariantsCard";
import { TbPackage } from "react-icons/tb";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ProductVariants } from "../selectable-product";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

const InnerProductVariantSelectionBox: React.FC<{
  onChange?: (data: ProductVariants) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedProducts, removeProduct, addProduct, setSelectedProducts } =
    useProductsSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const products = selectedProducts.map((p: any) => ({
      product_id: p.id,
      variant_ids: p.variants?.map((v: any) => v.id) ?? [],
    }));

    onChange?.(products);
  }, [selectedProducts]);

  const removeVariantFromProduct = (productId: number, variantId: number) => {
    setSelectedProducts((prev: any[]) =>
      prev.map((p: any) => {
        if (p.id === productId && p.variants?.length > 0) {
          const newVariants = p.variants.filter((v: any) => v.id !== variantId);
          // محصول با واریانت‌های خالی باقی می‌ماند
          return { ...p, variants: newVariants };
        }
        return p;
      })
    );
  };
  
  return (
    <EmptyStateContainer
      title="محصولات انتخاب‌شده"
      icon={TbPackage}
      initial={selectedProducts}
      modal={<MultiProductVariantsModal />}
      error={error}
    >
      <div className="flex flex-col gap-4">
        {selectedProducts.map((selectedProduct) => (
          <ProductVariantsCard
            key={selectedProduct.id}
            product={selectedProduct}
            showVariants={selectedProduct?.variants?.length ? true : false}
            contentProduct={
              <div className="deselect-icon !-mt-8 !-left-4">
                <AiOutlineCloseCircle
                  onClick={() => removeProduct(selectedProduct.id)}
                />
              </div>
            }
            contentVariant={(variant: any) => (
              <div className="deselect-icon !-left-6 !top-2">
                <AiOutlineCloseCircle
                  className=""
                  onClick={() =>
                    removeVariantFromProduct(selectedProduct.id, variant.id)
                  }
                />
              </div>
            )}
          />
        ))}
      </div>
    </EmptyStateContainer>
  );
};

type ProductVariantSelectionBoxProps = {
  onChange?: (data: ProductVariants) => void;
  error?: boolean;
};

const ProductVariantSelectionBox: React.FC<ProductVariantSelectionBoxProps> = ({ onChange, error }) => {
  return <InnerProductVariantSelectionBox onChange={onChange} error={error} />;
};

export default ProductVariantSelectionBox;
