import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildQueryString } from "@/core/utils/buildListQuery";
import { ReviewSortBy } from "@/components/features/store/comments/review-types";

type GetReviewsParams = {
  page?: number;
  search?: string;
  sortBy?: ReviewSortBy;
  filter?: Record<string, string[]>;
};

export type UpdateReviewStatusPayload = {
  isApproved: boolean;
};

export const useGetReviews = ({
  page = 1,
  search,
  sortBy,
  filter,
}: GetReviewsParams = {}) => {
  return useQuery({
    queryKey: ["all-reviews", page, search, sortBy, filter],
    queryFn: () => {
      const params: Record<string, any> = { page };
      if (search) params.search = search;
      if (sortBy) params.sortBy = sortBy;

      if (filter) {
        for (const key in filter) {
          const values = filter[key];
          if (values?.length) params[`filter.${key}`] = values;
        }
      }

      const qs = buildQueryString(params);
      return fetcher({ route: `/admin/reviews?${qs}`, isActiveToast: false });
    },
  });
};

export const useUpdateReviewStatus = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateReviewStatusPayload) =>
      fetcher({
        route: `/admin/reviews/${id}/status`,
        method: "PATCH",
        body: data,
        isActiveToast: false,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
      qc.invalidateQueries({ queryKey: ["one-review", id] });
    },
  });
};

export const useDeleteReview = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      fetcher({
        route: `/admin/reviews/${id}`,
        method: "DELETE",
        isActiveToast: true,
        loadingText: "در حال حذف کامنت...",
        successText: "کامنت با موفقیت حذف شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
    },
  });
};
