import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ProductSortBy = Array<
  | "id:ASC"
  | "id:DESC"
  | "name:ASC"
  | "name:DESC"
  | "price:ASC"
  | "price:DESC"
  | "stock:ASC"
  | "stock:DESC"
>;

export const useGetProducts = ({
  page = 1,
  filter,
  search,
  sortBy,
  limit = 10,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["all-products", page, filter, search, sortBy, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        sortBy,
        search,
        filter,
      });

      return fetcher({
        route: `/product?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

export const useGetOneProduct = (id?: number) => {
  return useQuery({
    queryKey: ["one-product", id],
    queryFn: () =>
      fetcher({
        route: `/product/${id}`,
        isActiveToast: false,
      }),
    enabled: !!id,
  });
};

export const useProductUpload = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return fetcher({
        route: "/product/upload",
        method: "POST",
        body: data,
        isActiveToast: false,
      });
    },
  });
};

export const useProductCreate = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return fetcher({
        route: "/product",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText:
          "محصول با موفقیت ایجاد شد. لطفا ادامه پروسه رو دنبال کنید تا محصول نهایی شود",
        loadingText: "در حال ایجاد محصول",
      });
    },
  });
};

export const useProductUpdate = (id: number | null) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => {
      return fetcher({
        route: `/product/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "محصول با موفقیت آپدیت شد.",
        loadingText: "در حال آپدیت محصول",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
    },
  });
};

export const useDeleteProduct = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      fetcher({
        route: `/product/${id}`,
        method: "DELETE",
        successText: "محصول با موفقیت حذف شد",
        loadingText: "در حال حذف محصول",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product", id] });

      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-products",
      });
    },
  });
};

export const useDeleteGroupProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ids }: { ids: number[] }) =>
      fetcher({
        route: "/product/bulk",
        method: "DELETE",
        body: { ids },
        successText: "محصول های انتخاب شده با موفقیت حذف شدند",
        loadingText: "در حال حذف محصولات انتخاب شده",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-products",
      });
    },
  });
};

export const useBulkUpdateProducts = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/product/update/bulk",
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "محصول های انتخاب شده با موفقیت آپدیت شدند",
        loadingText: "در حال آپدیت محصولات انتخاب شده",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["one-product"] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "all-products",
      });
    },
  });
};
