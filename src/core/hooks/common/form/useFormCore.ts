"use client";

import { useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";

export type ValidateFn<T> =
  | ((data: T) => Record<string, string>)
  | ((data: T) => Record<string, string>[]);

export const useFormCore = <T extends Record<string, any>>(
  initialData: T,
  options: {
    runValidationOnChange?: boolean;
    onValidate?: ValidateFn<T>;
  } = {}
) => {
  const { runValidationOnChange = false, onValidate } = options;

  const [data, setData] = useState<T>(initialData);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<string, any>>>({});

  const initialDataRef = useRef(initialData);

  // اجرای validation و فیلتر خطاها بر اساس touched/hasSubmitted
  const runValidation = useCallback(
    (currentData: T) => {
      if (!onValidate) {
        return Array.isArray(initialDataRef.current) ? [] : {};
      }

      const rawErrors = onValidate(currentData);

      const filterVisibleErrors = (
        itemErrors: Record<string, string>,
        index?: number
      ): Record<string, string> => {
        const visible: Record<string, string> = {};
        const touchedObj = Array.isArray(touched)
          ? touched[index ?? 0] ?? {}
          : touched;

        for (const field in itemErrors) {
          if (touchedObj[field] || hasSubmitted) {
            visible[field] = itemErrors[field];
          }
        }
        return visible;
      };

      const filtered = Array.isArray(rawErrors)
        ? rawErrors.map((err, i) => filterVisibleErrors(err as any, i))
        : filterVisibleErrors(rawErrors as any);

      return filtered;
    },
    [onValidate, touched, hasSubmitted]
  );

  const triggerValidation = useCallback((): boolean => {
    setHasSubmitted(true);

    if (!onValidate) return true;

    const rawErrors = onValidate(data);
    
    const hasError = Array.isArray(rawErrors)
      ? rawErrors.some((err: any) => Object.keys(err).length > 0)
      : Object.keys(rawErrors as any).length > 0;

    if (hasError) {
      toast.error("لطفاً خطاها را برطرف کنید");
      window.scrollTo({ top: 85, behavior: "smooth" });
    }

    return !hasError;
  }, [data, onValidate]);

  // برای live validation بعد از اولین سابمیت
  const shouldValidateLive = runValidationOnChange && hasSubmitted;

  const markFieldAsTouched = useCallback(
    (path: string | number, field: string) => {
      setTouched((prev) => {
        if (typeof path === "number") {
          // برای لیست‌ها (useListForm)
          const list = prev as any[];
          const item = list[path] || {};
          return [
            ...list.slice(0, path),
            { ...item, [field]: true },
            ...list.slice(path + 1),
          ];
        } else {
          // برای فرم ساده
          return { ...prev, [field]: true };
        }
      });
    },
    []
  );

  const resetForm = useCallback(() => {
    setHasSubmitted(false);
    setTouched(
      Array.isArray(initialDataRef.current)
        ? initialDataRef.current.map(() => ({}))
        : {}
    );
    setData(initialDataRef.current);
  }, []);

  // برای ریست با مقدار جدید
  const resetWith = useCallback((newData: T) => {
    initialDataRef.current = newData;
    setData(newData);
    setHasSubmitted(false);
    setTouched(Array.isArray(newData) ? newData.map(() => ({})) : {});
  }, []);

  return {
    data,
    setData,
    errors: runValidation(data), // همیشه خطاهای قابل نمایش
    hasSubmitted,
    shouldValidateLive,

    markFieldAsTouched,
    runValidation,
    triggerValidation, // اینو استفاده کن برای canSubmit
    resetForm,
    resetWith,
  };
};
