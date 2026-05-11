/* 🧩 Category Attributes Start */

import { fetcher } from "@/core/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddNewCategoryAttribute = (
  attributeId: number | undefined,
  categoryId: number | undefined,
  groupedId: number | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      fetcher({
        route: "/category-attribute",
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      if (groupedId) {
        queryClient.invalidateQueries({
          queryKey: ["all-attribute", groupedId],
        });
      }
      if (categoryId) {
        queryClient.invalidateQueries({
          queryKey: ["category-attributes", categoryId],
        });
      }
      if (attributeId) {
        queryClient.invalidateQueries({
          queryKey: ["attribute-values", attributeId],
        });
      }
    },
  });
};

/* 🧩 Category Attributes End */
