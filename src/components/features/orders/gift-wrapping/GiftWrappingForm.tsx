"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import FormActionButtons from "@/components/common/FormActionButtons";
import Textarea from "@/components/ui/inputs/Textarea";

import { useForm } from "@/core/hooks/common/form/useForm";
import {
  useCreateGiftWrapping,
  useUpdateGiftWrapping,
  useUploadGiftWrappingImages,
} from "@/core/hooks/api/useGiftWrapping";

import { giftWrappingValidation } from "./gift-wrapping-validation";
import toast from "react-hot-toast";
import { FiGift } from "react-icons/fi";
import NumberInput from "@/components/ui/inputs/NumberInput";
import { CreateGiftWrappingRequest } from "./gift-wrapping";

export const initialGiftWrappingForm: CreateGiftWrappingRequest = {
  name: "",
  description: "",
  price: 0,
  image_id: null,
  image: null,
  is_active: false,
  is_for_gift: true,
};

type GiftWrappingFormProps = {
  data: any;
  id: number | null;
  isLoading: boolean;
};

const GiftWrappingForm: React.FC<GiftWrappingFormProps> = ({
  data,
  id,
  isLoading,
}) => {
  const router = useRouter();

  const { mutateAsync: createGift } = useCreateGiftWrapping();
  const { mutateAsync: updateGift } = useUpdateGiftWrapping(id);
  const { mutateAsync: uploadImage } = useUploadGiftWrappingImages();

  const {
    form,
    errors,
    handleFieldChange,
    handleMultipleFieldsChange,
    setForm,
    submit,
  } = useForm(initialGiftWrappingForm, {
    onValidate: giftWrappingValidation,
    runValidationOnChange: true,
  });

  useEffect(() => {
    data && setForm(data);
  }, [data]);

  const handleSubmit = submit(async (changed) => {
     try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: +form.price,
        image_id: form.image_id,
        is_active: form.is_active,
        is_for_gift: form.is_for_gift,
      };
      
      const result = id ? await updateGift(payload) : await createGift(payload);
      result.ok && router.push("/admin/orders/gift-wrapping");
    } catch (err) {
      toast.error("خطایی رخ داد");
    }
  });

  return (
    <BaseCard
      CardHeaderProps={{
        title: id ? "ویرایش بسته‌بندی" : "ایجاد بسته‌بندی",
        icon: <FiGift className="w-6 h-6" />,
        showIconInActionSlot: true,
      }}
      wrapperContents
      isLoading={isLoading}
    >
      <ImageBoxUploader
        title="تصویر بسته‌بندی"
        textBtn={"+ افزودن تصویر"}
        defaultImg={form?.image?.url}
        onFile={async (file) => {
          const formData = new FormData();
          formData.append("files", file);
          const uploadRes = await uploadImage(formData);
          if (!uploadRes.ok) return;
          handleMultipleFieldsChange({
            image_id: uploadRes.data.id,
            image: uploadRes.data,
          });
        }}
        errorMessage={errors.image_id}
      />
      <div className="flex items-center gap-4">
        <TextInput
          label="نام بسته‌بندی"
          placeholder="مثلاً: جعبه کادو لوکس"
          value={form.name}
          onChange={(val) => handleFieldChange("name", val)}
          isRequired
          errorMessage={errors.name}
          allowEnglishOnly={false}
        />

        <NumberInput
          label="قیمت"
          placeholder="مثلاً: 10,000"
          suffix="تومان"
          min={0}
          value={form.price}
          onChange={(price) => handleFieldChange("price", price)}
          errorMessage={errors.price}
        />
      </div>

      <div className="w-full flex items-center gap-4">
        <ToggleSection
          title="وضعیت نمایش"
          subtitle="فعال یا غیرفعال"
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />

        <ToggleSection
          title="مخصوص هدیه"
          subtitle="بسته بندی مخصوص هدیه است؟"
          initialMode={form.is_for_gift}
          onChange={(val) => {
            handleFieldChange("is_for_gift", val);
          }}
        />
      </div>

      <Textarea
        label="توضیحات"
        placeholder="جنس، ابعاد، مناسب برای چه محصولاتی..."
        value={form.description}
        onChange={(val) => handleFieldChange("description", val)}
        isRequired
        minRows={5}
        errorMessage={errors.description}
      />

      <FormActionButtons
        cancelHref="/admin/orders/gift-wrapping"
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </BaseCard>
  );
};

export default GiftWrappingForm;
