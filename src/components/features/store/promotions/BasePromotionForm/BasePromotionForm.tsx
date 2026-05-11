"use client";

import React, { useEffect } from "react";
//? Components
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import Switch from "@/components/ui/Switch";
import FormActionButtons from "@/components/common/FormActionButtons";
import PriceNumberInput from "@/components/ui/inputs/NumberInput";
//? Selectable
import SelectableCategoriesBox from "@/components/features/products/categories/SelectableCategoriesBox/SelectableCategoriesBox";
//? Icon
import { TbRosetteDiscount } from "react-icons/tb";
import { MdOutlineCleaningServices } from "react-icons/md";
//? Other
import { mapAPIToLocalForm, mapLocalFormToAPI } from "./promotions-helpers";
import { FORM_CONFIGS } from "./form-configs-promotions";
import {
  PromotionAPI,
  PromotionForm,
  PromotionFormConfig,
} from "../promotions-types";
import { useForm } from "@/core/hooks/common/form/useForm";
import { validatePromotionForm } from "./promotions-validation";
import SelectableCustomersBox from "@/components/features/store/customers/SelectableCustomersBox/SelectableCustomersBox";
import ProductVariantSelectionBox from "@/components/features/products/SelectableProduct/ProductVariants/ProductVariantSelectionBox";
interface BasePromotionFormProps {
  formType: keyof typeof FORM_CONFIGS;
  scope?: "general" | "products" | "categories" | "customers";
  initialData?: any;
  isEditMode?: boolean;
  isShowLoader?: boolean;
  onHandleReset?: () => void;
  onHandleSubmit: (data: PromotionAPI) => void;
  loading?: boolean;
  resetSignal?: number;
}

const initialPromotionForm: PromotionForm = {
  name: "",
  code: "",
  percent_discount: 0,
  amount_discount: 0,
  usage_limit: undefined,
  min_order_amount: undefined,
  max_discount_amount: undefined,
  starts_at: null,
  ends_at: null,
  is_active: true,
  first_order: false,
  allowed_users: [],
  allowed_products: [],
  allowed_categories: [],
};

export function BasePromotionForm({
  formType,
  scope = "general",
  initialData,
  isEditMode = false,
  isShowLoader = false,
  onHandleReset,
  onHandleSubmit,
  loading = false,
  resetSignal,
}: BasePromotionFormProps) {
  const config: PromotionFormConfig = FORM_CONFIGS[formType];
  const {
    form,
    errors,
    handleFieldChange,
    reset,
    submit,
    setForm,
    handleMultipleFieldsChange,
  } = useForm<PromotionForm>(initialPromotionForm, {
    onValidate: (f) => validatePromotionForm(f, config, scope),
    runValidationOnChange: true,
  });

  useEffect(() => {
    reset();
    if (initialData) {
      setForm(mapAPIToLocalForm(initialData, formType));
    } else if (formType === "first_order") {
      setForm((prev) => ({ ...prev, first_order: true }));
    }
  }, [initialData, formType, resetSignal]);

  useEffect(() => {
    (resetSignal ?? 0) === 1 && setForm(initialPromotionForm);
  }, [resetSignal]);

  const handleSubmit = submit(async () => {
    const payload = mapLocalFormToAPI(form, formType);
    onHandleSubmit(payload);
  });

  const handleResetLocal = () => {
    reset();
    setForm(initialPromotionForm);
    onHandleReset?.();
  };

  return (
    <BaseCard
      wrapperContents
      CardHeaderProps={{
        title: isEditMode ? "ویرایش" : "افزودن",
        icon: <TbRosetteDiscount />,
        textBtn: "پاک سازی فرم",
        btnIcon: <MdOutlineCleaningServices />,
        onAdd: handleResetLocal,
      }}
      isLoading={isShowLoader}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TextInput
          label="نام پروموشن"
          placeholder="مثلاً تخفیف تابستانه"
          allowEnglishOnly={false}
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          isRequired
          errorMessage={errors.name}
        />

        {config.code && (
          <TextInput
            label="کد"
            placeholder="مثلاً SUMMER2026"
            value={form.code || ""}
            onChange={(val) => handleFieldChange("code", val)}
            isRequired
            errorMessage={errors.code}
          />
        )}

        {config.discount_fields && (
          <>
            <TextInput
              label="درصد تخفیف"
              placeholder="مثلاً 20"
              value={String(form.percent_discount)}
              onChange={(val) => handleFieldChange("percent_discount", val)}
              allowNumbers
              maxLength={2}
              isRequired
              errorMessage={errors.discount}
            />
            <PriceNumberInput
              value={form.amount_discount ?? 0}
              onChange={(val) => handleFieldChange("amount_discount", val)}
              label="تخفیف مبلغی"
              placeholder="مثلاً 50000"
              suffix="تومان"
            />
          </>
        )}

        {config.usage_limit && (
          <PriceNumberInput
            value={form.usage_limit}
            onChange={(val) => handleFieldChange("usage_limit", val)}
            label="محدودیت تعداد استفاده"
            placeholder="عدد"
            suffix="عدد"
          />
        )}

        {config.min_order_amount && (
          <PriceNumberInput
            value={form.min_order_amount}
            onChange={(val) => handleFieldChange("min_order_amount", val)}
            label="حداقل مبلغ سفارش"
            placeholder="تومان"
            suffix="تومان"
          />
        )}

        {config.max_discount_amount && (
          <PriceNumberInput
            value={form.max_discount_amount}
            onChange={(val) => handleFieldChange("max_discount_amount", val)}
            label="سقف تخفیف"
            placeholder="تومان"
            suffix="تومان"
          />
        )}

        <IsoDatePicker
          label="بازه اعتبار"
          enableRange
          valueIsoRange={{ start: form.starts_at, end: form.ends_at }}
          onChangeIsoRange={(range) => {
            handleMultipleFieldsChange({
              starts_at: range?.start,
              ends_at: range?.end,
            });
          }}
          showMonthAndYearPickers
          className="w-full"
          isRequired
          errorMessage={errors.starts_at}
        />
      </div>

      <div className="mt-6">
        <Switch
          isSelected={form.is_active}
          onValueChange={(v) => handleFieldChange("is_active", v)}
          color="success"
        >
          فعال باشد
        </Switch>
      </div>

      {scope === "products" && config.scope.includes("product") && (
        <ProductVariantSelectionBox
          onChange={(items) => handleFieldChange("allowed_products", items)}
          error={!!errors.allowed_products}
        />
      )}

      {scope === "categories" && config.scope.includes("category") && (
        <SelectableCategoriesBox
          onChange={(ids) => {
            handleFieldChange("allowed_categories", ids);
          }}
          error={!!errors.allowed_categories?.length}
        />
      )}

      {scope === "customers" && config.scope.includes("user") && (
        <SelectableCustomersBox
          onChange={(ids) => handleFieldChange("allowed_users", ids)}
          error={!!errors.allowed_users?.length}
        />
      )}

      <FormActionButtons
        cancelHref="/admin/store/promotions"
        onSubmit={handleSubmit}
        isSubmitting={loading}
        submitText={isEditMode ? "ویرایش" : "ثبت"}
      />
    </BaseCard>
  );
}

export default BasePromotionForm;
