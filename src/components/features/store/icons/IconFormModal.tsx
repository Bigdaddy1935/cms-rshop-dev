"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import { TbIcons } from "react-icons/tb";
import { useForm } from "@/core/hooks/common/form/useForm";
import { IconFormvalidation } from "./icon-form-validate";
import Textarea from "@/components/ui/inputs/Textarea";
import { handleMutation } from "@/core/utils/mutationHelper";
import { useCreateIcon, useUpdateIcon } from "@/core/hooks/api/useIcon";

type Props = {
  iconId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialIconForm = {
  name: "",
  svg: "",
};

const IconFormModal: React.FC<Props> = ({
  iconId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialIconForm,
    {
      onValidate: IconFormvalidation,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: updateIcon } = useUpdateIcon();
  const { mutateAsync: createIcon } = useCreateIcon();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { name, svg } = form;
    if (iconId)
      return handleMutation(() => updateIcon({id: iconId, data: { name, svg }}), {
        resetForm,
      });
    else return handleMutation(() => createIcon({name, svg} as any), { resetForm });
  });

  const resetForm = () => reset();

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
        iconId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !iconId ? resetForm() : setFormHandler();
      }}
      title={iconId ? "ویرایش آیکون" : "افزودن آیکون جدید"}
      confirmText={iconId ? "ویرایش آیکون" : "ایجاد آیکون"}
      onConfirm={handleSubmit}
      icon={<TbIcons />}
    >
      <div className="flex flex-col gap-6">
        <SlugInput
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          isActiveError={true}
          isRequired
          errorMessage={errors.name}
          label="نام آیکون (انگلیسی)"
        />
        <Textarea
          label="SVG آیکون"
          placeholder="svg خود را در این جا جای گذاری کنید"
          value={form.svg}
          onChange={(val) => handleFieldChange("svg", val)}
          isRequired
          minRows={5}
          errorMessage={errors.svg}
        />
      </div>
    </BaseModal>
  );
};

export default IconFormModal;
