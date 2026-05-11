// components/ui/inputs/IsoDatePicker.tsx
"use client";

import React from "react";
import { DatePicker, DateRangePicker } from "@heroui/react";
import type { CalendarDate } from "@internationalized/date";
import { calToISO, isoToCal } from "@/core/utils/date";
import FieldErrorText from "../FieldErrorText";

type IsoRange = { start?: string | null; end?: string | null } | null;

type IsoDatePickerProps = {
  label?: React.ReactNode;
  labelPlacement?: "inside" | "outside" | "outside-left";
  description?: React.ReactNode;
  isRequired?: boolean;
  errorMessage?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  showMonthAndYearPickers?: boolean;
  placeholderValue?: string | null;

  /** single mode */
  valueIso?: string | null;
  onChangeIso?: (iso?: string | null) => void;

  /** range mode */
  valueIsoRange?: IsoRange;
  onChangeIsoRange?: (range?: IsoRange) => void;

  /** enable range selection? (default false) */
  enableRange?: boolean;

  className?: string;
};

const IsoDatePicker: React.FC<IsoDatePickerProps> = ({
  label,
  description,
  isRequired,
  errorMessage,
  variant = "flat",
  showMonthAndYearPickers = true,
  placeholderValue,
  valueIso,
  onChangeIso,
  valueIsoRange,
  onChangeIsoRange,
  labelPlacement = "outside",
  enableRange = false,
  className,
}) => {
  // helper (iso -> CalendarDate or undefined)
  const isoToCalOrUndef = (iso?: string | null) =>
    iso ? (isoToCal(iso) as unknown as CalendarDate) : undefined;

  // helper (CalendarDate|any -> iso|null)
  const calAnyToIsoOrNull = (c: any) => {
    if (!c) return null;
    try {
      // calToISO in your utils should accept the CalendarDate-like object
      return calToISO(c as CalendarDate) ?? null;
    } catch {
      return null;
    }
  };

  if (!enableRange) {
    return (
      <DatePicker
        label={label}
        labelPlacement={labelPlacement}
        description={description}
        isRequired={isRequired}
        isInvalid={!!errorMessage?.length}
        errorMessage={
          errorMessage?.length ? (
            <FieldErrorText error={errorMessage} />
          ) : undefined
        }
        variant={variant as any}
        showMonthAndYearPickers={showMonthAndYearPickers}
        value={isoToCalOrUndef(valueIso) as any}
        placeholderValue={
          placeholderValue ? (isoToCal(placeholderValue) as any) : undefined
        }
        onChange={(c: any) => {
          const iso = calAnyToIsoOrNull(c ?? undefined);
          onChangeIso?.(iso);
        }}
        className={className}
      />
    );
  }

  // --- range mode ---
  // Build a value object for DateRangePicker where both start & end are defined
  const sCal = isoToCalOrUndef(valueIsoRange?.start ?? null);
  const eCal = isoToCalOrUndef(valueIsoRange?.end ?? null);

  // DateRangePicker's typing expects start & end to be DateValue (not undefined) when object provided,
  // so we ensure both are set (fallback to the other) — otherwise pass undefined (controlled empty).
  let rangeValue: any = null;
  if (sCal || eCal) {
    const start = sCal ?? eCal!;
    const end = eCal ?? sCal!;
    rangeValue = { start, end };
  } else {
    rangeValue = null;
  }

  return (
    <DateRangePicker
      label={label}
      labelPlacement={labelPlacement}
      value={rangeValue as any} // cast to any to satisfy TS types from lib
      isInvalid={!!errorMessage?.length}
      errorMessage={
        errorMessage?.length ? (
          <FieldErrorText error={errorMessage} />
        ) : undefined
      }
      onChange={(v: any) => {
        // v is RangeValue<DateValue> | null
        if (!onChangeIsoRange) return;

        if (!v) {
          onChangeIsoRange(null);
          return;
        }

        // normalize and convert to ISO (calAnyToIsoOrNull handles types)
        const startIso = calAnyToIsoOrNull(v.start) ?? null;
        const endIso = calAnyToIsoOrNull(v.end) ?? null;

        if (!startIso && !endIso) {
          onChangeIsoRange(null);
        } else {
          onChangeIsoRange({ start: startIso, end: endIso });
        }
      }}
      showMonthAndYearPickers={showMonthAndYearPickers}
      className={className}
    />
  );
};

export default IsoDatePicker;
