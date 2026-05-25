"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { NumberInput } from "@heroui/react";
//? Components
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import DiscountedPriceInput from "@/components/forms/Inputs/DiscountedPriceInput";
import NumberWithSelect from "@/components/forms/Inputs/NumberWithSelect";
import FormActionButtons from "@/components/common/FormActionButtons";
import DualToggleSection from "@/components/shared/Toggle/DualToggleSection";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import ImagesProducts from "./ImagesProducts";
import BrandSelect from "../brands/BrandSelect";
import CategorySelect from "../categories/CategorySelect";
const TextEditor = dynamic(() => import("@/components/forms/TextEditor"), {
  ssr: false,
});
//? Icons
import { LuScrollText } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
//? Hooks
import {
  useProductCreate,
  useProductUpdate,
} from "@/core/hooks/api/products/useProduct";
import { useForm } from "@/core/hooks/common/form/useForm";
//? Other
import { validateProduct } from "./product-validation";
import { CreateProductRequest, ProductResponse } from "./types/product";
import { mapAPIToLocalProduct } from "./product-helpers";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";
import SizeGuideSelect from "../size-guide/SizeGuideSelect";
import { IconsSelectionProvider } from "../../store/icons/SelectableIconBox/IconsSelectionContext";

const initialProductForm: CreateProductRequest = {
  name: "",
  price: 10000,
  stock: 0,
  is_limited_stock: false,
  category_id: 0,
  discount_amount: 0,
  discount_percent: 0,
  is_featured: false,
  weight: 0,
  weight_unit: "کیلوگرم",
  is_same_day_shipping: false,
  requires_preparation: true,
  preparation_days: 1,
  description: "",
  order_limit: 0,
  is_visible: false,
  media_ids: [],
  media_pinned_id: 0,
  helper_id: null,
  brand_id: 0,
  sku: "",
  is_active: true,
};

type ProductInitialFormProps = {
  data: ProductResponse;
  id: number | null;
  isLoading: boolean;
};

const ProductInitialForm: React.FC<ProductInitialFormProps> = ({
  data,
  id,
  isLoading,
}) => {
  const router = useRouter();
  //? Hooks
  const { mutate: createProduct } = useProductCreate();
  const { mutate: updateProduct } = useProductUpdate(id);

  const {
    form,
    errors,
    handleFieldChange,
    setForm,
    handleMultipleFieldsChange,
    submit,
  } = useForm(initialProductForm, {
    onValidate: validateProduct,
    runValidationOnChange: true,
  });

  useEffect(() => {
    data && setForm(mapAPIToLocalProduct(data));
  }, [data]);

  const handleSubmit = submit(async () => {
    const {
      brand_id,
      category_id,
      discount_amount,
      discount_percent,
      helper_id,
      media_pinned_id,
      order_limit,
      price,
      weight,
      stock,
      ...other
    } = form;

    const result: any = {
      discount_percent: data?.variants?.length
        ? 0
        : (discount_percent && +discount_percent) || 0,
      discount_amount: data?.variants?.length
        ? 0
        : (discount_amount && +discount_amount) || 0,
      helper_id: !helper_id ? null : +helper_id,
      ...(brand_id ? { brand_id: +brand_id } : {}),
      media_pinned_id,
      category_id: +category_id,
      order_limit: +order_limit,
      weight: +weight,
      price: data?.variants?.length ? 0 : +price,
      stock: data?.variants?.length ? 0 : +stock,
      ...other,
    };


    if (!id) {
      createProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            router.push("/admin/products");
          }
        },
      });
    } else {
      updateProduct(result, {
        onSuccess: (res) => {
          if (res.ok) {
            router.push("/admin/products");
          }
        },
      });
    }
  });

  const handleChangeMeddiaPinnedID = (id: any) =>
    updateProduct({ media_pinned_id: id });

  return (
    <>
      {id ? (
        <SearchFilterCard
          relatedPages={[
            {
              title: "تنوع‌های محصول",
              href: `/admin/products/create?edit_id=${id}&type=variant`,
            },
          ]}
        />
      ) : (
        ""
      )}

      <BaseCard
        CardHeaderProps={{
          title: "اطلاعات کلیدی محصول",
          icon: <LuScrollText />,
          showIconInActionSlot: true,
        }}
        wrapperContents
        isLoading={isLoading}
      >
        <ImagesProducts
          onMedia_ids={(datas) => {
            handleFieldChange("media_ids", datas);
          }}
          onMedia_pinned_id={(pinId) => {
            handleFieldChange("media_pinned_id", pinId);
            id && handleChangeMeddiaPinnedID(pinId);
          }}
          initialMedias={data?.medias || []}
          initialPinnedId={form.media_pinned_id}
          errorMessage={errors.media_ids || errors.media_pinned_id}
        />

        <div className="flex flex-col md:flex-row gap-4">
          <TextInput
            label="نام"
            placeholder="نام محصول را وارد کنید"
            value={form.name}
            onChange={(name) => {
              handleFieldChange("name", name);
            }}
            isRequired
            inputAlign="right"
            allowEnglishOnly={false}
            errorMessage={errors.name}
          />

          <NumberWithSelect
            isRequired
            label="وزن"
            value={form.weight}
            onValueChange={(val) => handleFieldChange("weight", val ?? 0)}
            selectedKey={form.weight_unit}
            onSelectChange={(val) => handleFieldChange("weight_unit", val)}
            options={[
              { key: "گرم", title: "گرم" },
              { key: "کیلوگرم", title: "کیلوگرم" },
            ]}
            errorMessage={errors.weight}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <IconsSelectionProvider>
            <CategorySelect
              value={form.category_id}
              onChange={(val) => handleFieldChange("category_id", Number(val))}
              withAddModal
              errorMessage={errors.category_id}
              isRequired
            />
          </IconsSelectionProvider>

          <BrandSelect
            value={form.brand_id}
            onChange={(val) => handleFieldChange("brand_id", Number(val))}
            withAddModal
            errorMessage={errors.brand_id}
            isRequired
          />
        </div>

        {!data?.variants?.length ? (
          <DiscountedPriceInput
            price={form.price}
            discount_amount={form.discount_amount ?? 0}
            discount_percent={form.discount_percent ?? 0}
            onPriceChange={(price) => handleFieldChange("price", +price)}
            onDiscountChange={(type, value) =>
              handleFieldChange(
                type === "amount" ? "discount_amount" : "discount_percent",
                +value,
              )
            }
            errorMessage={errors.price}
          />
        ) : (
          ""
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {data?.variants?.length ? (
            <SizeGuideSelect
              value={form.helper_id}
              onChange={(val) => {
                handleFieldChange("helper_id", val == -1 ? null : val);
              }}
              withAddModal
            />
          ) : (
            ""
          )}
          <TextInput
            label="کد انبار"
            placeholder="مثلاً SKU12345"
            value={form.sku}
            inputAlign="left"
            onChange={(val) => handleFieldChange("sku", val)}
            errorMessage={errors.sku}
            allowSpecialChars
          />
          {!data?.variants?.length ? (
            <NumberInput
              label="موجودی"
              hideStepper
              placeholder="1"
              minValue={0}
              value={form.stock}
              labelPlacement="outside"
              onValueChange={(val) => handleFieldChange("stock", +val)}
              endContent={"عدد"}
            />
          ) : (
            ""
          )}
        </div>

        {!data?.variants?.length ? (
          <SizeGuideSelect
            value={form.helper_id}
            onChange={(val) => {
              handleFieldChange("helper_id", val == -1 ? null : val);
            }}
            withAddModal
          />
        ) : (
          ""
        )}

        <TextEditor
          value={form.description ?? ""}
          onChange={(content) => handleFieldChange("description", content)}
          label="توضیحات"
          errorMessage={errors.description}
        />
      </BaseCard>

      <BaseCard
        CardHeaderProps={{
          title: "اطلاعات تکمیلی محصول",
          icon: <FiShoppingBag />,
          showIconInActionSlot: true,
        }}
        isLoading={isLoading}
        bodyClassName="space-y-4"
      >
        <ToggleSection
          title="نمایش در فروشگاه"
          initialMode={form.is_visible}
          onChange={(val) => handleFieldChange("is_visible", val)}
        />

        <ToggleSection
          title={`وضعیت ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        <ToggleSection
          title="افزودن محصول به لیست پیشنهاد ویژه"
          initialMode={form.is_featured}
          onChange={(val) => handleFieldChange("is_featured", val)}
        />

        <DualToggleSection
          title="می‌خواهم محصول ارسال امروز داشته باشد"
          mode2Title="محصول نیاز به زمان آماده‌سازی دارد"
          value={form.is_same_day_shipping}
          onChange={(val: any) => {

            handleMultipleFieldsChange({
              requires_preparation: !val,
              preparation_days: !val ? form.preparation_days || 1 : null,
              is_same_day_shipping: val,
            });
          }}
          mode2Children={
            <NumberInput
              hideStepper
              placeholder="3"
              minValue={1}
              value={form.preparation_days ?? 1}
              onValueChange={(val) =>
                handleFieldChange("preparation_days", +val)
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">روز</span>
                </div>
              }
              labelPlacement="outside"
            />
          }
        />

        <ToggleSection
          title="محدودیت تعداد برای هر سفارش"
          initialMode={form.order_limit > 0 ? true : false}
          onChange={(val) =>
            handleFieldChange("order_limit", val ? +form.order_limit || 1 : 0)
          }
        >
          <NumberInput
            hideStepper
            placeholder="3"
            minValue={1}
            value={form.order_limit ?? 0}
            labelPlacement="outside"
            onValueChange={(val) => handleFieldChange("order_limit", +val || 1)}
            endContent={
              <span className="text-default-400 text-small">عدد</span>
            }
          />
        </ToggleSection>
      </BaseCard>

      <FormActionButtons
        cancelHref="/admin/products"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProductInitialForm;
