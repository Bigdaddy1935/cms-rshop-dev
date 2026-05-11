"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import TextInput from "@/components/ui/inputs/TextInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import { handleMutation } from "@/core/utils/mutationHelper";
import { sizeGuideValidation } from "./size-guide-validation";
import Textarea from "@/components/ui/inputs/Textarea";
import {
  useCreateSizeGuid,
  useSizeGuideUpload,
  useUpdateSizeGuid,
} from "@/core/hooks/api/useSizeGuide";
import { PiResizeBold } from "react-icons/pi";

type Props = {
  sizGuideId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialSizeForm = {
  title: "",
  description: "",
  image: null as File | string | null,
};

const AddNewSizeGuideModal: React.FC<Props> = ({
  sizGuideId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialSizeForm,
    {
      onValidate: sizeGuideValidation,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useSizeGuideUpload();
  const { mutateAsync: createSizeGuide, isPending: isPendingCreate } =
    useCreateSizeGuid();
  const { mutateAsync: updateSizeGuid, isPending: isPendingUpdate } =
    useUpdateSizeGuid();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let imageUrl = typeof form.image === "string" ? form.image : "";

    if (form.image instanceof File) {
      const formData = new FormData();
      formData.append("files", form.image);

      const uploadRes = (await handleMutation(() => uploadMedias(formData), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      imageUrl = uploadRes.data?.[0]?.url ?? null;
    }

    const { title, description } = form;
    const payload = { title, description, image: imageUrl };
    if (sizGuideId)
      return handleMutation(
        () => updateSizeGuid({ data: payload, id: sizGuideId }),
        {
          resetForm,
        },
      );
    else return handleMutation(() => createSizeGuide(payload), { resetForm });
  });

  const resetForm = () => reset();

  const setFormHandler = () => {
    setForm({
      ...initialSizeForm,
      ...defaultValues,
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        sizGuideId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !sizGuideId ? resetForm() : setFormHandler();
      }}
      title={sizGuideId ? "ویرایش راهنمای سایز" : "افزودن راهنمای سایز"}
      confirmText={sizGuideId ? "ویرایش" : "ایجاد"}
      onConfirm={handleSubmit}
      icon={<PiResizeBold />}
      isConfirmDisabled={isPendingUpload || isPendingCreate || isPendingUpdate}
    >
      <div className="flex flex-col gap-6">
        <ImageBoxUploader
          textBtn={form.image ? "تغییر لوگو" : "+ افزودن لوگو"}
          title="لوگوی راهنمای سایز"
          changeStatusFile={form.image}
          defaultImg={form.image}
          onFile={(file) => handleFieldChange("image", file)}
          errorMessage={errors.image}
        />

        <TextInput
          label="عنوان"
          placeholder="وارد کنید"
          value={form.title}
          onChange={(val) => handleFieldChange("title", val)}
          allowEnglishOnly={false}
          isRequired
          errorMessage={errors.title}
        />

        <Textarea
          onChange={(val) => handleFieldChange("description", val)}
          value={form.description}
          errorMessage={errors.description}
          isRequired
          placeholder="وارد کنید"
          label="توضیحات"
        />
      </div>
    </BaseModal>
  );
};

export default AddNewSizeGuideModal;
