import { fetcher } from "@/core/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetHome = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => fetcher({ route: "/home/admin" }),
  });
};
