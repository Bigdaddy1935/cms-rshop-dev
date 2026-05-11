// src/core/hooks/common/form/useForm.ts
"use client";

import { useCallback, useRef, useState } from "react";
import { useFormCore } from "./useFormCore";
import toast from "react-hot-toast";

export const useForm = <T extends Record<string, any>>(
  initialForm: T,
  options: {
    runValidationOnChange?: boolean;
    onValidate?: (form: T) => Record<string, string>;
  } = {}
) => {
  const core = useFormCore(initialForm, options);
  const initialFormRef = useRef(initialForm);

  // ردیابی تغییرات — دقیقاً مثل useListForm
  const [changedFields, setChangedFields] = useState<Partial<T>>({});

  const shallowEqual = (a: any, b: any): boolean => {
    if (a === b) return true;
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      return a.every((item, i) => item === b[i]);
    }
    return false;
  };

  const handleFieldChange = useCallback(
    (field: keyof T, value: T[keyof T]) => {
      core.setData((prev: T) => {
        const newForm = { ...prev, [field]: value } as T;

        // تشخیص تغییر واقعی
        if (prev[field] !== value) {
          setChangedFields((c) => ({ ...c, [field]: value }));
        } else {
          setChangedFields((c: any) => {
            const { [field]: _, ...rest } = c;
            return rest;
          });
        }

        core.markFieldAsTouched("", String(field));

        if (core.shouldValidateLive) {
          core.runValidation(newForm);
        }

        return newForm;
      });
    },
    [core]
  );

  const handleMultipleFieldsChange = useCallback(
    (fields: Partial<T>) => {
      core.setData((prev: T) => {
        const newForm = { ...prev, ...fields };

        const actuallyChanged: Partial<T> = {};
        for (const key in fields) {
          if (prev[key] !== fields[key]) {
            actuallyChanged[key] = fields[key];
            core.markFieldAsTouched("", key);
          }
        }

        if (Object.keys(actuallyChanged).length > 0) {
          setChangedFields((c) => ({ ...c, ...actuallyChanged }));
        }

        if (core.shouldValidateLive) {
          core.runValidation(newForm);
        }

        return newForm;
      });
    },
    [core]
  );

  const getChangedFields = useCallback(() => changedFields, [changedFields]);
  const hasChanges = Object.keys(changedFields).length > 0;

  /*   const reset = useCallback(
    (values?: T) => {
      core.setData(values ?? initialFormRef.current);
      setChangedFields({});
      core.resetForm();
    },
    [core]
  ); */

  const reset = useCallback(
    (values?: T) => {
      if (values) {
        core.resetWith(values);
      } else {
        core.resetWith(initialFormRef.current);
      }

      setChangedFields({});
    },
    [core]
  );

  return {
    form: core.data as T,
    errors: core.errors as Record<string, string>,
    hasSubmitted: core.hasSubmitted,
    hasChanges,
    getChangedFields,

    setForm: core.setData,
    handleFieldChange,
    handleMultipleFieldsChange,
    canSubmit: core.triggerValidation,
    reset,
    submit:
      <R>(handler: (changed: Partial<T>) => Promise<R>) =>
      async (): Promise<R | undefined> => {
        if (!core.triggerValidation()) return;

        if (!hasChanges) {
          toast.error("تغییری اعمال نشده است.", {icon: "👀"});
          window.scrollTo({ top: 85, behavior: "smooth" });
          return;
        }

        return handler(getChangedFields());
      },
  };
};
