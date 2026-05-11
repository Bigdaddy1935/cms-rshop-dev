"use client";

import React from "react";
import SelectableCard from "@/components/ui/SelectableCard";
import UserAddressCard from "./UserAddressCard";
import { UserAddress } from "../../customer.types";
import UserAddressModal from "../../modals/UserAddressModal";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";
import { TbBuildingEstate } from "react-icons/tb";

type Props = {
  userId: number;
  addresses: UserAddress[];
  selectedAddressId?: number;
  onChange: (addressId: number) => void;
  addNewButton?: React.ReactNode;
  error?: boolean;
};

const SelectableUserAddressCard: React.FC<Props> = ({
  addresses,
  selectedAddressId,
  onChange,
  addNewButton,
  userId,
  error,
}) => {
  return (
    <EmptyStateContainer
      title="آدرس های کاربر"
      icon={TbBuildingEstate}
      initial={addresses}
      modal={<UserAddressModal userId={userId} />}
      error={error}
    >
      <div className="w-full flex flex-col gap-4 pt-6">
        {addresses.map((address) => (
          <SelectableCard
            key={address.id}
            id={address.id}
            selectedIds={selectedAddressId ? [selectedAddressId] : []}
            onSelectionChange={(id, selected) => {
              if (selected) onChange(id as number);
            }}
          >
            <UserAddressCard address={address} userId={userId} disableAction/>
          </SelectableCard>
        ))}
      </div>
    </EmptyStateContainer>
  );
};

export default SelectableUserAddressCard;
