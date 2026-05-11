"use client";

import React, { useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbIcons } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import IconCard from "../IconCard";
import SelectableCard from "@/components/ui/SelectableCard";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import IconFormModal from "../IconFormModal";
import { useGetIcons } from "@/core/hooks/api/useIcon";
import { useIconsSelection } from "./IconsSelectionContext";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";

const IconsSelectionModal: React.FC = () => {
  const { page, search, isFilteredView } = useListQueryParams();
  const { selectedIcons, addIcon, removeIcon } = useIconsSelection();

  const { data: icons, isLoading } = useGetIcons({
    page,
    search,
  });

  const isExistItems = !!icons?.data?.items?.length;

  const selectedIds = useMemo(
    () => selectedIcons.map((u: any) => u.id),
    [selectedIcons],
  );

  const handleSelectionChange = (icon: any, selected: boolean) => {
    if (selected) addIcon(icon);
    else removeIcon(icon.id);
  };

  return (
    <BaseModal
      title="انتخاب آیکون"
      icon={<TbIcons />}
      confirmActionClose
      size="xl"
    >
      <UnifiedCard
        headerProps={{
          title: "لیست آیکون ها",
          children: <IconFormModal />,
        }}
        searchFilter={
          <SearchFilterCard
            searchPlaceholder="جستجو در آیکون ها..."
            showSearchBar
            disableWrapperStyle
          />
        }
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={icons?.data?.meta}
        childrenClassName="grid grid-cols-1 phone:grid-cols-2 xs:grid-cols-3 md:grid-cols-4 !gap-2"
        disableWrapperStyle
      >
        {icons?.data?.items?.map((icon: any) => (
          <SelectableCard
            key={icon.id}
            id={icon.id}
            selectedIds={selectedIds}
            onSelectionChange={(id, selected) =>
              handleSelectionChange(icon, selected)
            }
          >
            <IconCard icon={icon} disableAction />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default IconsSelectionModal;
