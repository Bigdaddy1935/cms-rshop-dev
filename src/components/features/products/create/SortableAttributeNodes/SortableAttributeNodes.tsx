"use client";

import React, { useState, useEffect } from "react";
import { AttributeGroup } from "../AttributesProduct/attribute.types";
import SortableAttributes from "./SortableAttributes";
import { useUpdateAttributeOrderGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import { handleDropHelper } from "@/core/utils/handleDropHelper";
import { useSearchParams } from "next/navigation";

type Props = {
  attributeNodes: AttributeGroup[];
};

const SortableAttributeNodes: React.FC<Props> = ({ attributeNodes }) => {
  const [items, setItems] = useState(attributeNodes);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderGroup = useUpdateAttributeOrderGroup();
  const searchParams = useSearchParams();

  useEffect(() => {
    setItems(attributeNodes);
  }, [attributeNodes]);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => {
        const productId = searchParams.get("edit_id");
        const finalPayLoad = {
          ...payload,
          product_id: productId ? +productId : -1,
        };
        return reorderGroup.mutateAsync(finalPayLoad);
      },
      setItems,
      setDraggingId,
    );
  };

  return (
    <div className="-mt-6">
      {items
        .slice()
        .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
        .map((group) => (
          <div
            key={group.id ?? 0}
            draggable
            onDragStart={() => handleDragStart(group.id ?? 1)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(group.id ?? 1)}
            className={`bg-white shadow-md rounded-2xl mt-6 cursor-grab border-2 border-purple-100 hover:border-purple-300 transition-all`}
          >
            <h3 className="text-medium sm:text-lg text-purple-500 py-2 px-2 sm:px-4 bg-purple-50 rounded-xl">
              {group.name} <small className="text-black">({group.slug})</small>
            </h3>
            <SortableAttributes attributes={group.attributes ?? []} />
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeNodes;
