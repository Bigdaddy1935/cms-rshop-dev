"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import BaseModal from "../BaseModal";
import { IoFilter } from "react-icons/io5";
import {
  add,
  eqBool10,
  eqId,
  rangeDate,
  rangeNum,
} from "@/core/utils/queryFilters";
import { FieldOption, FilterField } from ".";
import { renderField } from "./renderField";

type Props = {
  title?: React.ReactNode;
  fields: FilterField[];
};

const makeInitialState = (fields?: FilterField[]) => {
  const initial: Record<string, any> = {};
  if (!fields) return initial;

  for (const f of fields) {
    switch (f.type) {
      case "boolean01":
        initial[f.key] = (f as any).default ?? "";
        break;
      case "numberRange":
        initial[`${f.key}Min`] = "";
        initial[`${f.key}Max`] = "";
        break;
      case "unitNumber":
        initial[`${f.key}Min`] = "";
        initial[`${f.key}Max`] = "";
        initial[`${f.key}Unit`] = String(
          (f as any).unitOptions?.[0]?.key ?? ""
        );
        break;
      case "discount":
        initial[`discountType`] = "percent";
        initial[`${f.key}Min`] = "";
        initial[`${f.key}Max`] = "";
        break;
      case "dateRange":
        initial[`${f.key}Range`] = null;
        break;
      case "singleDate":
        initial[f.key] = "";
        break;
      case "multiSelect":
        initial[f.key] = [] as string[];
        break;
      default:
        initial[f.key] = "";
    }
  }

  return initial;
};

const FilterModal: React.FC<Props> = ({ title = "فیلتر محصولات", fields }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // remote options cache
  const [remoteCache, setRemoteCache] = useState<Record<string, FieldOption[]>>(
    {}
  );

  const initialStateMemo = useMemo(() => makeInitialState(fields), [fields]);
  const [state, setState] = useState<Record<string, any>>(initialStateMemo);

  // lazy load remoteOptions
  useEffect(() => {
    fields.forEach((f) => {
      if ("remoteOptions" in f && f.remoteOptions && !remoteCache[f.key]) {
        f.remoteOptions!().then((opts) =>
          setRemoteCache((p) => ({ ...p, [f.key]: opts || [] }))
        );
      }
    });
  }, [fields]);

  const setField = (k: string, v: any) => setState((p) => ({ ...p, [k]: v }));

  const removeExistingFilterKeys = (params: URLSearchParams) => {
    // حذف فقط کلیدهای filter.* (نگه داشتن sortBy, search و غیره)
    for (const key of Array.from(params.keys())) {
      if (key.startsWith("filter.")) {
        params.delete(key);
      }
    }
  };

  const buildParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    removeExistingFilterKeys(params);

    for (const f of fields) {
      switch (f.type) {
        case "boolean01": {
          const v: "" | "1" | "0" = state[f.key] ?? "";
          eqBool10(params, f.key, v);
          break;
        }
        case "select": {
          const v = state[f.key];
          eqId(params, f.key, v);
          break;
        }
        case "multiSelect": {
          const arr: string[] = state[f.key] ?? [];
          (arr || []).forEach((val) => add(params, f.key, `$eq:${val}`));
          break;
        }
        case "numberRange": {
          const min = state[`${f.key}Min`];
          const max = state[`${f.key}Max`];
          rangeNum(params, f.key, min, max);
          break;
        }
        case "unitNumber": {
          const min = state[`${f.key}Min`];
          const max = state[`${f.key}Max`];
          const unit = state[`${f.key}Unit`];
          const keyName =
            String(unit) === "گرم" || String(unit) === "g"
              ? `${f.key}_g`
              : `${f.key}_kg`;
          rangeNum(params, keyName, min, max);
          break;
        }
        case "discount": {
          const min = state[`${f.key}Min`];
          const max = state[`${f.key}Max`];
          const t = state["discountType"] ?? "percent";
          const name = t === "percent" ? "discount_percent" : "discount_amount";
          rangeNum(params, name, min, max);
          break;
        }
        case "dateRange": {
          const range = state[`${f.key}Range`] ?? null;
          if (!range) break;

          const s = range.start ? new Date(range.start) : undefined;
          const e = range.end ? new Date(range.end) : undefined;

          if (s || e) {
            rangeDate(params, f.key, s, e);
          }
          break;
        }
        case "singleDate": {
          const value = state[f.key];
          if (value && value !== "") {
            add(params, f.key, `$eq:${value}`);
          }
          break;
        }
        case "text": {
          const v = state[f.key];
          if (v !== "" && v != null) add(params, f.key, `$like:${v}`);
          break;
        }
      }
    }

    return params;
  };

  const handleApply = () => {
    const p = buildParams();
    const q = p.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
    return true;
  };

  const handleClear = () => {
    // فقط فیلترها را حذف کن، بقیه پارامترها (مثل sortBy) دست نخورده بمونند
    const params = new URLSearchParams(searchParams.toString());
    // حذف همه‌ی filter.*
    for (const key of Array.from(params.keys())) {
      if (key.startsWith("filter.")) params.delete(key);
    }
    // حتما صفحه را ریست کن
    params.set("page", "1");

    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);

    // پاک کردن state محلی مودال
    const init = makeInitialState(fields);
    setState(init);
  };
  return (
    <BaseModal
      title={title}
      icon={
        <IoFilter className="text-3xl text-sky-600 bg-sky-100 rounded-lg p-1" />
      }
      confirmText="اعمال فیلتر"
      cancelText="حذف فیلتر"
      onConfirm={handleApply}
      onCancel={handleClear}
      size="2xl"
      triggerProps={{
        title: "فیلتر",
        icon: <IoFilter className="!text-[16px]" />,
        className: "w-full sm:w-fit text-sky-600 bg-sky-100",
      }}
    >
      <div className="flex flex-col gap-6">
        {fields.map((f) => (
          <div key={f.key}>
            {renderField({ f, state, setField, remoteCache })}
          </div>
        ))}
      </div>
    </BaseModal>
  );
};

export default FilterModal;
