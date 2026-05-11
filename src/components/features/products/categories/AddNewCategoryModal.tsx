"use client";

import React, { useEffect, useState } from "react";
import { Checkbox, NumberInput } from "@heroui/react";
import BaseModal from "@/components/ui/modals/BaseModal";
import ImageBoxUploader from "@/components/media/ImageBoxUploader";
import {
  useCreateCategory,
  useUpdateCategory,
  useCategoryImageUpload,
} from "@/core/hooks/api/categories/useCategory";
import { useForm } from "@/core/hooks/common/form/useForm";
import SlugInput from "@/components/forms/Inputs/SlugInput";
import { BiCategoryAlt } from "react-icons/bi";
import { validateCategory } from "./category-validation";
import TextInput from "@/components/ui/inputs/TextInput";
import FieldErrorText from "@/components/forms/FieldErrorText";
import CategorySelect from "./CategorySelect";
import { handleMutation } from "@/core/utils/mutationHelper";
import SelectableIconsBox from "../../store/icons/SelectableIconBox/SelectableIconsBox";
import { useIconsSelection } from "../../store/icons/SelectableIconBox/IconsSelectionContext";


const initialCategoryForm = {
  title: "",
  slug: "",
  discount: "0",
  parentId: 0,
  mediaId: "",
  media: null as any,
  mediaFile: null as File | null,
  icon_id: null as number | null,
  level: 1,
};

type AddNewCategoryModalProps = {
  categoryId?: number;
  defaultValues?: any;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

const AddNewCategoryModal: React.FC<AddNewCategoryModalProps> = ({
  categoryId,
  defaultValues,
  isOpen,
  onOpenChange,
}) => {
  const [isParent, setIsParent] = useState(true);

  const {setIcons} = useIconsSelection();

  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCategory();
  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCategory();
  const { mutateAsync: uploadImageCategory, isPending: isUploading } =
    useCategoryImageUpload();

  const {
    form,
    errors,
    setForm,
    handleFieldChange,
    handleMultipleFieldsChange,
    reset,
    submit,
  } = useForm(initialCategoryForm, {
    onValidate: validateCategory,
    runValidationOnChange: true,
  });

  useEffect(() => {
    setFormHandler();
  }, [defaultValues, isOpen]);

  const handleSubmit = submit(async () => {
    let finalMediaId = form.mediaId;

    if (form.mediaFile) {
      const fd = new FormData();
      fd.append("files", form.mediaFile);

      const uploadRes = (await handleMutation(() => uploadImageCategory(fd), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      finalMediaId = uploadRes.data[0].id;
    }

    const payload = {
      id: categoryId,
      title: form.title,
      slug: form.slug,
      discount: form.discount,
      parentId: form.parentId,
      mediaId: finalMediaId,
      icon_id: form.icon_id,
    };

    if (categoryId)
      return handleMutation(() => updateCategory(payload), {
        resetForm,
      });
    else return handleMutation(() => createCategory(payload), { resetForm });
  });

  const resetForm = () => {
    reset();
    setIcons([]);
    //setForm(initialCategoryForm);
    //setIsParent(false);
  };

  const setFormHandler = () => {
    setIcons([]);
    if (!defaultValues) {
      setForm(initialCategoryForm);
      setIsParent(true);
      return;
    }

    const { discount, media, slug, title, parent_id, level, icon } =
      defaultValues;

    setForm({
      ...initialCategoryForm,
      title,
      slug,
      discount,
      parentId: parent_id,
      media,
      mediaId: media?.id ?? "",
      mediaFile: null,
      icon_id: icon?.id,
      level: level,
    });

    setIsParent(level === 1);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={(val) => {
        onOpenChange?.(val);
      }}
      triggerProps={
        categoryId
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary mb-1",
            }
      }
      onCancel={() => {
        if (!categoryId) {
          resetForm();
        } else {
          setFormHandler();
        }
      }}
      title={categoryId ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
      confirmText={categoryId ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی"}
      onConfirm={handleSubmit}
      size="xl"
      icon={<BiCategoryAlt />}
      isConfirmDisabled={isCreating || isUpdating || isUploading}
    >
      <div className="flex flex-col gap-6">
        <div>
          <div
            className={`flex flex-col gap-4 p-4 border-1.5 rounded-2xl ${
              errors?.parentId?.length
                ? "border border-red-300"
                : "border-slate-300"
            }`}
          >
            <CategorySelect
              value={isParent ? null : form.parentId}
              onChange={(val) =>
                handleFieldChange("parentId", Number(val) || 0)
              }
              isDisabled={isParent}
              errorMessage={errors.parentId}
              withAddModal={false}
            />
            <Checkbox
              isSelected={isParent}
              onValueChange={(val) => {
                setIsParent(val);
                if (!val) {
                  setForm((prev) => ({ ...prev, parentId: -1 }));
                }
                if (val) handleFieldChange("parentId", 0);
              }}
            >
              <span className="text-sm">دسته‌بندی مادر</span>
            </Checkbox>
          </div>
          <div className="mt-2">
            {errors.parentId ? <FieldErrorText error={errors.parentId} /> : ""}
          </div>
        </div>

        <ImageBoxUploader
          changeStatusFile={form.mediaFile}
          defaultImg={form?.media?.url ? form?.media?.url : null}
          onFile={(file) =>
            handleMultipleFieldsChange({
              mediaFile: file,
              mediaId: typeof file === "string" ? file : "",
            })
          }
          errorMessage={errors.mediaId}
        />

        <div className="flex flex-col gap-6 sm:flex-row items-start sm:gap-4">
          <TextInput
            label="عنوان"
            placeholder="عنوان دسته بندی را وارد کنید"
            value={form.title}
            errorMessage={errors.title}
            isRequired
            onChange={(val) => handleFieldChange("title", val)}
            allowEnglishOnly={false}
          />

          <SlugInput
            value={form.slug}
            onChange={(val) => handleFieldChange("slug", val)}
            isActiveError={true}
            errorMessage={errors.slug}
          />
        </div>

        <NumberInput
          label="تخفیف"
          labelPlacement="outside"
          hideStepper
          minValue={0}
          maxValue={99}
          endContent={<>%</>}
          value={+form.discount}
          onValueChange={(val) =>
            handleFieldChange("discount", String(val) || "0")
          }
        />

        {form.level === 1 && isParent ? (
          <SelectableIconsBox
            onChange={(ids) => {
              handleFieldChange("icon_id", ids[0] || null)
            }}
          />
        ) : (
          ""
        )}
      </div>
    </BaseModal>
  );
};

export default AddNewCategoryModal;
