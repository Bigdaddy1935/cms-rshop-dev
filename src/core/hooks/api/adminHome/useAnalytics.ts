import { useQuery, useMutation } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

// Track click
export const useTrackClick = () => {
  return useMutation({
    mutationFn: ({ type, id }: { type: string; id: string }) =>
      fetcher({ route: `/api/home/analytics/track/${type}/${id}`, method: "POST" }),
  });
};

// Get stats
export const useGetSlidersAnalytics = () => {
  return useQuery({
    queryKey: ["analytics-sliders"],
    queryFn: () => fetcher({ route: "/api/home/analytics/sliders" }),
  });
};

export const useGetBannersAnalytics = () => {
  return useQuery({
    queryKey: ["analytics-banners"],
    queryFn: () => fetcher({ route: "/api/home/analytics/banners" }),
  });
};

export const useGetElementAnalytics = (type?: string, id?: string) => {
  return useQuery({
    queryKey: ["analytics-element", type, id],
    queryFn: () => fetcher({ route: `/api/home/analytics/${type}/${id}` }),
    enabled: !!type && !!id,
  });
};

export const useGetElementAnalyticsRange = (
  type?: string,
  id?: string,
  start?: string,
  end?: string
) => {
  return useQuery({
    queryKey: ["analytics-element-range", type, id, start, end],
    queryFn: () =>
      fetcher({
        route: `/api/home/analytics/${type}/${id}/range?start=${start}&end=${end}`,
      }),
    enabled: !!type && !!id && !!start && !!end,
  });
};
