import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useQueryParam = (keys: string | string[]) => {
  const searchParams = useSearchParams();

  return useMemo(() => {
    if (Array.isArray(keys)) {
      const result: Record<string, string | null> = {};

      keys.forEach((key) => {
        result[key] = searchParams.get(key);
      });

      return result as any;
    }

    return searchParams.get(keys);
  }, [searchParams, keys]);
};
