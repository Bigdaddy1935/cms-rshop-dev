"use client";

import { memo } from "react";
import NumberInput from "@/components/ui/inputs/NumberInput";
import DiscountedPriceInput from "@/components/forms/Inputs/DiscountedPriceInput";
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";

type Variant = {
  id: number;
  price: number;
  stock: number;
  sku: string;
  discount_amount?: number;
  discount_percent?: number;
  [k: string]: any;
};

type Props = {
  index: number;
  value: Variant;
  onChange: (index: number, patch: Partial<Variant>) => void;
  errors?: Record<string, string>;
};

const VariantRowEditor: React.FC<Props> = ({
  index,
  value,
  onChange,
  errors = {},
}) => {
  return (
    <BaseCard
      className="w-full transition-all"
      bodyClassName="flex flex-col gap-4 p-4"
    >
      <div className="flex items-center justify-between border-b border-y-slate-200 pb-4 px-1">
        <p className="text-[17px] text-right text-sky-600">
          {value?.name ?? `واریانت ${index + 1}`}
        </p>
        <p className="text-[17px] text-right text-gray-400">
          #{value.id}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        <div className="grid sm:grid-cols-2 gap-2">
          <TextInput
            inputAlign="left"
            placeholder="کد انبار"
            className="bg-white rounded-xl text-right"
            value={value.sku}
            onChange={(val) => onChange(index, { sku: val })}
            errorMessage={errors.sku}
            allowSpecialChars
          />
          <NumberInput
            placeholder="مثلاً 100"
            suffix="عدد موجود"
            min={0}
            value={value.stock}
            onChange={(stock) => onChange(index, { stock })}
          />
        </div>

        <DiscountedPriceInput
          disabledLabel
          price={value.price}
          discount_amount={value.discount_amount ?? 0}
          discount_percent={value.discount_percent ?? 0}
          onPriceChange={(price) => onChange(index, { price: +price })}
          onDiscountChange={(type, val) =>
            onChange(
              index,
              type === "amount"
                ? { discount_amount: +val, discount_percent: 0 }
                : { discount_percent: +val, discount_amount: 0 },
            )
          }
          style="flex flex-col sm:flex-row gap-2"
          errorMessage={errors.price}
        />
      </div>
    </BaseCard>
  );
};

const VariantEditorCard = memo(VariantRowEditor);
export default VariantEditorCard;
