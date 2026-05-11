"use client";

import React, { useEffect } from "react";
import MultiProductsModal from "./MultiProductsModal";
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
  const { selectedProducts, removeProduct } = useProductsSelection();
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

  return (
    <EmptyStateContainer
      title="محصولات انتخاب‌شده"
      icon={TbPackage}
      initial={selectedProducts}
      modal={<MultiProductsModal />}
      error={error}
    >
      <div className="flex flex-col">
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
          />
        ))}
      </div>
    </EmptyStateContainer>
  );
};

type ProductSelectionBoxProps = {
  onChange?: (data: ProductVariants) => void;
  error?: boolean;
};

const ProductSelectionBox: React.FC<ProductSelectionBoxProps> = ({
  onChange,
  error,
}) => {
  return <InnerProductVariantSelectionBox onChange={onChange} error={error} />;
};

export default ProductSelectionBox;
