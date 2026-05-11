"use client";

import React, { useEffect, useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { FiCheckSquare } from "react-icons/fi";
import {
  useCreateAttributeValue,
  useUpdateAttributeValue,
} from "@/core/hooks/api/attributes/useAttributeValue";
import { handleMutation } from "@/core/utils/mutationHelper";
import { useAttributesByGroupGroup } from "@/core/hooks/api/attributes/useAttributeGroup";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import ColorPickerField from "@/components/shared/ColorPickerField";
import { useAttributesByGroup } from "@/core/hooks/api/attributes/useAttribute";
import { useForm } from "@/core/hooks/common/form/useForm";
import { attributeValueValidation } from "./attribute-value-validate";
import TextInput from "@/components/ui/inputs/TextInput";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import { useAttributeContext } from "../../context/AttributeContext";

type Props = {
  type?: "add" | "edit";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialForm = {
  value: "",
  attribute_id: null as number | null,
  group_id: null as number | null,
  display_color: null as string | null,
  is_active: true,
  is_active_color_picker: false,
};

const AddNewAttributeValueModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  type = "add",
}) => {
  const isEdit = type === "edit";
  const { attrs, selectedAttrEdit, selecteds } = useAttributeContext();
  //
  const {
    form,
    errors,
    handleFieldChange,
    handleMultipleFieldsChange,
    setForm,
    reset,
    submit,
  } = useForm(initialForm, {
    onValidate: attributeValueValidation,
    runValidationOnChange: true,
  });

  const { data: getAllAttributeGroup } = useAttributesByGroupGroup();
  const { data: getAllAttribute } = useAttributesByGroup(form.group_id || 0);

  const { mutateAsync: createAttributeValue, isPending: isPendingCreate } =
    useCreateAttributeValue();
  const { mutateAsync: updateAttributeValue, isPending: isPendingUpdate } =
    useUpdateAttributeValue();

  useEffect(() => {
    if (selecteds.attrGroupId) {
      handleFieldChange("group_id", selecteds.attrGroupId);
    }
    if (selecteds.attrId) {
      handleFieldChange("attribute_id", selecteds.attrId);
    }
  }, [
    selecteds.attrGroupId,
    selecteds.attrId,
    form.attribute_id,
    form.group_id,
  ]);

  const defaultDatas = attrs.values?.length
    ? (attrs.values?.find((v) => v.id === selectedAttrEdit) as any)
    : undefined;

  const optionsAttrGroup: SelectOption[] = useMemo(() => {
    return (
      getAllAttributeGroup?.data?.map((attrGroup: any) => ({
        key: String(attrGroup.id),
        title: attrGroup.name,
      })) ?? []
    );
  }, [getAllAttributeGroup?.data]);

  const optionsAttr: SelectOption[] = useMemo(() => {
    return (
      getAllAttribute?.data?.map((attr: any) => ({
        key: String(attr.id),
        title: attr.name,
      })) ?? []
    );
  }, [getAllAttribute?.data]);

  // sync edit mode
  useEffect(() => {
    setFormHandler();
  }, [defaultDatas, isEdit]);

  // sync color picker
  useEffect(() => {
    handleFieldChange(
      "display_color",
      form.is_active_color_picker
        ? (defaultDatas?.display_color ?? "#000000")
        : null,
    );
  }, [form.is_active_color_picker, defaultDatas]);

  const handleConfirm = submit(async () => {
    const { attribute_id, display_color, is_active, value } = form;

    const payload = {
      attribute_id,
      display_color,
      is_active,
      value,
    };

    if (isEdit) {
      return handleMutation(
        () => updateAttributeValue({ data: payload, id: defaultDatas?.id }),
        { resetForm },
      );
    }

    return handleMutation(() => createAttributeValue(payload), { resetForm });
  });

  const setFormHandler = () => {
    if (defaultDatas && isEdit) {
      setForm({
        ...defaultDatas,
        group_id: selecteds.attrGroupId ?? null,
        attribute_id: selecteds.attrId ?? null,
        is_active_color_picker: !!defaultDatas.display_color,
      });
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
      title={isEdit ? "ویرایش مقدار ویژگی" : "افزودن مقدار ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onCancel={() => {
        !isEdit ? resetForm() : setFormHandler();
      }}
      onConfirm={handleConfirm}
      isConfirmDisabled={isPendingCreate || isPendingUpdate}
      icon={<FiCheckSquare />}
      size="md"
    >
      <div className="flex flex-col gap-5 px-2">
        {/* گروه ویژگی */}
        <SelectBox
          isRequired
          label="گروه ویژگی"
          placeholder="گروه ویژگی را انتخاب کنید..."
          onChange={(key) =>
            handleMultipleFieldsChange({
              group_id: +key,
              attribute_id: null,
            })
          }
          options={
            optionsAttrGroup.length
              ? optionsAttrGroup
              : [{ key: "-1", title: "آیتمی موجود نیست" }]
          }
          value={form.group_id ? String(form.group_id) : ""}
          errorMessage={errors.group_id}
        />

        {/* ویژگی */}
        {form.group_id ? (
          <SelectBox
            isRequired
            label="ویژگی"
            placeholder="ویژگی را انتخاب کنید..."
            onChange={(key) => handleFieldChange("attribute_id", +key)}
            options={
              optionsAttr.length
                ? optionsAttr
                : [{ key: "-1", title: "آیتمی موجود نیست" }]
            }
            value={form.attribute_id ? String(form.attribute_id) : ""}
            errorMessage={errors.attribute_id}
          />
        ) : (
          ""
        )}

        {/* عنوان مقدار */}
        <TextInput
          label="عنوان مقدار"
          placeholder="عنوان مقدار را وارد کنید..."
          value={form.value}
          onChange={(val) => handleFieldChange("value", val)}
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.value}
        />

        <div className="flex items-center gap-2">
          <ToggleSection
            title="انتخاب رنگ"
            initialMode={form.is_active_color_picker}
            onChange={(val) => handleFieldChange("is_active_color_picker", val)}
          />

          {form.is_active_color_picker && (
            <ColorPickerField
              value={form.display_color || "#000000"}
              onChange={(color) => handleFieldChange("display_color", color)}
              widthFull
              label=""
            />
          )}
        </div>

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default AddNewAttributeValueModal;
