// services/promotions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";
import { buildListQuery } from "@/core/utils/buildListQuery";
import { ListQueryParams } from "@/core/types";

export type PromotionType =
  | "coupon"
  | "flash_deal"
  | "free_shipping"
  | "first_order"
  | "next_order_reward";

// Factory function
export const createPromotionHooks = (
  type: PromotionType,
  queryKeyPrefix: string
) => {
  const useGetList = ({
    page = 1,
    filter,
    search,
    sortBy,
    limit = 10,
  }: ListQueryParams) => {
    return useQuery({
      queryKey: [`${queryKeyPrefix}-list`, page, filter, search, sortBy, limit],
      queryFn: () => {
        const qs = buildListQuery({
          page,
          limit,
          sortBy,
          search,
          filter,
        });
        
        return fetcher({
          route: `/admin/promotions?${qs}&filter.type=${type}`,
          isActiveToast: false,
        });
      },
    });
  };

  const useGetOne = (id?: number) => {
    return useQuery({
      queryKey: [queryKeyPrefix + "-one", id],
      queryFn: () =>
        fetcher({ route: `/admin/promotions/${id}`, isActiveToast: false }),
      enabled: !!id,
    });
  };

  const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: any) =>
        fetcher({
          route: "/admin/promotions",
          method: "POST",
          body: { ...data, type },
          isActiveToast: true,
          loadingText: `در حال ایجاد ${queryKeyPrefix}...`,
          successText: `${queryKeyPrefix} با موفقیت ایجاد شد`,
        }),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  const useUpdate = (id: number) => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (data: any) =>
        fetcher({
          route: `/admin/promotions/${id}`,
          method: "PUT",
          body: data,
          isActiveToast: true,
          loadingText: `در حال بروزرسانی ${queryKeyPrefix}...`,
          successText: `${queryKeyPrefix} با موفقیت بروزرسانی شد`,
        }),
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-one", id] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
      mutationFn: (id: number) =>
        fetcher({
          route: `/admin/promotions/${id}`,
          method: "DELETE",
          isActiveToast: true,
          loadingText: `در حال حذف ${queryKeyPrefix}...`,
          successText: `${queryKeyPrefix} با موفقیت حذف شد`,
        }),
      onSuccess: (_data, id) => {
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-list"] });
        qc.invalidateQueries({ queryKey: [queryKeyPrefix + "-one", id] });
        qc.invalidateQueries({ queryKey: ["admin-promotions-active"] });
      },
    });
  };

  return {
    useGetList,
    useGetOne,
    useCreate,
    useUpdate,
    useDelete,
  };
};

/* =========================
   نمونه استفاده:
   ========================= */
export const FlashDealHooks = createPromotionHooks("flash_deal", "flash-deal");
export const FreeShippingHooks = createPromotionHooks(
  "free_shipping",
  "free-shipping"
);
export const CouponHooks = createPromotionHooks("coupon", "coupon");
export const FirstOrderHooks = createPromotionHooks(
  "first_order",
  "first-order"
);
export const NextOrderRewardHooks = createPromotionHooks(
  "next_order_reward",
  "next-order-reward"
);
