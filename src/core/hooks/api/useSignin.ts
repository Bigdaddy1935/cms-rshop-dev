import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useRequestOtpMutation = () => {
  return useMutation({
    mutationFn: (phone: string) =>
      fetcher({
        route: "/auth/request-otp",
        method: "POST",
        body: { identifier: phone },
        isActiveToast: true,
        loadingText: "در حال ارسال کد",
        successText: "کد با موفقیت ارسال شد"
      }),
  });
};

export const useVerifyOtpMutation = () => {
  return useMutation({
    mutationFn: ({ phone, code }: { phone: string; code: string }) =>
      fetcher({
        route: "/auth/verify-otp",
        method: "POST",
        body: { identifier: phone, code },
        isActiveToast: true,
        loadingText: "درحال بررسی...",
        successText: "خوش اومدی به ادمین پنل"
      }),
  });
};
