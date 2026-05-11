"use client";

import TextEditor from "@/components/forms/TextEditor";
import BaseCard from "@/components/ui/BaseCard";
import { useForm } from "@/core/hooks/common/form/useForm";
import { useEffect } from "react";
import { storeFormValidation } from "./store-form-validate";
import TextInput from "@/components/ui/inputs/TextInput";
import Textarea from "@/components/ui/inputs/Textarea";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import FormActionButtons from "@/components/common/FormActionButtons";
import { storePageConfig } from "./storePageConfig";
import { TbWorldSearch } from "react-icons/tb";
import { StorePage } from "./store-pages-type";
import { useUpdateStoreInfo } from "@/core/hooks/api/useStoreInfo";
import { useRouter } from "next/navigation";

type StorePageFormProps = {
  initialData: any;
  type: "";
  isLoading: boolean;
};

const initialStoreForm = {
  type: "",
  title: "",
  content: "",
  meta_title: "",
  meta_description: "",
  is_active: true,
};

const StorePageForm: React.FC<StorePageFormProps> = ({
  initialData,
  type,
  isLoading,
}) => {
  const router = useRouter();
  const updateStoreInfo = useUpdateStoreInfo(type);

  const { form, errors, handleFieldChange, setForm, submit } = useForm(
    initialStoreForm,
    {
      onValidate: storeFormValidation,
      runValidationOnChange: true,
    },
  );

  useEffect(() => {
    initialData && setForm(initialData);
  }, [initialData]);

  const handleSubmit = submit(async (changed) => {
    if (!type) return;

    const { title, content, meta_title, meta_description, is_active } = form;

    const res = await updateStoreInfo.mutateAsync({
      title,
      content,
      meta_title,
      meta_description,
      is_active,
      type,
    });
    if (res.ok) {
      router.push("/admin/store/store-pages");
    }
  });

  const { title, icon: Icon } = storePageConfig[type as StorePage] || {
    title: "صفحه فروشگاه",
    icon: TbWorldSearch,
  };

  return (
    <BaseCard
      CardHeaderProps={{
        title,
        icon: <Icon />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="عنوان"
          placeholder="عنوان را وارد کنید"
          value={form.title}
          onChange={(title) => {
            handleFieldChange("title", title);
          }}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.name}
        />
        <TextInput
          label="عنوان متا برای SEO"
          placeholder="عنوان متا را وارد کنید"
          value={form.meta_title}
          onChange={(meta_title) => {
            handleFieldChange("meta_title", meta_title);
          }}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.meta_title}
          allowSpecialChars
        />
      </div>
      <Textarea
        label="توضیحات متا برای SEO"
        value={form.meta_description}
        onChange={(val) => handleFieldChange("meta_description", val)}
        placeholder="توضیحات متا را وارد کنید"
        isRequired
        errorMessage={errors.description}
      />
      <TextEditor
        value={form.content ?? ""}
        onChange={(content) => handleFieldChange("content", content)}
        label="توضیحات"
        errorMessage={errors.content}
      />
      <ToggleSection
        title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
        initialMode={form.is_active}
        onChange={(val) => handleFieldChange("is_active", val)}
      />

      <FormActionButtons
        cancelHref="/admin/store/store-pages"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </BaseCard>
  );
};

export default StorePageForm;
