"use client";

import { useAttributesByGroup } from "@/core/hooks/api/attributes/useAttribute";
import { useGetAttributeValues } from "@/core/hooks/api/attributes/useAttributeValue";
import { useAttributesByGroupGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import { useEffect } from "react";
import AddNewAttrGroup from "./AttributeGroup/AddNewAttrGroup";
import AddNewAttribute from "./Attribute/AddNewAttribute";
import AddNewAttributeValue from "./AttributeValue/AddNewAttributeValue";
import { useAddNewVariantProduct } from "@/core/hooks/api/attributes/useVariantProduct";
import { useSearchParams } from "next/navigation";
import { useCreateAttributeProduct } from "@/core/hooks/api/attributes/useAttributeProducts";
import FormActionButtons from "@/components/common/FormActionButtons";
import toast from "react-hot-toast";
import { useAttributeContext } from "../context/AttributeContext";

type Props = {
  isDisabledEdit?: boolean;
  isActiveHeader?: boolean;
  onOpenChange?: (open: boolean) => void;
  product_id?: number;
};

const generateSKU = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `sku-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};

export const AttributesContent = ({
  isDisabledEdit = true,
  isActiveHeader = true,
  onOpenChange,
  product_id,
}: Props) => {
  const sp = useSearchParams();
  const editId = product_id || sp.get("edit_id");
  const page = editId && !isNaN(+editId) ? +editId : 1;

  //
  const { selecteds, setSelecteds, setAttrs } = useAttributeContext();
  const addNewVariantProductMutation = useAddNewVariantProduct();
  const addNewSimapleAttribute = useCreateAttributeProduct();
  //
  const { data: attributeGroup } = useAttributesByGroupGroup();
  const { data: attributes } = useAttributesByGroup(selecteds.attrGroupId);
  const { data: attributeValues } = useGetAttributeValues(selecteds.attrId);

  useEffect(() => {
    setAttrs((prev) => ({ ...prev, attrGroup: attributeGroup?.data }));
  }, [attributeGroup]);

  useEffect(() => {
    setAttrs((prev) => ({ ...prev, attr: attributes?.data }));
  }, [attributes]);

  useEffect(() => {
    setAttrs((prev) => ({ ...prev, values: attributeValues?.data }));
  }, [attributeValues]);

  const isSubmitting =
    addNewVariantProductMutation.isPending || addNewSimapleAttribute.isPending;

  const resetInfos = () => {
    setSelecteds({
      attrGroupId: undefined,
      attrId: undefined,
      valueIds: [],
    });
  };

  const resetAndClose = () => {
    resetInfos();
    onOpenChange?.(false);
  };

  const handleSubmit = async () => {
    const { attrId, attrGroupId, valueIds } = selecteds;

    if (
      !attrGroupId ||
      !attrId ||
      valueIds.length === 0 ||
      !attributes?.data?.length
    ) {
      toast.error("لطفاً گروه، ویژگی و مقدار را انتخاب کنید");
      return;
    }

    const attrIsVariant = attributes.data.find(
      (a: any) => a.id === attrId,
    )?.is_variant;

    if (attrIsVariant) {
      const newAttr = {
        product_id: page,
        sku: generateSKU(),
        price: 10000,
        discount_amount: 0,
        discount_percent: 0,
        stock: 0,
        attributes: [{ attribute_id: attrId, value_ids: valueIds }],
      };

      addNewVariantProductMutation.mutate(newAttr, {
        onSuccess: resetAndClose,
      });
    } else {
      const newAttrSimple = {
        product_id: page,
        attributeId: attrId,
        valueIds: valueIds,
      };

      addNewSimapleAttribute.mutate(newAttrSimple, {
        onSuccess: resetAndClose,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <AddNewAttrGroup isDisabledEdit={isDisabledEdit} />

      <AddNewAttribute isDisabledEdit={isDisabledEdit} />

      <AddNewAttributeValue isDisabledEdit={isDisabledEdit} />

      {isActiveHeader ? (
        <FormActionButtons
          onCancel={resetAndClose}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : null}
    </div>
  );
};
