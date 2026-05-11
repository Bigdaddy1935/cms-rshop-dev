"use client";

import { useSearchParams } from "next/navigation";
import { useGetOneUser } from "@/core/hooks/api/users/useUsers";
import UserProfileForm from "@/components/features/store/customers/UserProfileForm/UserProfileForm";
import { HiOutlineUser } from "react-icons/hi2";

const UserDetailPage = () => {
  const params = useSearchParams();
  const userId = params ? Number(params.get("edit_id")) : 0;
  const { data: oneUser, isLoading } = useGetOneUser(userId);

  return (
    <UserProfileForm
      headerProps={{
        title: "اطلاعات کاربر",
        icon: <HiOutlineUser />,
        tooltipTitle: "مدیریت اطلاعات کاربر",
        tooltipDescription: `در این بخش می‌توانید اطلاعات حساب کاربری را مشاهده و ویرایش کنید. امکان به‌روزرسانی مشخصات فردی، اطلاعات تماس و افزودن یا مدیریت آدرس‌ها وجود دارد. تغییرات پس از ثبت، در سیستم ذخیره خواهد شد.`,
      }}
      info={oneUser?.data}
      isLoading={isLoading}
      disableShowPermissions
    />
  );
};

export default UserDetailPage;
