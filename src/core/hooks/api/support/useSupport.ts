import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildQueryString } from "@/core/utils/buildListQuery";

type SupportFilter = {
  is_visible?: string[]; // $eq:1|0
  requires_preparation?: string[]; // $eq:1|0
  category_id?: string[]; // $eq:...
  brand_id?: string[]; // $eq:...
  price?: string[]; // $gte/$lte
  stock?: string[]; // $gte/$lte
  weight?: string[]; // $gte/$lte
  discount_amount?: string[]; // $gte/$lte
  discount_percent?: string[]; // $gte/$lte
  created_at?: string[]; // $gte/$lte/$btw
};

export type SupportSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "updatedAt:ASC"
  | "updatedAt:DESC"
>;

type UseGetSortParams = {
  page?: number;
  filter?: SupportFilter;
  search?: string;
  searchBy?: string[];
  sortBy?: SupportSortBy;
  limit?: number;
};

export const useGetSupportList = ({
  page = 1,
  filter,
  search,
  sortBy,
  limit = 13,
}: UseGetSortParams) => {
  return useQuery({
    queryKey: ["support-list", page, filter, search, sortBy, limit],
    queryFn: () => {
      const params: Record<string, any> = { page, limit: limit };

      if (filter) {
        for (const key in filter) {
          const values = filter[key as keyof SupportFilter];
          if (values) {
            params[`filter.${key}`] = values;
          }
        }
      }

      if (search) params.search = search;
      if (sortBy) params.sortBy = sortBy;

      const queryString = buildQueryString(params);
      return fetcher({
        route: `/admin/support?${queryString}`,
        isActiveToast: false,
      });
    },
  });
};


export const useGetSupportDetail = (id?: number) => {
  return useQuery({
    queryKey: ["support-detail", id],
    queryFn: () =>
      fetcher({
        route: `/admin/support/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};


export const useReplySupport = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      fetcher({
        route: `/admin/support/${id}/reply`,
        method: "POST",
        body: { content },
        isActiveToast: true,
        successText: "پیام با موفقیت ارسال شد",
        loadingText: "در حال ارسال پیام",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-detail", id] });
      queryClient.invalidateQueries({ queryKey: ["support-list"] });
    },
  });
};