import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useUploadSliderImages = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      fetcher({
        route: "/admin/upload-slider-images/upload",
        method: "POST",
        body: data,
        isActiveToast: true,
        loadingText: "در حال آپلود تصویر...",
        successText: "تصویر با موفقیت آپلود شد",
      }),
  });
};
