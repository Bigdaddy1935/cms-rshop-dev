"use client";

import React, { useEffect, useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { AiOutlineFontColors } from "react-icons/ai";
import { FiCheckSquare, FiCircle } from "react-icons/fi";
import { BsMenuDown, BsPalette } from "react-icons/bs";
import { ImCheckmark2 } from "react-icons/im";

import {
  useCreateAttribute,
  useUpdateAttribute,
} from "@/core/hooks/api/attributes/useAttribute";
import { useAttributesByGroupGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import { handleMutation } from "@/core/utils/mutationHelper";

import { useForm } from "@/core/hooks/common/form/useForm";
import { attributeValidation } from "./attribute-validate";

import TextInput from "@/components/ui/inputs/TextInput";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import SlugInput from "@/components/forms/Inputs/SlugInput";

import { Attribute, AttributeTypes } from "../attribute.types";
import { useAttributeContext } from "../../context/AttributeContext";

type Props = {
  type?: "add" | "edit";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialForm = {
  id: null,
  name: "",
  slug: "",
  group_id: null as any,
  type: "text",
  is_variant: false,
  is_public: false,
  display_order: null,
};

const AddNewAttributeModal: React.FC<Props> = ({
  type = "add",
  isOpen,
  onOpenChange,
}) => {
  const isEdit = type === "edit";
  const { attrs, selectedAttrEdit, selecteds } = useAttributeContext();
  //

  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialForm,
    {
      onValidate: attributeValidation,
      runValidationOnChange: true,
    },
  );

  useEffect(() => {
    if (selecteds.attrGroupId) {
      handleFieldChange("group_id", selecteds.attrGroupId);
    }
  }, [selecteds.attrGroupId, form.group_id]);

  const defaultDatas = attrs.attr?.length
    ? (attrs.attr?.find((a) => a.id === selectedAttrEdit) as Attribute)
    : undefined;

  const { data: getAllAttributeGroup } = useAttributesByGroupGroup();

  const { mutateAsync: createAttribute, isPending: isPendingCreate } =
    useCreateAttribute(form.group_id ?? 0);

  const { mutateAsync: updateAttribute, isPending: isPendingUpdate } =
    useUpdateAttribute();

  const optionsAttrGroup: SelectOption[] = useMemo(() => {
    return (
      getAllAttributeGroup?.data?.map((item: any) => ({
        key: String(item.id),
        title: item.name,
      })) ?? []
    );
  }, [getAllAttributeGroup?.data]);

  useEffect(() => {
    setFormHandler();
  }, [defaultDatas, isEdit]);

  const attributeTypes: {
    key: AttributeTypes;
    title: string;
    icon: React.ReactNode;
  }[] = [
    { key: "text", title: "متنی", icon: <AiOutlineFontColors /> },
    { key: "color", title: "انتخاب رنگ", icon: <BsPalette /> },
    { key: "checkBox", title: "چک‌باکس", icon: <FiCheckSquare /> },
    { key: "radioButton", title: "گزینه‌ای", icon: <FiCircle /> },
    { key: "select", title: "منوی کشویی", icon: <BsMenuDown /> },
    { key: "boolean", title: "بله / خیر", icon: <ImCheckmark2 /> },
  ];

  const handleConfirm = submit(async () => {
    if (isEdit) {
      return handleMutation(
        () => updateAttribute({ data: form as any, id: form.id ?? -1 }),
        { resetForm },
      );
    }

    return handleMutation(() => createAttribute(form), { resetForm });
  });

  const setFormHandler = () => {
    if (defaultDatas && isEdit) {
      setForm(defaultDatas as any);
    }
  };

  const resetForm = () => reset();

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        !isEdit
          ? {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
          : undefined
      }
      trigger={
        isEdit ? (
          <ActionButton icon={<TbEdit size={20} />} stopPropagation={false} />
        ) : undefined
      }
      title={isEdit ? "ویرایش ویژگی" : "افزودن ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onConfirm={handleConfirm}
      onCancel={() => {
        !isEdit ? resetForm() : setFormHandler();
      }}
      isConfirmDisabled={isPendingCreate || isPendingUpdate}
      icon={<AiOutlineFontColors />}
      size="lg"
    >
      <div className="flex flex-col gap-6 px-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            isRequired
            label="عنوان ویژگی"
            placeholder="عنوان ویژگی را وارد کنید..."
            value={form.name}
            onChange={(val) => handleFieldChange("name", val)}
            errorMessage={errors.name}
            allowEnglishOnly={false}
          />

          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={!!errors.slug}
            errorMessage={errors.slug}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectBox
            isRequired
            label="گروه ویژگی"
            placeholder="گروه ویژگی را انتخاب کنید..."
            options={
              optionsAttrGroup.length
                ? optionsAttrGroup
                : [{ key: "-1", title: "آیتمی موجود نیست" }]
            }
            value={
              selecteds.attrGroupId
                ? String(selecteds.attrGroupId)
                : form.group_id
                  ? String(form.group_id)
                  : ""
            }
            onChange={(key) => handleFieldChange("group_id", Number(key))}
            errorMessage={errors.group_id}
          />
          <SelectBox
            isRequired
            label="نوع ویژگی"
            placeholder="نوع ویژگی را انتخاب کنید..."
            options={attributeTypes.map((t) => ({
              key: t.key,
              title: t.title,
              startContent: t.icon,
            }))}
            value={form.type}
            onChange={(key) => handleFieldChange("type", key as AttributeTypes)}
            errorMessage={errors.type}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToggleSection
            title="ویژگی متغیر"
            initialMode={form.is_variant}
            onChange={(val) => handleFieldChange("is_variant", val)}
          />

          <ToggleSection
            title="نمایش سراسری"
            initialMode={form.is_public}
            onChange={(val) => handleFieldChange("is_public", val)}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNewAttributeModal;
