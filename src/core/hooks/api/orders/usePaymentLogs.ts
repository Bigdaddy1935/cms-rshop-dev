import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { ListQueryParams } from "@/core/types";

export const useGetPaymentLogs = ({
  page = 1,
  limit = 10,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["payment-logs", page, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
      });

      return fetcher({
        route: `/payment?${qs}`,
        isActiveToast: false,
      });
    },
  });
};
