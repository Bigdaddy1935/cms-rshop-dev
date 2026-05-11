// location.service.ts
import { fetcher } from "@/core/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

// دریافت لیست استان‌ها
export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: () => {
      return fetcher({
        route: "/location/provinces",
        isActiveToast: false,
      });
    },
  });
};

// دریافت لیست شهرها بر اساس استان
export const useGetCities = (provinceId?: number) => {
  return useQuery({
    queryKey: ["cities", provinceId],
    queryFn: () => {
      if (!provinceId) throw new Error("Province ID is required");
      
      return fetcher({
        route: `/location/city/${provinceId}`,
        isActiveToast: false,
      });
    },
    enabled: !!provinceId,
  });
};