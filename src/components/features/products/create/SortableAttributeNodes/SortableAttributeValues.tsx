"use client";

import React, { useState, useEffect } from "react";
import { Attribute } from "../AttributesProduct/attribute.types";
import { useUpdateAttributeOrderValue } from "@/core/hooks/api/attributes/useAttributeValue";
import { handleDropHelper } from "../../../../../core/utils/handleDropHelper";
import {
  useDeleteAttributeNode,
  useDeleteAttributeNodeSimple,
} from "@/core/hooks/api/attributes/useVariantProduct";
import { useSearchParams } from "next/navigation";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

type Props = {
  attribute: any /* Attribute */;
};

const SortableAttributeValues: React.FC<Props> = ({ attribute }) => {
  const [items, setItems] = useState(attribute.values);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderValue = useUpdateAttributeOrderValue();
  const deleteAttributeNode = useDeleteAttributeNode();
  const deleteAttributeNodeSimple = useDeleteAttributeNodeSimple();
  const searchParams = useSearchParams();

  useEffect(() => {
    setItems(attribute.values);
  }, [attribute]);

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
        return reorderValue.mutateAsync(finalPayLoad);
      },
      setItems,
      setDraggingId,
    );
  };

  const handleDeleteNode = (id: number) => {
    const tab = searchParams.get("tab");
    if (!tab) {
      toast.error("تب فعالی جهت پاک کردن این فرزند وجود ندارد");
      return;
    }

    //if (tab === "sort-variants") handleDeleteAttributeNode(id);
    if (tab === "sort-variants") toast.error("قابلیت حذف ندارد. فقط میتوانید موجودی آن را در صورت نیاز صفر کنید");
    else if (tab === "sort-attributes") handleDeleteAttributeNodeSimple(id);
    else toast.error("تب فعالی جهت پاک کردن این فرزند وجود ندارد");
  };

/*   const handleDeleteAttributeNode = (valId: number) => {
    const productId = searchParams.get("edit_id");
    if (!productId) return;
    deleteAttributeNode.mutate({
      attributeId: attribute.id,
      productId: +productId,
      valueId: valId,
    });
  }; */

  const handleDeleteAttributeNodeSimple = (valId: number) => {
    const productId = searchParams.get("edit_id");
    if (!productId) return;
    deleteAttributeNodeSimple.mutate({
      attributeId: attribute.id,
      productId: +productId,
      valueId: valId,
    });
  };

  return (
    <div className="gap-3 sm:gap-4 mx-4 mt-6">
      {items
        .slice()
        .sort(
          (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0),
        )
        .map((val: any) => (
          <div
            key={val.id}
            draggable
            onDragStart={() => handleDragStart(val.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(val.id)}
            className={`shadow flex justify-between py-2 px-2 sm:px-4 border rounded-xl my-3 cursor-grab hover:bg-slate-50 transition-all`}
            style={{
              borderTop: `1px solid ${val.display_color || "lightgray"}`,
              color: `${val.display_color || "gray"}`,
            }}
          >
            <div className="flex items-center justify-center gap-2 rounded-xl">
              {val.display_color && (
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{
                    backgroundColor: val.display_color,
                  }}
                />
              )}
              <p className="sm:text-[16px]">{val.value}</p>
            </div>
            <div>
              <TiDeleteOutline
                className="cursor-pointer text-3xl bg-red-50 rounded-xl transition-all hover:scale-110 p-1 text-red-500"
                onClick={() => handleDeleteNode(val.id)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default SortableAttributeValues;
