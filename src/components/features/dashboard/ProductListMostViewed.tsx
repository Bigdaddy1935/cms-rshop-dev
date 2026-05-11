"use client"

import dynamic from "next/dynamic";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import { useGetProducts } from "@/core/hooks/api/products/useProduct";
import { BiArrowBack } from "react-icons/bi";
import { LuPackage } from "react-icons/lu";
const ProductCard = dynamic(() => import("../products/ProductCard"), { ssr: false });

const ProductListMostViewed = () => {
  const { data: products, isLoading } = useGetProducts({ page: 1, limit: 5 });

  const isExistItems = !!products?.data?.items?.length;

  return (
    <UnifiedCard
      headerProps={{
        title: "جدیدترین محصولات",
        icon: <LuPackage className="text-2xl" />,
        btnIcon: <BiArrowBack/>,
        textBtn: "محصولات",
        redirect: "/admin/products",
        btnClassName: "flex-row-reverse bg-orange-700/10 text-orange-700"
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
    >
      {products?.data?.items?.map((product: any, index: number) => (
        <ProductCard key={index} product={product} disableAction/>
      ))}
    </UnifiedCard>
  );
};

export default ProductListMostViewed;
