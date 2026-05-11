import { fetcher } from "@/core/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

/* =========================
   👤 RBAC کاربر لاگین‌شده
========================= */
export const useGetAdminRbacMe = () => {
  return useQuery({
    queryKey: ["admin-rbac-me"],
    queryFn: () =>
      fetcher({
        route: "/admin/rbac/me",
        isActiveToast: false,
      }),
  });
};

/* =========================
   📚 Sidebar بر اساس نقش
========================= */
export const useGetRbacSidebar = ({
  role,
  enabled = true,
}: {
  role: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["admin-rbac-sidebar", role],
    queryFn: () =>
      fetcher({
        route: `/admin/rbac/sidebar/${role}`,
        isActiveToast: false,
      }),
    enabled: !!role && enabled,
  });
};

/* =========================
   🔐 Permissions بر اساس نقش
========================= */
export const useGetRbacPermissions = ({
  role,
  enabled = true,
}: {
  role: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["admin-rbac-permissions", role],
    queryFn: () =>
      fetcher({
        route: `/admin/rbac/permissions/${role}`,
        isActiveToast: false,
      }),
    enabled: !!role && enabled,
  });
};

/* =========================
   👑 لیست همه نقش‌ها (سوپرادمین)
========================= */
export const useGetAllRbacRoles = ({
  enabled = true,
}: {
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["admin-rbac-roles-all"],
    queryFn: () =>
      fetcher({
        route: "/admin/rbac/roles/all",
        isActiveToast: false,
      }),
    enabled,
  });
};
