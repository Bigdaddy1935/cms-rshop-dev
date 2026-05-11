"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * هوک برای مدیریت مقدار جستجو در URL با debounce داخلی
 * 
 * @param key نام پارامتر در URL (مثل "search" یا "q")
 * @param delay تاخیر debounce (به میلی‌ثانیه، دیفالت: 500ms)
 */
export function useDebouncedUrlSearch(key = "search", delay = 500) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // مقدار اولیه از URL
  const initial = useMemo(() => searchParams.get(key) ?? "", [searchParams, key]);

  const [value, setValue] = useState(initial);

  // اگر URL عوض شد (مثلاً از بیرون)، مقدار local رو sync کن
  useEffect(() => setValue(initial), [initial]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const p = new URLSearchParams(searchParams.toString());
      const current = searchParams.get(key) ?? "";

      const changed = current.trim() !== value.trim();
      if (!changed) return;

      if (value.trim()) {
        p.set(key, value.trim());
      } else {
        p.delete(key);
      }

      // در صورت تغییر سرچ، page رو ریست کن
      if (p.has("page")) p.set("page", "1");

      router.replace(`${pathname}?${p.toString()}`, { scroll: false });
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, key, router, pathname, searchParams]);

  return { value, setValue };
}
