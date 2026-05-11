"use client";

import { useParams } from "next/navigation";
import { useGetStoreInfos } from "@/core/hooks/api/useStoreInfo";
import StorePageForm from "@/components/features/store/store-page/StorePageForm";
import { notFound } from "next/navigation";

const StorePageEditor = () => {
  const { type } = useParams();
  const { data, isLoading } = useGetStoreInfos();

  // لیست typeهای مجاز
  const validTypes = ["about_us", "purchase_guide", "return_policy"];
  if (!validTypes.includes(type as any)) return notFound();

  const currentPage = data?.data?.find((item: any) => item.type === type);

  return <StorePageForm initialData={currentPage} type={type as any} isLoading={isLoading}/>;
};

export default StorePageEditor;
