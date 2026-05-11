"use client";

import { useSearchParams } from "next/navigation";
import UserProfileForm from "@/components/features/store/customers/UserProfileForm/UserProfileForm";
import { HiOutlineUser } from "react-icons/hi2";
import { useGetStaff } from "@/core/hooks/api/useUsersAdmin";

const StaffDetailPage = () => {
  const params = useSearchParams();
  const userId = params ? Number(params.get("edit_id")) : 0;

  const { data: staff, isLoading } = useGetStaff({
    admin: true,
    id: userId,
  });

  return (
    <UserProfileForm
      headerProps={{
        title: "اطلاعات کارمند",
        icon: <HiOutlineUser />,
        showIconInActionSlot: true
      }}
      info={staff?.data}
      isLoading={isLoading}
      hiddenUserAddress
      disableShowPermissions
    />
  );
};

export default StaffDetailPage;
