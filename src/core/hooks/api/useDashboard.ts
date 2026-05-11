"use client";

import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useGetDashboardStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => {
      return fetcher({
        route: "/admin/dashboard/stats",
        isActiveToast: false,
      });
    },
  });
};
