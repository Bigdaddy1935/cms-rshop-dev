import { buildListQuery } from "@/core/utils/buildListQuery";
import { fetcher } from "@/core/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

const GetAnalyticSliders = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: ["analytics-sliders", page],
    queryFn: () => {
      const qs = buildListQuery({ page, limit: 10 });
      return fetcher({
        route: `/home/analytics/sliders?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

const GetAnalyticBanners = ({ page }: { page: number }) => {
  return useQuery({
    queryKey: ["analytics-banners", page],
    queryFn: () => {
      const qs = buildListQuery({ page, limit: 10 });
      return fetcher({
        route: `/home/analytics/banners?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

export { GetAnalyticSliders, GetAnalyticBanners };
