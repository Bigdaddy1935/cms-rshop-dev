"use client";

import React, { useEffect, useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreateSideBanner,
  useUpdateSideBanner,
} from "@/core/hooks/api/adminHome/useSideBanners";
import { useUploadSliderImages } from "@/core/hooks/api/adminHome/useUploadSliderImages";
import { useForm } from "@/core/hooks/common/form/useForm";
import TextInput from "@/components/ui/inputs/TextInput";
import Textarea from "@/components/ui/inputs/Textarea";
import { handleMutation } from "@/core/utils/mutationHelper";
import ColorPickerField from "@/components/shared/ColorPickerField";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { validateSideBanner } from "./side-banner-validation";
import { SideBannerPosition } from "./side-banner.types";
import { CiImageOn } from "react-icons/ci";
import DualToggleSection from "@/components/shared/Toggle/DualToggleSection";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { LuPlus } from "react-icons/lu";

type Props = {
  bannerId?: number;
  position: SideBannerPosition; // از والد پاس داده میشه (top_left | top_right | ...)
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const initialForm = {
  title: "",
  subtitle: "",
  image_url: "",
  background_color: null,
  link: "",
  badge_text: "",
  badge_color: null,
  is_active: true,

  mediaFile: null as File | null,
  show_badge: false,
  useBackground: false,
};

const SideBannerFormModal: React.FC<Props> = ({
  bannerId,
  position,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  // hooks for API
  const { mutateAsync: createBanner, isPending: isCreating } =
    useCreateSideBanner();
  // useUpdateSideBanner takes id as argument when creating the hook instance
  const { mutateAsync: updateBanner, isPending: isUpdating } =
    useUpdateSideBanner();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadSliderImages();

  const [showBadge, setShowBadge] = useState<boolean>(false);
  const [showBgColor, setShowBgColor] = useState<boolean>(false);

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialForm, {
    onValidate: (data: any) => validateSideBanner(data, showBadge),
    runValidationOnChange: true,
  });

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  useEffect(() => {
    if (form) {
      if (form?.badge_color) {
        setShowBgColor(true);
      }
      if (form?.badge_text?.length) {
        setShowBadge(true);
      }
    }
  }, [isOpen]);

  const handleSubmit = submit(async () => {
    let finalImageUrl = form.image_url;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = (await handleMutation(() => uploadImage(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalImageUrl = uploadRes.data[0].url;
    }

    const {
      title,
      subtitle,
      background_color,
      link,
      badge_text,
      badge_color,
      is_active,
    } = form;

    const payload: Record<string, any> = {
      title,
      subtitle,
      image_url: finalImageUrl,
      position,
      is_active,
      link,
      background_color,
      badge_text,
      badge_color: badge_color,
    };

    if (bannerId) {
      return handleMutation(
        () => updateBanner({ data: payload, id: bannerId ?? 0 }),
        {
          resetForm,
        },
      );
    } else {
      return handleMutation(() => createBanner(payload), {
        resetForm,
      });
    }
  });

  const resetForm = () => {
    reset();
    setShowBadge(false);
    setShowBgColor(false);
  };

  const setFormHandler = () => {
    if (!defaultValues) return;
    setForm({
      ...initialForm,
      ...defaultValues,
      useBackground: !!defaultValues?.title?.length,
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => onOpenChange?.(val)}
      trigger={bannerId ? null : <ActionButton icon={<LuPlus size={18} />} />}
      triggerProps={null}
      onCancel={() => {
        !bannerId ? resetForm() : setFormHandler();
      }}
      title={bannerId ? "ویرایش بنر جانبی" : "افزودن بنر جانبی جدید"}
      confirmText={bannerId ? "ویرایش بنر" : "ایجاد بنر"}
      onConfirm={handleSubmit}
      size="xl"
      icon={<CiImageOn />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-4">
        <TextInput
          label="لینک"
          placeholder="path/to/1"
          value={form.link}
          allowSpecialChars
          allowedSpecialChars={["/", "-"]}
          isRequired
          errorMessage={errors.link}
          onChange={(val) => {
            handleFieldChange("link", val);
          }}
          inputAlign="left"
          allowSpaces={false}
        />
        <DualToggleSection
          title="پس زمینه به همراه متن"
          mode2Title="پس زمینه تنها"
          value={form.useBackground}
          onChange={(val: any) => {
            if (val) {
              handleMultipleFieldsChange({
                background_color: null as any,
                badge_color: null,
                badge_text: "",
                show_badge: false,
                subtitle: "",
                title: "",
                useBackground: true,
              });
            } else {
              handleMultipleFieldsChange({
                background_color: null as any,
                badge_color: null,
                badge_text: "",
                show_badge: false,
                subtitle: "",
                title: "",
                useBackground: false,
              });
            }
          }}
          children={
            <div className="flex flex-col gap-6">
              <ImageBoxUploader
                changeStatusFile={form.mediaFile}
                defaultImg={form?.image_url ?? null}
                onFile={(file) => handleFieldChange("mediaFile", file)}
                errorMessage={errors.image_url_bg}
              />
              <div className="flex items-center gap-4">
                <TextInput
                  label="عنوان"
                  placeholder="عنوان بنر را وارد کنید"
                  value={form.title}
                  errorMessage={errors.title}
                  isRequired
                  onChange={(val) => handleFieldChange("title", val)}
                  allowEnglishOnly={false}
                />
                <ColorPickerField
                  label="رنگ پس زمینه"
                  value={form.background_color ?? "#000"}
                  onChange={(color) =>
                    handleMultipleFieldsChange({
                      background_color: color as any,
                    })
                  }
                  widthFull
                />
              </div>

              <Textarea
                label="متن / زیرعنوان"
                value={form.subtitle}
                onChange={(val) => handleFieldChange("subtitle", val)}
                placeholder="زیرعنوان را وارد کنید"
                isRequired
                errorMessage={errors.subtitle}
              />

              {/* badge toggle */}
              <ToggleSection
                title={"نمایش برچسب (Badge)"}
                initialMode={showBadge}
                onChange={(val) => {
                  setShowBadge(val);
                  handleFieldChange("show_badge", val);
                  if (!val) {
                    handleFieldChange("badge_text", "");
                  }
                }}
              >
                <TextInput
                  label="متن برچسب"
                  placeholder="مثلاً 14% یا جدید"
                  value={form.badge_text}
                  onChange={(val) => {
                    handleFieldChange("badge_text", val);
                    if (!showBadge && val) setShowBadge(true);
                    handleMultipleFieldsChange({ show_badge: Boolean(val) });
                  }}
                  allowSpecialChars
                  allowEnglishOnly={false}
                  isRequired
                  errorMessage={errors.badge_text}
                  className="mb-4"
                />
                <ToggleSection
                  title={"رنگ پس زمینه پرچسب"}
                  initialMode={showBgColor}
                  onChange={(val) => {
                    setShowBgColor(val);
                    handleFieldChange("badge_color", "#000" as any);
                    if (!val) {
                      handleFieldChange("badge_color", null);
                    }
                  }}
                >
                  <ColorPickerField
                    label=""
                    value={form.badge_color ?? ""}
                    onChange={(color) =>
                      handleFieldChange("badge_color", color)
                    }
                    widthFull
                  />
                </ToggleSection>
              </ToggleSection>
            </div>
          }
          mode2Children={
            <ImageBoxUploader
              changeStatusFile={form.mediaFile}
              defaultImg={form?.image_url ?? null}
              onFile={(file) => handleFieldChange("mediaFile", file)}
              errorMessage={errors.image_url}
            />
          }
        />
        <ToggleSection
          title={`وضعیت نمایش ${form.is_active ? "فعال" : "غیرفعال"}`}
          initialMode={form.is_active}
          onChange={(val) => handleFieldChange("is_active", val)}
        />
      </div>
    </BaseModal>
  );
};

export default SideBannerFormModal;
