"use client";

import React from "react";
import TextInput from "../../inputs/TextInput";
import IsoDatePicker from "@/components/forms/Inputs/IsoDatePicker";
import NumberWithSelectGroup from "@/components/forms/Inputs/NumberWithSelectGroup";
import NumberRangeGroup from "@/components/forms/Inputs/NumberRangeGroup";
import SelectBox from "../../inputs/SelectBox";
import AnimatedMultiSelect from "@/components/forms/Inputs/SearchableMultiSelect";
import { FieldOption, FilterField } from ".";
import AutocompleteInput from "../../inputs/AutocompleteInput";

type Props = {
  f: FilterField;
  state: Record<string, any>;
  setField: (key: string, val: any) => void;
  remoteCache?: Record<string, any>;
};

export const renderField = ({
  f,
  state,
  setField,
  remoteCache = {},
}: Props) => {
  switch (f.type) {
    case "boolean01":
      return (
        <SelectBox
          label={f.label}
          value={state[f.key]}
          onChange={(val) => setField(f.key, val)}
          options={[
            { key: "", title: "همه" },
            { key: "1", title: "دارد" },
            { key: "0", title: "ندارد" },
          ]}
        />
      );

    case "select":
      if (f.searchable) {
        return (
          <AutocompleteInput
            label={f.label}
            placeholder={f.placeholder}
            options={(f.options ?? remoteCache[f.key] ?? []).map((o: any) => ({
              id: o.key,
              title: o.title,
            }))}
            selectedId={state[f.key]}
            onChange={(val) => setField(f.key, val)}
            syncSearchToUrl={f.syncSearchToUrl}
            searchKey={f.searchKey}
          />
        );
      }

      return (
        <SelectBox
          label={f.label}
          value={state[f.key]}
          onChange={(val) => setField(f.key, val)}
          options={f.options ?? remoteCache[f.key] ?? []}
          placeholder={f.placeholder}
        />
      );

    case "multiSelect":
      const opts = f.options ?? remoteCache[f.key] ?? [];
      return (
        <AnimatedMultiSelect
          label={f.label}
          options={opts.map((o: FieldOption) => ({
            value: o.key,
            label: o.title,
          }))}
          selectedValues={state[f.key] ?? []}
          onChange={(vals) => setField(f.key, vals)}
          placeholder={(f as any).placeholder ?? "جستجو یا انتخاب کنید..."}
        />
      );

    case "numberRange":
      return (
        <NumberRangeGroup
          label={f.label}
          minValue={
            state[`${f.key}Min`] === "" ? "" : Number(state[`${f.key}Min`])
          }
          maxValue={
            state[`${f.key}Max`] === "" ? "" : Number(state[`${f.key}Max`])
          }
          placeholderMin={(f as any).placeholderMin ?? ""}
          placeholderMax={(f as any).placeholderMax ?? ""}
          onMinChange={(val) => setField(`${f.key}Min`, val)}
          onMaxChange={(val) => setField(`${f.key}Max`, val)}
          min={0}
        />
      );

    case "unitNumber":
      return (
        <NumberWithSelectGroup
          label={f.label}
          minValue={state[`${f.key}Min`]}
          maxValue={state[`${f.key}Max`]}
          onMinChange={(v) => setField(`${f.key}Min`, v)}
          onMaxChange={(v) => setField(`${f.key}Max`, v)}
          selectValue={
            state[`${f.key}Unit`] ?? String(f.unitOptions[0]?.key ?? "")
          }
          onSelectChange={(v) => setField(`${f.key}Unit`, v)}
          selectOptions={f.unitOptions}
        />
      );

    case "discount":
      return (
        <NumberWithSelectGroup
          label={f.label}
          minValue={state[`${f.key}Min`]}
          maxValue={state[`${f.key}Max`]}
          onMinChange={(v) => setField(`${f.key}Min`, v)}
          onMaxChange={(v) => setField(`${f.key}Max`, v)}
          selectValue={state["discountType"] ?? "percent"}
          onSelectChange={(v) => setField("discountType", v)}
          selectOptions={[
            { key: "percent", title: "درصد" },
            { key: "amount", title: "مبلغ ثابت" },
          ]}
        />
      );

    case "dateRange":
      return (
        <IsoDatePicker
          label={f.label}
          enableRange
          valueIsoRange={state[`${f.key}Range`]}
          onChangeIsoRange={(range) => {
            setField(`${f.key}Range`, range);
          }}
        />
      );

    case "singleDate":
      return (
        <IsoDatePicker
          label={f.label}
          enableRange={false}
          valueIso={state[f.key] ?? ""}
          onChangeIso={(date) => {
            setField(f.key, date || "");
          }}
        />
      );

    case "text":
      return (
        <TextInput
          label={f.label}
          placeholder={(f as any).placeholder ?? ""}
          value={state[f.key] ?? ""}
          onChange={(val) => setField(f.key, val)}
        />
      );

    default:
      return null;
  }
};
