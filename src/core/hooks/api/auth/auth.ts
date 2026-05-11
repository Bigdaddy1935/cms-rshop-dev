import { fetcher } from "@/core/utils/fetcher";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: () =>
      fetcher({
        route: "/auth/logout",
        method: "POST",
        isActiveToast: true,
        loadingText: "در حال خروج",
        successText: "با موفقیت خارج شدید",
      }),
  });
};
