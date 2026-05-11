"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Product = Record<string, any>;

type ProductsSelectionContextType = {
  selectedProducts: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductsSelectionContext =
  createContext<ProductsSelectionContextType | null>(null);

export const useProductsSelection = () => {
  const ctx = useContext(ProductsSelectionContext);
  if (!ctx)
    throw new Error(
      "useProductsSelection must be used within ProductsSelectionProvider",
    );
  return ctx;
};

export const ProductsSelectionProvider: React.FC<{
  initialProducts?: Product[];
  children: React.ReactNode;
}> = ({ initialProducts = [], children }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (initialProducts?.length) {
      setSelectedProducts(initialProducts);
    }
  }, [initialProducts]);

  const addProduct = (product: Product) => {
    setSelectedProducts((prev) => {
      const filtered = prev.filter((p: any) => p.id !== product.id);
      return [...filtered, product];
    });
  };

  const removeProduct = (productId: number) => {
    setSelectedProducts((prev) => prev.filter((p: any) => p.id !== productId));
  };

  return (
    <ProductsSelectionContext.Provider
      value={{
        selectedProducts,
        addProduct,
        removeProduct,
        setSelectedProducts,
      }}
    >
      {children}
    </ProductsSelectionContext.Provider>
  );
};
