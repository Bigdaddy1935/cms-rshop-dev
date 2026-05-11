"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomerCard from "@/components/features/store/customers/CustomerCard";
import AddNewCustomerModal from "@/components/features/store/customers/modals/AddNewCustomerModal";
// Icons
import { HiOutlineUserGroup } from "react-icons/hi2";
import {
  useGetAdminMe,
  useGetAdminRoles,
  useGetStaffs,
} from "@/core/hooks/api/useUsersAdmin";
import UserProfileForm from "@/components/features/store/customers/UserProfileForm/UserProfileForm";
import { GrUserAdmin } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";
import BaseCard from "@/components/ui/BaseCard";

const Permissions = () => {
  const { data: admin, isLoading: isLoadingAdminData } = useGetAdminMe();

  const isAdminUser =
    admin?.data?.role === "super_admin" || admin?.data?.role === "admin";

  const { data: adminRoles } = useGetAdminRoles({ admin: isAdminUser });
  const { data: staffs, isLoading: isLoadingStaffsData } = useGetStaffs({
    admin: isAdminUser,
  });

  const isExistItems = !!staffs?.data?.length;

  return (
    <div className="flex flex-col gap-4">
      <UserProfileForm
        headerProps={{
          title: "دسترسی ها",
          icon: <GrUserAdmin />,
          textBtn: "ویرایش",
          redirect: `/admin/store/permissions/staff?edit_id=${admin?.data?.id}&role=${isAdminUser}`,
          btnIcon: <GoArrowUpRight />,
        }}
        info={admin?.data}
        isLoading={isLoadingAdminData}
        hiddenUserAddress
        disableEditForm
        disableShowIsActive
      />
      {admin?.data?.role === "super_admin" || admin?.data?.role === "admin" ? (
        <>
          <UnifiedCard
            headerProps={{
              title: "اطلاعات کارمندان",
              icon: <HiOutlineUserGroup className="text-2xl" />,
              children: <AddNewCustomerModal />,
            }}
            isLoading={isLoadingStaffsData}
            isExistItems={isExistItems}
            childrenClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:justify-items-stretch"
          >
            {staffs?.data?.map((user: any) => (
              <CustomerCard
                key={user.id}
                infos={user}
                redirect={`/admin/store/permissions/staff?edit_id=${user?.id}&staff_role=${user?.role}&role=${isAdminUser}`}
              />
            ))}
          </UnifiedCard>
          <BaseCard
            CardHeaderProps={{
              title: "لیست دسترسی ها",
              icon: <GrUserAdmin />,
              tooltipTitle: "مدیریت سطوح دسترسی",
              tooltipDescription:
                "در این بخش می‌توانید نقش‌های تعریف‌شده در سیستم و مجموعه دسترسی‌های هر کدام را مشاهده و بررسی کنید.",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminRoles?.data?.map((item: any) => (
                <div
                  key={item.role}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-800 capitalize">
                      {item.role.replaceAll("_", " ")}
                    </h3>

                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {item.permissions.length} دسترسی
                    </span>
                  </div>

                  {/* Permissions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.permissions.map(
                      (permission: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2"
                        >
                          <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                          <span className="truncate">{permission}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          </BaseCard>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Permissions;
