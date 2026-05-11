"use client";

import { AttributeProvider } from "@/components/features/products/create/context/AttributeContext";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
  return <AttributeProvider>{children}</AttributeProvider>;
};

export default ProductLayout;
