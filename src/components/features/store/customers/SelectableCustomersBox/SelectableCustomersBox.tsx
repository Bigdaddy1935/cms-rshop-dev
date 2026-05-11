"use client";

import React, { useEffect } from "react";
import CustomerCard from "../CustomerCard";
import UsersSelectionModal from "./CustomersSelectionModal";
import { useCustomersSelection } from "./CustomersSelectionContext";
import { Customer } from "../customer.types";
import { HiOutlineUserGroup } from "react-icons/hi2";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

type Props = {
  onChange?: (userIds: number[]) => void;
  initialUsers?: Customer[];
  error?: boolean;
};

const InnerSelectableUsersBox: React.FC<{
  onChange?: (ids: number[]) => void;
  error?: boolean;
}> = ({ onChange, error }) => {
  const { selectedCustomers, removeCustomer } = useCustomersSelection();
  const isFirstRender = React.useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    onChange?.(selectedCustomers.map((u) => u.id));
  }, [selectedCustomers]);

  return (
    <EmptyStateContainer
      title="کاربران انتخاب شده"
      icon={HiOutlineUserGroup}
      initial={selectedCustomers}
      modal={<UsersSelectionModal />}
      error={error}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedCustomers.map((user: Customer) => (
          <CustomerCard
            key={user.id}
            showDeselectIcon
            disableAction
            infos={user}
            onDelete={removeCustomer}
          />
        ))}
      </div>
    </EmptyStateContainer>
  );
};

const SelectableCustomersBox: React.FC<Props> = ({ onChange, error }) => {
  return <InnerSelectableUsersBox onChange={onChange} error={error} />;
};

export default SelectableCustomersBox;
