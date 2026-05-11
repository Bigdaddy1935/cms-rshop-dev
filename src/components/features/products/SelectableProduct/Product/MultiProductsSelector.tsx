"use client";

import React, { useMemo } from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import ProductVariantsCard from "../../ProductVariantsCard";
import { useProductsSelection } from "../ProductsSelectionContext";

type Product = Record<string, any>;

type Props = {
  product: Product;
  disableSelect?: boolean;
};

const MultiProductsSelector: React.FC<Props> = ({
  product,
  disableSelect,
}) => {
  const { selectedProducts, addProduct, removeProduct } =
    useProductsSelection();

  const isProductSelected = useMemo(() => {
    return selectedProducts.some(
      (p: any) => p.id === product.id && !p.variants?.length
    );
  }, [selectedProducts, product.id]);

  const handleProductSelect = (selected: boolean) => {
    if (selected) {
      removeProduct(product.id);
      addProduct({ ...product, variants: [] });
    } else {
      removeProduct(product.id);
    }
  };

  const getSelectedProductIds = () => (isProductSelected ? [product.id] : []);

  const productWrapper = (
    <SelectableCard
      id={product.id}
      selectedIds={getSelectedProductIds()}
      onSelectionChange={(id, isSelected) => handleProductSelect(isSelected)}
      disabled={disableSelect}
    />
  );

  return (
    <ProductVariantsCard
      product={product}
      children={productWrapper}
      showVariants={false}
    />
  );
};

export default MultiProductsSelector;