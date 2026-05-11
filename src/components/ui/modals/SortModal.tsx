"use client";

import React, { useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import BaseModal from "./BaseModal";
import { BiSortAlt2 } from "react-icons/bi";
import { ModalSize } from ".";

type SortOption = {
  key: string;
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type SortModalProps = {
  title?: string;
  options: SortOption[];
  defaultKey?: string;
  size?: ModalSize;
};

/** کامپوننتی که داخل BaseModal قرار می‌گیرد (یک کامپوننت React واقعی) */
const SortOptions: React.FC<{
  options: SortOption[];
  selected: string;
  onSelect: (key: string) => void;
  onClear: () => void;
  onOpenChange?: (open: boolean) => void; // توسط BaseModal تزریق می‌شود (cloneElement)
}> = ({ options, selected, onSelect, onClear, onOpenChange }) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt.key}
          onClick={() => {
            if (selected === opt.key) {
              onClear();
              onOpenChange?.(false); // بستن مودال
              return;
            }
            onSelect(opt.key);
            onOpenChange?.(false); // بستن مودال
          }}
          className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all border text-right
            ${
              selected === opt.key
                ? "bg-sky-100 text-sky-700 border-sky-200"
                : "hover:bg-slate-100 border-transparent"
            }`}
        >
          <div className="flex items-center gap-2">
            {opt.icon}
            <span className="text-sm">{opt.label}</span>
          </div>
          {selected === opt.key && <span className="text-sky-600 text-xs">✓</span>}
        </button>
      ))}
    </div>
  );
};

const SortModal: React.FC<SortModalProps> = ({
  title = "مرتب‌سازی",
  options,
  defaultKey = "id-desc",
  size = "md",
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // تبدیل value <-> key
  const valueToKey = useMemo(() => new Map(options.map((o) => [o.value, o.key])), [options]);
  const keyToValue = useMemo(() => new Map(options.map((o) => [o.key, o.value])), [options]);

  // sortBy فعلی از URL
  const currentSorts = useMemo(() => searchParams.getAll("sortBy"), [searchParams]);

  const selectedKey = useMemo(() => {
    const first = currentSorts[0];
    return first ? valueToKey.get(first) ?? defaultKey : defaultKey;
  }, [currentSorts, valueToKey, defaultKey]);

  const [selected, setSelected] = useState(selectedKey);
  if (selected !== selectedKey) setSelected(selectedKey);

  // ساخت پارامترها
  const buildParamsWithSort = (sortValues: string[] | null) => {
    const p = new URLSearchParams(searchParams.toString());
    p.delete("sortBy");
    if (sortValues) sortValues.forEach((v) => p.append("sortBy", v));
    p.set("page", "1");
    return p;
  };

  // توابعی که فقط URL و state رو مدیریت می‌کنن (بستن مودال را SortOptions انجام می‌دهد)
  const applySort = (key: string) => {
    const sortVal = keyToValue.get(key)!;
    const params = buildParamsWithSort([sortVal]);
    router.push(`${pathname}?${params.toString()}`);
    setSelected(key);
  };

  const clearSort = () => {
    const params = buildParamsWithSort(null);
    router.push(`${pathname}?${params.toString()}`);
    // selected بعد از push از روی URL به‌روزرسانی می‌شود
  };

  return (
    <BaseModal
      title={title}
      isActiveFooter={false}
      icon={<BiSortAlt2 className="text-3xl text-sky-600 bg-sky-100 rounded-lg p-1" />}
      size={size}
      triggerProps={{
        title: "مرتب‌سازی",
        icon: <BiSortAlt2 className="!text-[17px]" />,
        className: "w-full sm:w-fit text-sky-600 bg-sky-100",
      }}
    >
      {/* کامپوننت React — BaseModal با cloneElement بهش onOpenChange می‌دهد */}
      <SortOptions options={options} selected={selected} onSelect={applySort} onClear={clearSort} />
    </BaseModal>
  );
};

export default SortModal;
