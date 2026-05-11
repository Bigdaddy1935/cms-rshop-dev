import { ListQueryParams } from "@/core/types";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// دریافت لیست آیکون‌ها
export const useGetIcons = ({
  page = 1,
  search,
  limit = 20,
}: ListQueryParams) => {
  return useQuery({
    queryKey: ["all-icons", page, search, limit],
    queryFn: () => {
      const qs = buildListQuery({
        page,
        limit,
        search,
      });

      return fetcher({
        route: `/icons?${qs}`,
        isActiveToast: false,
      });
    },
  });
};

// دریافت جزئیات یک آیکون
export const useGetIcon = (id: number) => {
  return useQuery({
    queryKey: ["icon", id],
    queryFn: () => {
      return fetcher({
        route: `/icons/${id}`,
        isActiveToast: false,
      });
    },
    enabled: !!id,
  });
};

// ایجاد آیکون جدید
export const useCreateIcon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      return fetcher({
        route: "/icons",
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "آیکون با موفقیت اضافه شد",
        loadingText: "در حال افزودن آیکون",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-icons"] });
    },
  });
};

// ویرایش آیکون
export const useUpdateIcon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => {
      return fetcher({
        route: `/icons/${id}`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "آیکون با موفقیت ویرایش شد",
        loadingText: "در حال ویرایش آیکون",
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["all-icons"] });
      queryClient.invalidateQueries({ queryKey: ["icon", variables.id] });
    },
  });
};

// حذف آیکون
export const useDeleteIcon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: number }) =>
      fetcher({
        route: `/icons/${id}`,
        method: "DELETE",
        successText: "آیکون با موفقیت حذف شد",
        loadingText: "در حال حذف آیکون",
        isActiveToast: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-icons"] });
    },
  });
};
