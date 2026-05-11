"use client";

import React, { useMemo } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import { TbUsers } from "react-icons/tb";
import UnifiedCard from "@/components/common/Card/UnifiedCard";
import CustomersFilter from "../Filter/CustomersFilter";
import CustomerCard from "../CustomerCard";
import AddNewCustomerModal from "../modals/AddNewCustomerModal";
import SelectableCard from "@/components/ui/SelectableCard";
import { useGetAllUsers, UserSortBy } from "@/core/hooks/api/users/useUsers";
import { useListQueryParams } from "@/core/hooks/common/useListQueryParams";
import { useCustomersSelection } from "./CustomersSelectionContext";
import { HiOutlineUserGroup } from "react-icons/hi2";
import SearchFilterCard from "@/components/common/Card/SearchFilterCard";

const UsersSelectionModal: React.FC = () => {
  const { page, sortBy, search, filter, isFilteredView } =
    useListQueryParams<UserSortBy[number]>();
  const { selectedCustomers, addCustomer, removeCustomer } =
    useCustomersSelection();

  const { data: users, isLoading } = useGetAllUsers({
    page,
    filter,
    search,
    sortBy,
  });

  const isExistItems = !!users?.data?.items?.length;

  // فقط id های انتخاب شده
  const selectedIds = useMemo(
    () => selectedCustomers.map((u) => u.id),
    [selectedCustomers],
  );

  const handleSelectionChange = (user: any, selected: boolean) => {
    if (selected) addCustomer(user);
    else removeCustomer(user.id);
  };

  return (
    <BaseModal title="انتخاب کاربران" icon={<HiOutlineUserGroup />} size="4xl" confirmActionClose>
      <UnifiedCard
        searchFilter={
          <SearchFilterCard
            searchPlaceholder="جستجو نام، شماره تماس یا ایمیل کاربر..."
            showSearchBar
            disableWrapperStyle
          />
        }
        headerProps={{
          title: "لیست کاربران",
          children: <AddNewCustomerModal />,
        }}
        isLoading={isLoading}
        isExistItems={isExistItems}
        searchInp={isFilteredView}
        meta={users?.data?.meta}
        childrenClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        disableWrapperStyle
      >
        {users?.data?.items?.map((user: any) => (
          <SelectableCard
            key={user.id}
            id={user.id}
            selectedIds={selectedIds}
            onSelectionChange={(id, selected) =>
              handleSelectionChange(user, selected)
            }
          >
            <CustomerCard infos={user} disableAction />
          </SelectableCard>
        ))}
      </UnifiedCard>
    </BaseModal>
  );
};

export default UsersSelectionModal;
