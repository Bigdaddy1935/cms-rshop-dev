"use client";

// Components
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomersFilter from "@/components/features/store/customers/Filter/CustomersFilter";
import CustomerCard from "@/components/features/store/customers/CustomerCard";
import AddNewCustomerModal from "@/components/features/store/customers/modals/AddNewCustomerModal";
// Icons
import { UserSortBy, useGetAllUsers } from "@/core/hooks/api/users/useUsers";
import { FiUsers } from "react-icons/fi";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { HiOutlineUserGroup } from "react-icons/hi2";

const CustomersList = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<UserSortBy[number]>();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!users?.data?.items?.length;

  return (
    <UnifiedCard
      searchFilter={<CustomersFilter />}
      headerProps={{
        title: "لیست کاربران",
        icon: <HiOutlineUserGroup className="text-2xl" />,
        children: <AddNewCustomerModal />,
        tooltipTitle: "مدیریت کاربران",
        tooltipDescription:
          "در این بخش می‌توانید تمامی کاربران ثبت‌شده در فروشگاه را مشاهده و مدیریت کنید. امکان افزودن کاربر جدید، ویرایش اطلاعات کاربران موجود و دسترسی به جزئیات آن‌ها فراهم است.",
      }}
      isLoading={isLoading}
      isExistItems={isExistItems}
      searchInp={isFilteredView}
      meta={users?.data?.meta}
      childrenClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center md:justify-items-stretch"
    >
      {users?.data?.items?.map((user: any) => (
        <CustomerCard key={user.id} infos={user} />
      ))}
    </UnifiedCard>
  );
};

export default CustomersList;
