import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/core/utils/fetcher";

export const useAddNewUserAddress = (userId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Record<string, any>) =>
      fetcher({
        route: `/addresses/${userId}/add`,
        method: "POST",
        body: data,
        isActiveToast: true,
        successText: "آدرس با موفقیت اضافه شد",
        loadingText: "در حال افزودن آدرس...",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses", userId] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["one-user"] });
    },
  });
};

export const useUpdateUserAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      addressId,
    }: {
      data: Record<string, any>;
      addressId: number;
    }) =>
      fetcher({
        route: `/addresses/${addressId}/update`,
        method: "PATCH",
        body: data,
        isActiveToast: true,
        successText: "آدرس با موفقیت بروزرسانی شد",
        loadingText: "در حال بروزرسانی آدرس...",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      queryClient.invalidateQueries({ queryKey: ["one-user"] });
    },
  });
};
