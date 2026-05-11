"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import Textarea from "@/components/ui/inputs/Textarea";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import SelectBox, { SelectOption } from "@/components/ui/inputs/SelectBox";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import NumberInput from "@/components/ui/inputs/NumberInput";
import {
  useCreateHomeSection,
  useUpdateHomeSection,
} from "@/core/hooks/api/adminHome/useHomeSections";
import { validateSpecialSection } from "./special-section-validation";
import { handleMutation } from "@/core/utils/mutationHelper";
import ProductSelectionBox from "@/components/features/products/SelectableProduct/Product/ProductSelectionBox";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { LuPlus } from "react-icons/lu";
import { useProductsSelection } from "@/components/features/products/SelectableProduct/ProductsSelectionContext";

type Props = {
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const initialForm = {
  title: "",
  slug: "",
  description: "",
  section_type: "",
  display_style: "",
  products_limit: 10,
  show_view_all_button: false,
  view_all_link: "",
  image: "",
  start_date: "",
  end_date: "",
  file: null as File | null,
  product_ids: [] as number[],
  is_active: true,
};

const SpecialSectionModal: React.FC<Props> = ({
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { mutateAsync: createSection, isPending: isCreating } =
    useCreateHomeSection();
  const { mutateAsync: updateSection, isPending: isUpdating } =
    useUpdateHomeSection(defaultValues?.id ?? 0);
  const { mutateAsync: uploadSliderImages, isPending: isUploading } =
    useUploadSliderImages();
  //
  const { setSelectedProducts } = useProductsSelection();

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    reset,
    submit,
    handleMultipleFieldsChange,
  } = useForm(initialForm, {
    onValidate: (data: any) => validateSpecialSection(data),
    runValidationOnChange: true,
  });

  useEffect(() => {
    setFormHandler();
  }, [defaultValues, isOpen]);

  const handleSubmit = submit(async () => {
    let finalMediaId = form.file || form.image;

    if (form.file) {
      const fd = new FormData();
      fd.append("files", form.file);

      const uploadRes = (await handleMutation(() => uploadSliderImages(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalMediaId = uploadRes.data[0].url;
    }

    const {
      section_type,
      show_view_all_button,
      image,
      file,
      products,
      category,
      id,
      sort_order,
      ...other
    } = form as any;

    const payload: Record<string, any> = {
      section_type: "special_products",
      show_view_all_button: true,
      image: finalMediaId,
      ...other,
    };

    if (defaultValues?.id) {
      return handleMutation(() => updateSection(payload));
    } else {
      return handleMutation(() => createSection(payload));
    }
  });

  const displayOptions: SelectOption[] = [
    { key: "carousel", title: "اسلایدر" },
    { key: "grid", title: "شبکه ای" },
    { key: "list", title: "لیستی" },
  ];

  const resetForm = () => {
    reset();
    setSelectedProducts([]);
  };

  const setFormHandler = () => {
    if (!defaultValues) {
      setForm(initialForm);
      return;
    }

    setForm({
      ...initialForm,
      ...defaultValues
    });

    setSelectedProducts(defaultValues.products)
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      trigger={
        defaultValues?.id ? null : <ActionButton icon={<LuPlus size={18} />} />
      }
      triggerProps={null}
      onCancel={() => {
        !defaultValues?.id ? resetForm() : setFormHandler();
      }}
      title={defaultValues?.id ? "ویرایش بخش" : "افزودن بخش جدید"}
      confirmText={defaultValues?.id ? "ویرایش بخش" : "ایجاد بخش"}
      onConfirm={handleSubmit}
      size="2xl"
      icon={<TfiLayoutSliderAlt />}
      isConfirmDisabled={isCreating || isUpdating}
    >
      <div className="flex flex-col gap-6">
        <ImageBoxUploader
          title="تصویر مجموعه"
          textBtn={"+ افزودن تصویر"}
          defaultImg={form?.image}
          onFile={async (file) => handleFieldChange("file", file)}
          errorMessage={errors.image}
          changeStatusFile={form.file}
        />

        <div className="flex items-center gap-2">
          <TextInput
            label="عنوان"
            placeholder="عنوان بخش را وارد کنید"
            value={form.title}
            /*             errorMessage={errors.title}
            isRequired */
            onChange={(val) => handleFieldChange("title", val)}
            allowEnglishOnly={false}
          />
          <SelectBox
            label="نوع نمایش محصولات"
            value={form.display_style}
            onChange={(val) => handleFieldChange("display_style", val)}
            options={displayOptions}
            placeholder="انتخاب نوع نمایش"
            isRequired
            errorMessage={errors.display_style}
          />
        </div>

        <div className="flex items-center gap-2">
          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={true}
            isRequired
            errorMessage={errors.slug}
          />
          <TextInput
            label="نمایش لینک"
            value={`collections/${form.slug}`}
            allowSpecialChars
            allowedSpecialChars={["/", "-"]}
            onChange={() => {}}
            inputAlign="left"
            readOnly
            errorMessage={errors.slug}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <NumberInput
            label="تعداد محدودیت نمایش"
            placeholder="10"
            suffix="عدد"
            min={0}
            value={form.products_limit}
            onChange={(limit) => handleFieldChange("products_limit", limit)}
            isRequired
            errorMessage={errors.products_limit}
          />

          <IsoDatePicker
            label="بازه اعتبار"
            enableRange
            valueIsoRange={{ start: form.start_date, end: form.end_date }}
            onChangeIsoRange={(range) => {
              handleMultipleFieldsChange({
                start_date: range?.start ?? "",
                end_date: range?.end ?? "",
              });
            }}
            showMonthAndYearPickers
            className="w-full"
            isRequired
            errorMessage={errors.date}
          />
        </div>

        <Textarea
          label="توضیحات"
          value={form.description}
          onChange={(val) => handleFieldChange("description", val)}
          placeholder="توضیحات را وارد کنید"
          /*           isRequired
          errorMessage={errors.description} */
        />

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        <ProductSelectionBox
          onChange={(items) => {
            const productIds = items.map((item) => item.product_id);
            handleFieldChange("product_ids", productIds);
          }}
          error={!!errors.product_ids}
        />
      </div>
    </BaseModal>
  );
};

export default SpecialSectionModal;
