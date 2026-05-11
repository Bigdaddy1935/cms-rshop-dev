"use client";

import React, { useMemo } from "react";
import { useGetSizeGuide } from "@/core/hooks/api/useSizeGuide";
import AddNewSizeGuideModal from "./AddNewSizeGuideModal";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import AutocompleteInput from "@/components/ui/inputs/AutocompleteInput";

type SizeGuideSelectProps = {
  value?: string | number | null;
  onChange: (val: string | number | null) => void;
  errorMessage?: string;
  withAddModal?: boolean;
  isRequired?: boolean;
};

const SizeGuideSelect: React.FC<SizeGuideSelectProps> = ({
  value,
  onChange,
  errorMessage,
  withAddModal = false,
  isRequired = false,
}) => {
  const { search } = useListQueryParams({
    searchKey: "size",
  });
  const { data: sizeGuide } = useGetSizeGuide({
    page: 1,
    search,
  });

  const options = useMemo(() => {
    return (
      sizeGuide?.data?.items?.map((s: any) => ({
        id: String(s.id),
        title: s.title,
      })) ?? []
    );
  }, [sizeGuide?.data?.items]);

  return (
    <div
      className={`w-full flex ${errorMessage?.length ? "items-center" : "items-end"} gap-2`}
    >
      <AutocompleteInput
        label={"راهنما سایز"}
        placeholder={"در صورت نیاز انتخاب کنید (اختیاری)"}
        options={
          options.length ? options : [{ id: 0, title: "آیتمی موجود نیست" }]
        }
        selectedId={value ? String(value) : ""}
        onChange={(val) => {
          onChange(val ? Number(val) : null);
        }}
        isRequired={isRequired}
        searchKey={"size"}
        syncSearchToUrl
      />

      {withAddModal && (
        <div className="mb-1">
          <AddNewSizeGuideModal />
        </div>
      )}
    </div>
  );
};

export default SizeGuideSelect;
