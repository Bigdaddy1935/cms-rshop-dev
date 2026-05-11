"use client";

import React, { useState, useEffect } from "react";
import { Attribute } from "../AttributesProduct/attribute.types";
import SortableAttributeValues from "./SortableAttributeValues";
import { useUpdateAttributeOrder } from "@/core/hooks/api/attributes/useAttribute";
import { handleDropHelper } from "../../../../../core/utils/handleDropHelper";
import { Button, Tooltip } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useImportantAttributeProduct } from "@/core/hooks/api/attributes/useAttributeProducts";

type Props = {
  attributes: any /* Attribute[] */;
};

const SortableAttributes: React.FC<Props> = ({ attributes }) => {
  const [items, setItems] = useState(attributes);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const reorderAttribute = useUpdateAttributeOrder();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<
    "sort-variants" | "sort-attributes"
  >("sort-variants");
  //? Hooks
  const { mutate: importantAttributeProduct } = useImportantAttributeProduct();

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "sort-variants") setActiveTab("sort-variants");
    else if (tab === "sort-attributes") setActiveTab("sort-attributes");
  }, [searchParams]);

  useEffect(() => {
    setItems(attributes);
  }, [attributes]);

  const handleDragStart = (id: number) => setDraggingId(id);

  const handleDrop = async (overId: number) => {
    handleDropHelper(
      items,
      draggingId,
      overId,
      (payload) => {
        const productId = searchParams.get("edit_id");
        const finalPayLoad = {...payload, product_id: productId ? +productId : -1 }
        return reorderAttribute.mutateAsync(finalPayLoad);
      },
      setItems,
      setDraggingId
    );
  };

  const handleImportantAttributeProduct = (status: boolean, attrId: number) => {
    const productId = searchParams.get("edit_id");

    if (!productId) {
      toast.error("محصولی انتخاب نشده در تب");
      return;
    }
    importantAttributeProduct({
      product_id: +productId,
      attribute_id: +attrId,
      important: status,
    });
  };

  return (
    <div className="mx-4 mt-6">
      {items
        .slice()
        .sort(
          (a: any, b: any) => (a.display_order ?? 0) - (b.display_order ?? 0)
        )
        .map((attr: any) => (
          <div
            key={attr.id}
            draggable
            onDragStart={() => handleDragStart(attr.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(attr.id)}
            className={`shadow-md rounded-2xl mb-3 cursor-grab border-2 border-orange-100 hover:border-orange-300 transition-all`}
          >
            {activeTab === "sort-variants" ? (
              <p className="text-medium sm:text-lg text-orange-500 py-2 px-4 bg-orange-50 rounded-xl">
                {attr.name} <small className="text-black">({attr.type})</small>
              </p>
            ) : (
              <div className="text-orange-500 py-2 px-2 sm:px-4 bg-orange-50 rounded-xl flex items-center justify-between">
                <p className="text-medium sm:text-lg">
                  {attr.name}{" "}
                  <small className="text-black">({attr.type})</small>
                </p>
                <Button
                  size="sm"
                  variant="flat"
                  color={attr.is_important ? "success" : "default"}
                  className="rounded-xl"
                  onPress={() =>
                    handleImportantAttributeProduct(
                      attr.is_important ? false : true,
                      attr.id
                    )
                  }
                >
                  <Tooltip
                    content="ویژگی در کنار اسلایدر عکس محصولات قرار میگیرد"
                    showArrow
                    offset={12}
                    closeDelay={2000}
                    placement="top"
                  >
                    <span>ویژگی منتخب</span>
                  </Tooltip>
                </Button>
              </div>
            )}

            <SortableAttributeValues attribute={attr} />
          </div>
        ))}
    </div>
  );
};

export default SortableAttributes;
