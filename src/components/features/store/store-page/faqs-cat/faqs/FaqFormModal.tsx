"use client";

import React, { useEffect, useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import { handleMutation } from "@/core/utils/mutationHelper";
import TextInput from "@/components/ui/inputs/TextInput";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { faqFormValidation } from "./faq-form-validate";
import { LuMessageCircleQuestion } from "react-icons/lu";
import { useCreateFaq, useUpdateFaq } from "@/core/hooks/api/faq/useFaq";
import Textarea from "@/components/ui/inputs/Textarea";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import { useGetFaqCategories } from "@/core/hooks/api/faq/useFaqCat";

type Props = {
  faqId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialFaqForm = {
  question: "",
  answer: "",
  faq_category_id: null as number | null,
  is_active: true,
};

const FaqFormModal: React.FC<Props> = ({
  faqId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialFaqForm,
    {
      onValidate: faqFormValidation,
      runValidationOnChange: true,
    },
  );

  const { data: faqsCat } = useGetFaqCategories();
  const { mutateAsync: updateFaq } = useUpdateFaq();
  const { mutateAsync: createFaq } = useCreateFaq();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const { is_active, faq_category_id, answer, question } = form;

    const data = {
      answer,
      question,
      is_active,
      faq_category_id,
    };

    if (faqId)
      return handleMutation(() => updateFaq({ id: faqId, data }), {
        resetForm,
      });
    else
      return handleMutation(() => createFaq(data as any), {
        resetForm,
      });
  });

  const resetForm = () => reset();

  const setFormHandler = () => {
    if (defaultValues) {
      setForm(defaultValues);
    }
  };

  const optionsFaqCats: SelectOption[] = useMemo(() => {
    return (
      faqsCat?.data?.map((item: any) => ({
        key: String(item.id),
        title: item.name,
      })) ?? []
    );
  }, [faqsCat?.data]);

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        faqId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !faqId ? resetForm() : setFormHandler();
      }}
      title={faqId ? "ویرایش سوال" : "افزودن سوال"}
      confirmText={faqId ? "ویرایش سوال" : "ایجاد سوال"}
      onConfirm={handleSubmit}
      icon={<LuMessageCircleQuestion />}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          label="عنوان"
          placeholder="عنوان سوال را وارد کنید"
          value={form.question}
          onChange={(question) => {
            handleFieldChange("question", question);
          }}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.question}
          allowSpecialChars
        />

        <SelectBox
          label="دسته بندی سوال"
          value={form.faq_category_id}
          onChange={(val) => handleFieldChange("faq_category_id", val)}
          options={optionsFaqCats.map((opt) => ({
            key: opt.key,
            title: opt.title,
          }))}
          placeholder="دسته بندی سوال را وارد کنید"
          errorMessage={errors.faq_category_id}
        />

        <Textarea
          label="جواب سوال"
          isRequired
          value={form.answer}
          onChange={(val) => handleFieldChange("answer", val)}
          placeholder="جواب سوال را وارد کنید"
          errorMessage={errors.answer}
        />

        <ToggleSection
          title={`وضعیت ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default FaqFormModal;
