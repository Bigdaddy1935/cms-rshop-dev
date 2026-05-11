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

const MultiProductVariantsSelector: React.FC<Props> = ({
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

  const selectedVariantIds = useMemo(() => {
    const found = selectedProducts.find((p: any) => p.id === product.id);
    return found?.variants?.map((v: any) => v.id) || [];
  }, [selectedProducts, product.id]);

  const handleProductSelect = (selected: boolean) => {
    if (selected) {
      removeProduct(product.id);
      addProduct({ ...product, variants: [] });
    } else {
      removeProduct(product.id);
    }
  };

  const handleVariantSelect = (variantId: number, selected: boolean) => {
    if (isProductSelected) {
      removeProduct(product.id);
    }

    const found = selectedProducts.find((p: any) => p.id === product.id);
    let newVariants: any[] = [];

    if (found?.variants) {
      if (selected) {
        if (!found.variants.some((v: any) => v.id === variantId)) {
          newVariants = [
            ...found.variants,
            product.variants?.find((v: any) => v.id === variantId),
          ];
        } else newVariants = found.variants;
      } else
        newVariants = found.variants.filter((v: any) => v.id !== variantId);
    } else if (selected)
      newVariants = [product.variants?.find((v: any) => v.id === variantId)];

    if (newVariants.length === 0) removeProduct(product.id);
    else addProduct({ ...product, variants: newVariants });
  };

  const getSelectedProductIds = () => (isProductSelected ? [product.id] : []);
  const getSelectedVariantIds = () => selectedVariantIds;

  const productWrapper = (
    <SelectableCard
      id={product.id}
      selectedIds={getSelectedProductIds()}
      onSelectionChange={(id, isSelected) => handleProductSelect(isSelected)}
      disabled={disableSelect}
    />
  );

  const variantWrapper = (
    <SelectableCard
      selectedIds={getSelectedVariantIds()}
      onSelectionChange={(idVal, sel) => handleVariantSelect(+idVal, sel)}
      disabled={disableSelect}
    />
  );

  return (
    <ProductVariantsCard
      product={product}
      children={productWrapper}
      variantChildren={variantWrapper}
    />
  );
};

export default MultiProductVariantsSelector;