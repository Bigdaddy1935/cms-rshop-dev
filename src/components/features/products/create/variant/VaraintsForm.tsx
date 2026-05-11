"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import VariantEditorCard from "./VariantEditorCard";
import { useEffect } from "react";
import { useUpdateVariantProduct } from "@/core/hooks/api/attributes/useVariantProduct";
import { useListForm } from "@/core/hooks/common/form/useListForm";
import { validateVariant } from "./variant-validation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type VaraintsFormProps = {
  initialVariants: any[];
};

const VaraintsForm: React.FC<VaraintsFormProps> = ({
  initialVariants = [],
}) => {
  const router = useRouter()
  const updateVariantProductMutation = useUpdateVariantProduct();

  const {
    items: variantsList,
    updateItem,
    errors,
    reset,
    submit,
  } = useListForm<any>(initialVariants, {
    idKey: "id",
    runValidationOnChange: true,
    onValidate: (items) => items.map(validateVariant),
  });

  useEffect(() => {
    reset(initialVariants)
  }, [initialVariants]);

  const handleSubmit = submit(async (changed) => {
    try {
      await Promise.all(
        changed.map((item) => {
          const { id, attributes, ...datas } = item;
          return updateVariantProductMutation.mutateAsync({
            id: id,
            data: datas,
          });
        })
      );
      toast.success(`${changed.length} تنوع محصول بروزرسانی شد`);
      router.push("/admin/products")
    } catch {
      toast.error("خطا در ذخیره تغییرات");
    }
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-6 mb-6">
        {variantsList.map((variant, index) => (
          <VariantEditorCard
            key={variant.id ?? index}
            index={index}
            value={variant}
            onChange={updateItem}
            errors={errors[index] ?? {}}
          />
        ))}
      </div>

      {variantsList.length > 0 && (
        <FormActionButtons
          cancelHref="/admin/products"
          onSubmit={() => handleSubmit()}
          isSubmitting={updateVariantProductMutation.isPending}
        />
      )}
    </>
  );
};

export default VaraintsForm;
