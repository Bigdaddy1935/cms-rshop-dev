"use client";

import { useGetOneGiftWrapping } from "@/core/hooks/api/useGiftWrapping";
import GiftWrappingForm from "@/components/features/orders/gift-wrapping/GiftWrappingForm";
import { useFetchOnEdit } from "@/core/hooks/common/useFetchOnEdit";
import Breadcrumbs from "@/components/common/Breadcrumbs";

const GiftWrappingCreate = () => {
  const { data, isLoading, editId } = useFetchOnEdit(useGetOneGiftWrapping);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumbs />
      <GiftWrappingForm data={data} isLoading={isLoading} id={editId} />
    </div>
  );
};

export default GiftWrappingCreate;
