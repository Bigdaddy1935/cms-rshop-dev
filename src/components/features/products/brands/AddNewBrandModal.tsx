"use client";

import React, { useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useBrandUpload,
  useCreateBrand,
  useUpdateBrand,
} from "@/core/hooks/api/useBrand";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import { TbBrandArc } from "react-icons/tb";
import TextInput from "@/components/ui/inputs/TextInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import { validateBrand } from "./brand-validation";
import { handleMutation } from "@/core/utils/mutationHelper";

type Props = {
  brandId?: number | null;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const initialBrandForm = {
  name: "",
  slug: "",
  logo: null as File | string | null,
};

const AddNewBrandModal: React.FC<Props> = ({
  brandId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const { form, errors, handleFieldChange, setForm, reset, submit } = useForm(
    initialBrandForm,
    {
      onValidate: validateBrand,
      runValidationOnChange: true,
    },
  );

  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useBrandUpload();
  const { mutateAsync: createBrand, isPending: isPendingCreate } =
    useCreateBrand();
  const { mutateAsync: updateBrand, isPending: isPendingUpdate } =
    useUpdateBrand();

  useEffect(() => {
    setFormHandler();
  }, [defaultValues]);

  const handleSubmit = submit(async () => {
    let logoUrl = typeof form.logo === "string" ? form.logo : "";

    if (form.logo instanceof File) {
      const formData = new FormData();
      formData.append("files", form.logo);

      const uploadRes = (await handleMutation(() => uploadMedias(formData), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      logoUrl = uploadRes.data?.[0]?.url ?? null;
    }

    const { name, slug } = form;
    const payload = { name, slug, logo: logoUrl };
    if (brandId)
      return handleMutation(() => updateBrand({ ...payload, id: brandId }), {
        resetForm,
      });
    else return handleMutation(() => createBrand(payload), { resetForm });
  });

  const resetForm = () => reset();

  const setFormHandler = () => {
    if (defaultValues) {
      setForm({
        name: defaultValues.name ?? "",
        slug: defaultValues.slug ?? "",
        logo: defaultValues.logo ?? null,
      });
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        brandId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        !brandId ? resetForm() : setFormHandler();
      }}
      title={brandId ? "ویرایش برند" : "افزودن برند جدید"}
      confirmText={brandId ? "ویرایش برند" : "ایجاد برند"}
      onConfirm={handleSubmit}
      icon={<TbBrandArc />}
      isConfirmDisabled={isPendingUpload || isPendingCreate || isPendingUpdate}
    >
      <div className="flex flex-col gap-6">
        <ImageBoxUploader
          textBtn={form.logo ? "تغییر لوگو" : "+ افزودن لوگو"}
          title="لوگوی برند"
          changeStatusFile={form.logo}
          defaultImg={form.logo}
          onFile={(file) => {
            console.log("file =>", file);
            handleFieldChange("logo", file)
          }}
          errorMessage={errors.logo}
        />

        <div className="flex gap-4">
          <TextInput
            label="نام برند"
            placeholder="نام برند را وارد کنید"
            value={form.name}
            onChange={(val) => handleFieldChange("name", val)}
            allowEnglishOnly={false}
            isRequired
            errorMessage={errors.name}
          />

          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={true}
            isRequired
            errorMessage={errors.slug}
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default AddNewBrandModal;
