"use client";

import { useState } from "react";
import PopoverSelect, {
  PopoverSelectItem,
} from "@/components/ui/PopoverSelect";
import { useUpdateHomePageLayout } from "@/core/hooks/api/useSeting";

const layoutOptions: PopoverSelectItem[] = [
  { key: "side_by_side", title: "چیدمان کنار هم" },
  { key: "stacked", title: "چیدمان روی هم" },
];

type LayoutKey = "side_by_side" | "stacked";

const HomePageLayout = ({ initialLayout }: { initialLayout: LayoutKey }) => {
  const updateLayout = useUpdateHomePageLayout();

  const initial =
    layoutOptions.find((l) => l.key === initialLayout) ?? layoutOptions[0];

  const [selectedLayout, setSelectedLayout] =
    useState<PopoverSelectItem>(initial);

  return (
    <PopoverSelect
      items={layoutOptions}
      initialKey={selectedLayout.key}
      isLoading={updateLayout.isPending}
      onSelect={(key) => {
        const next = layoutOptions.find((l) => l.key === key);
        if (!next) return;

        setSelectedLayout(next);

        updateLayout.mutate(
          { type: next.key as LayoutKey },
          {
            onError: () => setSelectedLayout(selectedLayout),
          }
        );
      }}
      buttonClassName="capitalize w-full xs:w-fit text-sm absolute top-4 right-4 right-4 !top-4 bg-white"
      popoverClassName="w-[240px]"
    />
  );
};

export default HomePageLayout;
