"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import NumberInput from "@/components/ui/inputs/NumberInput";
import {
  useCreateHomeSection,
  useUpdateHomeSection,
} from "@/core/hooks/api/adminHome/useHomeSections";
import { handleMutation } from "@/core/utils/mutationHelper";
import { staticSectionValidation } from "./static-section-validation";
import CategorySelect from "@/components/features/products/categories/CategorySelect";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { LuPlus } from "react-icons/lu";
import FlashDealSelect from "../../../promotions/flash-deal/FlashDealSelect";

type Props = {
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title: string;
  icon: React.ReactNode;
  showCategoryField?: boolean;
  sectionType: string;
};

const initialForm = {
  title: "",
  slug: "product-categories",
  description: "",
  section_type: "category_based",
  promotion_id: null,
  display_style: "carousel",
  products_limit: 10,
  show_view_all_button: true,
  view_all_link: "",
  category_id: 0,
  is_active: true,
  start_date: null as string | null,
  end_date: null as string | null,
};

const StaticSectionModal: React.FC<Props> = ({
  defaultValues,
  isOpen,
  onOpenChange,
  icon,
  title,
  showCategoryField = false,
  sectionType,
}) => {
  const { mutateAsync: createSection, isPending: isCreating } =
    useCreateHomeSection();
  const { mutateAsync: updateSection, isPending: isUpdating } =
    useUpdateHomeSection(defaultValues?.id ?? 0);

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(
    {
      ...initialForm,
      section_type: sectionType,
      slug:
        sectionType === "category_based"
          ? `product-categories-${Math.floor(Math.random() * 100) + 1}`
          : sectionType === "promotion_based"
            ? "featured-offers"
            : "most-popular",
      title:
        sectionType === "category_based"
          ? "محصولات بر اساس دسته‌بندی"
          : sectionType === "promotion_based"
            ? "پیشنهاد ویژه"
            : "محصولات پرطرفدار",
    },
    {
      onValidate: (data: any) =>
        staticSectionValidation(data, showCategoryField, sectionType),
      runValidationOnChange: true,
    },
  );

  /* 
      {
      ...initialForm,
      section_type: sectionType,
      slug:
        sectionType === "category_based"
          ? `product-categories-${Math.floor(Math.random() * 100) + 1}`
          : sectionType === "featured"
            ? "featured-offers"
            : "most-popular",
      title:
        sectionType === "category_based"
          ? "محصولات بر اساس دسته‌بندی"
          : sectionType === "featured"
            ? "پیشنهاد ویژه"
            : "محصولات پرطرفدار",
    },
  */

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    const {
      is_active,
      products_limit,
      view_all_link,
      category_id,
      title,
      slug,
      section_type,
      start_date,
      end_date,
    } = form;

    const payload: Record<string, any> = {
      is_active,
      show_view_all_button: true,
      products_limit,
      view_all_link,
      display_style: "carousel",
      title,
      slug,
      section_type,
      start_date,
      end_date,
      ...(form?.promotion_id ? { promotion_id: form.promotion_id } : {}),
      ...(showCategoryField ? { category_id } : {}),
    };

    if (defaultValues?.id) {
      return handleMutation(() => updateSection(payload), {
        resetForm,
      });
    } else {
      return handleMutation(() => createSection(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    reset();
  };

  const setFormHandler = () => {
    if (!defaultValues) return;

    const {
      view_all_link,
      products_limit,
      is_active,
      category,
      title,
      slug,
      section_type,
      start_date,
      end_date,
    } = defaultValues;

    setForm({
      ...initialForm,
      view_all_link,
      products_limit,
      is_active,
      title,
      slug,
      section_type,
      promotion_id: defaultValues?.promotion_id ,
      /* ...(defaultValues?.promotion_id
        ? { promotion_id: defaultValues.promotion_id }
        : {}), */
      /* start_date,
      end_date, */
      ...(showCategoryField ? { category_id: category?.id } : {}),
    });
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
        !defaultValues ? resetForm() : setFormHandler();
      }}
      title={defaultValues?.id ? `ویرایش ${title}` : `افزودن ${title}`}
      confirmText={defaultValues?.id ? "ویرایش" : "ایجاد"}
      onConfirm={handleSubmit}
      icon={icon}
      isConfirmDisabled={isCreating || isUpdating}
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <TextInput
            label="عنوان بخش"
            placeholder="وارد کنید..."
            value={form.title}
            onChange={(val) => handleFieldChange("title", val)}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.title}
          />
          <TextInput
            label="نامک"
            placeholder="path/to/1"
            value={form.slug}
            allowSpecialChars
            allowedSpecialChars={["/", "-"]}
            isRequired
            errorMessage={errors.slug}
            onChange={(val) => {
              handleFieldChange("slug", val);
            }}
            inputAlign="left"
            allowSpaces={false}
          />
        </div>

        <div
          className={`grid grid-cols-1 ${sectionType !== "promotion_based" ? "md:grid-cols-2 gap-2" : ""}`}
        >
          <NumberInput
            label="تعداد محدودیت نمایش"
            placeholder="10"
            suffix="عدد"
            min={0}
            max={30}
            value={form.products_limit}
            onChange={(limit) => handleFieldChange("products_limit", limit)}
            errorMessage={errors.products_limit}
          />
          {sectionType !== "promotion_based" ? (
            <TextInput
              label="لینک"
              placeholder="path/to/1"
              value={form.view_all_link}
              allowSpecialChars
              allowedSpecialChars={["/", "-"]}
              isRequired
              errorMessage={errors.view_all_link}
              onChange={(val) => {
                handleFieldChange("view_all_link", val);
              }}
              inputAlign="left"
              allowSpaces={false}
            />
          ) : (
            ""
          )}
        </div>

        {sectionType === "promotion_based" ? (
          <FlashDealSelect
            value={form.promotion_id}
            onChange={(val) => handleFieldChange("promotion_id", Number(val))}
            errorMessage={errors.promotion_id}
            isRequired
          />
        ) : (
          ""
        )}
        {/* {sectionType === "promotion_based" ? (
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
            errorMessage={errors.start_date}
          />
        ) : (
          ""
        )} */}

        {showCategoryField ? (
          <CategorySelect
            value={form.category_id}
            onChange={(val) =>
              handleFieldChange("category_id", Number(val) || 0)
            }
            errorMessage={errors.category_id}
            withAddModal={false}
          />
        ) : (
          ""
        )}

        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default StaticSectionModal;
