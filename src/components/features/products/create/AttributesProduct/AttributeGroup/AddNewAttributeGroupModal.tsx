"use client";

import React, { useEffect, useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { TbEdit } from "react-icons/tb";
import { ImMakeGroup } from "react-icons/im";
import {
  useCreateAttributeGroup,
  useUpdateAttributeGroup,
} from "@/core/hooks/api/attributes/useAttributeGroup";
import { handleMutation } from "@/core/utils/mutationHelper";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import SlugInput from "@/components/forms/Inputs/SlugInput";

import { AttributeGroup, CreateAttributeGroup } from "../attribute.types";
import { attributeGroupValidation } from "./attribute-group-validate";
import { useAttributeContext } from "../../context/AttributeContext";

type Props = {
  type?: "add" | "edit";
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialForm: CreateAttributeGroup = {
  name: "",
  slug: "",
  display_order: null,
};

const AddNewAttributeGroupModal: React.FC<Props> = ({
  type = "add",
  isOpen,
  onOpenChange,
}) => {
  const isEdit = type === "edit";
  const { attrs, selectedAttrEdit } = useAttributeContext();
  //
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialForm,
    {
      onValidate: attributeGroupValidation,
      runValidationOnChange: true,
    },
  );

  const defaultDatas = attrs.attrGroup?.length
    ? (attrs.attrGroup?.find(
        (g: any) => g.id === selectedAttrEdit,
      ) as AttributeGroup)
    : undefined;

  const { mutateAsync: createAttributeGroup, isPending: isPendingCreate } =
    useCreateAttributeGroup();
  const { mutateAsync: updateAttributeGroup, isPending: isPendingUpdate } =
    useUpdateAttributeGroup(defaultDatas?.id ?? -1);

  useEffect(() => {
    setFormHandler();
  }, [defaultDatas, isEdit]);

  const handleConfirm = submit(async () => {
    if (isEdit) {
      const { id, ...payload } = form as AttributeGroup;
      return handleMutation(() => updateAttributeGroup(payload), { resetForm });
    }

    return handleMutation(() => createAttributeGroup(form), { resetForm });
  });

  const setFormHandler = () => {
    if (defaultDatas && isEdit) {
      setForm(defaultDatas);
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
      title={isEdit ? "ویرایش گروه ویژگی" : "افزودن گروه ویژگی جدید"}
      confirmText="ثبت تغییرات"
      onConfirm={handleConfirm}
      onCancel={() => {
         !isEdit ? resetForm() : setFormHandler();
      }}
      isConfirmDisabled={isPendingCreate || isPendingUpdate}
      size="md"
      icon={<ImMakeGroup />}
    >
      <div className="flex flex-col gap-4 px-2">
        <TextInput
          isRequired
          label="عنوان گروه"
          placeholder="عنوان گروه ویژگی را وارد کنید..."
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
    </BaseModal>
  );
};

export default AddNewAttributeGroupModal;
