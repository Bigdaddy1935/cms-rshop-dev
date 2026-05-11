"use client";

import React, { useState } from "react";
import BaseCard from "@/components/ui/BaseCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { LuMapPinned, LuUser } from "react-icons/lu";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { HiOutlineOfficeBuilding, HiOutlineMail } from "react-icons/hi";
import UserAddressModal from "../../modals/UserAddressModal";
import { FiPhoneOutgoing } from "react-icons/fi";
import { UserAddress } from "../../customer.types";

type Props = {
  userId: number;
  address: UserAddress;
  disableAction?: boolean;
};

const UserAddressCard: React.FC<Props> = ({
  address,
  userId,
  disableAction = false,
}) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  return (
    <>
      <BaseCard
        wrapperContents
        onClick={() => {
          if (!disableAction) {
            setIsAddressModalOpen(true);
          }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="text-gray-800 font-semibold">
            {address.address_name}
          </h4>
          {address.is_primary && (
            <StatusBadge
              isActive
              activeText="پیش‌فرض"
              size="sm"
              className="rounded-full"
            />
          )}
        </div>

        {/* Quick Info Row style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {/* شهر و استان */}
          <div className="flex items-center gap-2">
            <LuMapPinned className="text-gray-400 text-lg" />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-1">شهر و استان</p>
              <p className="text-[14px] font-medium truncate">
                {address.city}, {address.province}
              </p>
            </div>
          </div>

          {/* آدرس */}
          <div className="flex items-center gap-2">
            <MdOutlineMapsHomeWork className="text-gray-400 text-lg" />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-1">آدرس</p>
              <p className="text-[14px] font-medium truncate max-w-44">
                {address.address_line}
              </p>
            </div>
          </div>

          {/* پلاک و واحد */}
          <div className="flex items-center gap-2">
            <HiOutlineOfficeBuilding className="text-gray-400 text-lg" />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-1">پلاک / واحد</p>
              <p className="text-[14px] font-medium">
                پلاک {address.plaque}
                {address.unit ? `, واحد ${address.unit}` : ""}
              </p>
            </div>
          </div>

          {/* کد پستی */}
          <div className="flex items-center gap-2">
            <HiOutlineMail className="text-gray-400 text-lg" />
            <div className="flex flex-col">
              <p className="text-xs text-gray-500 mb-1">کد پستی</p>
              <p className="text-[14px] font-medium">{address.postal_code}</p>
            </div>
          </div>

          {/* نام تحویل‌گیرنده */}
          {address.recipient_name && (
            <div className="flex items-center gap-2">
              <LuUser className="text-gray-400 text-lg" />
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 truncate mb-1">
                  نام تحویل‌گیرنده
                </p>
                <p className="text-[14px] font-medium">
                  {address.recipient_name}
                </p>
              </div>
            </div>
          )}

          {/* شماره تحویل‌گیرنده */}
          {address.recipient_phone && (
            <div className="flex items-center gap-2">
              <FiPhoneOutgoing className="text-gray-400 text-lg" />
              <div className="flex flex-col">
                <p className="text-xs text-gray-500 mb-1">شماره تحویل‌گیرنده</p>
                <p className="text-[14px]">{address.recipient_phone}</p>
              </div>
            </div>
          )}
        </div>
      </BaseCard>

      <UserAddressModal
        userId={userId}
        defaultData={address}
        isOpen={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
      />
    </>
  );
};

export default UserAddressCard;
