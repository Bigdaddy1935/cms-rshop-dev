"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

/* ---------------------- Review Payment (Approve / Reject) ---------------------- */
export const useReviewCardToCardPayment = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      paymentId: number;
      status: string;
      admin_note?: string;
    }) =>
      fetcher({
        route: `/admin/card-to-card/${data.paymentId}/review`,
        method: "POST",
        body: { status: data.status, admin_note: data.admin_note },
        isActiveToast: true,
        loadingText: "در حال بررسی پرداخت...",
        successText: "رسید بررسی شد",
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["one-order"] });
      qc.invalidateQueries({ queryKey: ["card-to-card-payments"] });
      qc.invalidateQueries({ queryKey: ["card-to-card-payment"] });
      qc.invalidateQueries({ queryKey: ["card-to-card-pending"] });
    },
  });
};
