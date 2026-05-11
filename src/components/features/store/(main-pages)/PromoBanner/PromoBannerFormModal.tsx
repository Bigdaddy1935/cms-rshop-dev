"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreatePromoBanner,
  useUpdatePromoBanner,
} from "@/core/hooks/api/adminHome/usePromoBanner";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import { handleMutation } from "@/core/utils/mutationHelper";
import { TfiLayoutMediaOverlay } from "react-icons/tfi";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import Textarea from "@/components/ui/inputs/Textarea";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import ColorPickerField from "@/components/shared/ColorPickerField";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import NumberInput from "@/components/ui/inputs/NumberInput"; // کامپوننت جدید عددی
import DualToggleSection from "@/components/shared/Toggle/DualToggleSection";
import { promoBannerValidation } from "./promo-bnanner-validation";
import { LuPlus } from "react-icons/lu";
import { ActionButton } from "@/components/ui/buttons/ActionButton";

const initialPromoBannerForm = {
  title: "",
  description: "",
  image_url: "",
  mediaFile: null as File | null,

  link: "",
  link_text: "",

  background_color: "",
  text_color: "#fff",

  is_active: true,
  is_closable: true,

  display_duration: 10,

  start_date: null as string | null,
  end_date: null as string | null,
  useBackground: false,
};

type PromoBannerFormModalProps = {
  bannerId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const PromoBannerFormModal: React.FC<PromoBannerFormModalProps> = ({
  bannerId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { mutateAsync: createBanner, isPending: isCreating } =
    useCreatePromoBanner();
  const { mutateAsync: updateBanner, isPending: isUpdating } =
    useUpdatePromoBanner();
  const { mutateAsync: uploadImageSlider, isPending: isUploading } =
    useUploadSliderImages();

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialPromoBannerForm, {
    onValidate: (data) => promoBannerValidation(data),
    runValidationOnChange: true,
  });

  // پر کردن فرم در حالت ویرایش
  useEffect(() => {
    if (!defaultValues) return;

    setForm({
      ...initialPromoBannerForm,
      ...defaultValues,
    });
  }, [defaultValues]);

  useEffect(() => {
    if (form) {
      if (form?.background_color?.length) {
        handleFieldChange("useBackground", true);
      }
    }
  }, [isOpen]);

  const handleSubmit = submit(async () => {
    let finalImageUrl = form.image_url;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes: any = await handleMutation(() => uploadImageSlider(fd), {
        returnResponse: true,
      });

      if (!uploadRes.ok) return false;
      finalImageUrl = uploadRes.data[0].url;
    }

    const {
      background_color,
      description,
      image_url,
      link_text,
      mediaFile,
      text_color,
      ...other
    } = form;

    const payload: any = {
      ...(background_color && !finalImageUrl ? { background_color } : {}),
      ...(text_color && !finalImageUrl ? { text_color } : {}),
      ...(link_text ? { link_text } : {}),
      ...(description && !finalImageUrl ? { description } : {}),
      image_url: finalImageUrl,
      ...other,
    };

    if (bannerId) {
      return handleMutation(
        () => updateBanner({ id: bannerId, data: payload }),
        {
          resetForm,
        },
      );
    } else {
      return handleMutation(() => createBanner(payload), { resetForm });
    }
  });

  const resetForm = () => {
    reset();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      triggerProps={null}
      trigger={bannerId ? null : <ActionButton icon={<LuPlus size={18} />} />}
      title={bannerId ? "ویرایش بنر تبلیغاتی" : "افزودن بنر تبلیغاتی جدید"}
      confirmText={bannerId ? "بروزرسانی" : "ایجاد بنر"}
      onConfirm={handleSubmit}
      onCancel={() => {
        !bannerId
          ? resetForm()
          : setForm({
              ...initialPromoBannerForm,
              ...defaultValues,
            });
      }}
      size="xl"
      icon={<TfiLayoutMediaOverlay />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="عنوان بنر"
            placeholder="مثلاً: تخفیف ویژه عید نوروز"
            value={form.title}
            errorMessage={errors.title}
            isRequired
            onChange={(val) => handleFieldChange("title", val)}
            allowEnglishOnly={false}
          />

          <TextInput
            label="لینک بنر"
            placeholder="/collections/sale"
            value={form.link || ""}
            isRequired
            errorMessage={errors.link}
            onChange={(val) => handleFieldChange("link", val)}
            inputAlign="left"
            allowSpecialChars
            allowedSpecialChars={["/", "-"]}
            allowSpaces={false}
          />
        </div>

        {/* عنوان و توضیحات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberInput
            label="مدت نمایش خودکار"
            placeholder="10"
            value={form.display_duration}
            onChange={(val) => handleFieldChange("display_duration", val)}
            min={5}
            max={60}
            suffix="ثانیه"
            isRequired
            errorMessage={errors.display_duration}
          />

          {/* بازه زمانی اعتبار */}
          <IsoDatePicker
            label="بازه اعتبار بنر"
            enableRange
            valueIsoRange={{ start: form.start_date, end: form.end_date }}
            onChangeIsoRange={(range) => {
              handleMultipleFieldsChange({
                start_date: range?.start || null,
                end_date: range?.end || null,
              });
            }}
            showMonthAndYearPickers
            className="w-full"
            isRequired
            errorMessage={errors.start_date}
          />
        </div>

        {/*           <ToggleSection
            title={`قابل بستن توسط کاربر: ${form.is_closable ? "بله" : "خیر"}`}
            initialMode={form.is_closable}
            onChange={(val) => handleFieldChange("is_closable", val)}
          /> */}

        <DualToggleSection
          title="پس‌زمینه بدون عکس"
          mode2Title="پس‌زمینه عکس‌دار"
          value={form.useBackground}
          onChange={(isPhotoBackground: boolean) => {
            if (!isPhotoBackground) {
              handleMultipleFieldsChange({
                useBackground: false,
                background_color: "",
                text_color: "",
              });
            } else {
              handleMultipleFieldsChange({
                useBackground: true,
                background_color: "#000",
                text_color: "#fff",
                mediaFile: null,
              });
            }
          }}
          children={
            <div className="flex flex-col gap-4">
              <TextInput
                label="متن لینک"
                placeholder="مشاهده محصولات"
                value={form.link_text || ""}
                isRequired
                errorMessage={errors.link_text}
                onChange={(val) => handleFieldChange("link_text", val)}
                allowEnglishOnly={false}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ColorPickerField
                  label="رنگ پس‌زمینه"
                  value={form.background_color}
                  onChange={(bgColor) =>
                    handleFieldChange("background_color", bgColor)
                  }
                  widthFull
                />
                <ColorPickerField
                  label="رنگ متن"
                  value={form.text_color}
                  onChange={(text_color) => {
                    handleFieldChange("text_color", text_color);
                  }}
                  widthFull
                />
              </div>

              <Textarea
                label="توضیحات"
                value={form.description || ""}
                onChange={(val) => {
                  handleFieldChange("description", val);
                }}
                placeholder="توضیحات خود را وارد کنید"
                isRequired
                errorMessage={errors.description}
              />
            </div>
          }
          mode2Children={
            <ImageBoxUploader
              changeStatusFile={form.mediaFile}
              defaultImg={form.image_url ?? null}
              onFile={(file) =>
                handleMultipleFieldsChange({
                  mediaFile: file,
                  image_url: "",
                })
              }
              errorMessage={errors.image_url}
            />
          }
        />
        <ToggleSection
          title={`وضعیت نمایش: ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default PromoBannerFormModal;
