"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useFormCore } from "./useFormCore";
import toast from "react-hot-toast";

export const useListForm = <T extends Record<string, any>>(
  initialItems: T[] = [],
  options: {
    runValidationOnChange?: boolean;
    onValidate?: (items: T[]) => Record<string, string>[];
    idKey?: keyof T | null;
  } = {}
) => {
  const { idKey = null, ...coreOptions } = options;
  const core = useFormCore(initialItems, coreOptions);

  const initialItemsRef = useRef(initialItems);
  const [changedMap, setChangedMap] = useState<Record<string, any>>({});

  useEffect(() => {
    initialItemsRef.current = initialItems;
  }, [initialItems]);

  const updateItem = useCallback(
    (index: number, patch: Partial<any>) => {
      core.setData((prev: any[]) => {
        const next = [...prev];
        const newItem = { ...next[index], ...patch };
        next[index] = newItem;

        Object.keys(patch).forEach((field) => {
          core.markFieldAsTouched(index, field);
        });

        if (idKey && newItem[idKey] != null) {
          setChangedMap((c) => ({
            ...c,
            [String(newItem[idKey])]: newItem,
          }));
        }

        if (core.shouldValidateLive) {
          core.runValidation(next);
        }

        return next;
      });
    },
    [core, idKey]
  );

  const reset = useCallback(
    (items?: any[]) => {
      if (items) {
        core.resetWith(items);
        initialItemsRef.current = items;
      } else {
        core.resetWith(initialItemsRef.current);
      }
      setChangedMap({});
    },
    [core]
  );

  const setList = useCallback(
    (nextItems: any[]) => {
      core.resetWith(nextItems);
      initialItemsRef.current = nextItems;
      setChangedMap({});
    },
    [core]
  );

  const hasChanges = Object.keys(changedMap).length > 0;
  const getChangedItems = useCallback(
    () => Object.values(changedMap),
    [changedMap]
  );

  return {
    items: core.data,
    errors: core.errors as Record<string, string>[],
    hasSubmitted: core.hasSubmitted,
    updateItem,
    setList,
    getChangedItems,
    canSubmit: core.triggerValidation,
    reset,
    submit: (handler: (changed: any[]) => void) => () => {
      if (!core.triggerValidation()) return;
      if (!hasChanges) {
        toast.error("هیچ تغییری اعمال نشده است");
        window.scrollTo({ top: 85, behavior: "smooth" });
        return;
      }
      handler(getChangedItems());
    },
  };
};
