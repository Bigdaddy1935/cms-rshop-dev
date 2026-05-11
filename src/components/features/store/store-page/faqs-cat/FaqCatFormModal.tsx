"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import { handleMutation } from "@/core/utils/mutationHelper";
import { faqcatFormValidation } from "./faqcat-form-validate";
import TextInput from "@/components/ui/inputs/TextInput";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import {
  useCreateFaqCategory,
  useUpdateFaqCategory,
} from "@/core/hooks/api/faq/useFaqCat";
import { TbFolderQuestion } from "react-icons/tb";
import SelectableIconsBox from "../../icons/SelectableIconBox/SelectableIconsBox";
import { useIconsSelection } from "../../icons/SelectableIconBox/IconsSelectionContext";

type Props = {
  faqcatId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialCategoryForm = {
  name: "",
  icon_id: null as number | null,
  is_active: true,
};

const FaqCatFormModal: React.FC<Props> = ({
  faqcatId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { removeIcon } = useIconsSelection();
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialCategoryForm,
    {
      onValidate: faqcatFormValidation,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: updateCategory } = useUpdateFaqCategory();
  const { mutateAsync: createCategory } = useCreateFaqCategory();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { name, icon_id, is_active } = form;

    const data = {
      name,
      icon_id,
      is_active,
    };

    if (faqcatId)
      return handleMutation(() => updateCategory({ id: faqcatId, data }), {
        resetForm,
      });
    else
      return handleMutation(() => createCategory(data as any), {
        resetForm,
      });
  });

  const resetForm = () => {
    removeIcon(form.icon_id!);
    reset()
  };

  const setFormHandler = () => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        faqcatId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !faqcatId ? resetForm() : setFormHandler();
      }}
      title={faqcatId ? "ویرایش دسته بندی" : "افزودن دسته بندی"}
      confirmText={faqcatId ? "ویرایش دسته بندی" : "ایجاد دسته بندی"}
      onConfirm={handleSubmit}
      icon={<TbFolderQuestion />}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          label="نام"
          placeholder="نام دسته بندی را وارد کنید"
          value={form.name}
          onChange={(name) => {
            handleFieldChange("name", name);
          }}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.name}
        />

        <ToggleSection
          title={`وضعیت ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        <SelectableIconsBox
          onChange={(ids) => handleFieldChange("icon_id", ids[0] || null)}
          classNameIconsWrapper="grid-cols-1 xs:!grid-cols-2 md:!grid-cols-3"
          error={!!errors.icon_id}
        />
      </div>
    </BaseModal>
  );
};

export default FaqCatFormModal;
