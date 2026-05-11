"use client";

import React from "react";
import BaseCard from "@/components/ui/BaseCard";
import DeleteButton from "@/components/shared/DeleteButton";
import CardRows from "@/components/shared/CardRows";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Customer } from "./customer.types";
import UserAddressModal from "./modals/UserAddressModal";
import { ActionButton } from "@/components/ui/buttons/ActionButton";
import { useDeleteUser } from "@/core/hooks/api/users/useUsers";
import { HiOutlineUser } from "react-icons/hi2";
import { TbCurrentLocation } from "react-icons/tb";
import { rolePersian } from "@/core/types/enum-fa";
import { Role } from "@/core/types";

type Props = {
  infos: Customer;
  disableAction?: boolean;
  showDeselectIcon?: boolean;
  onDelete?: (id: number) => void;
  redirect?: string;
};

const CustomerCard: React.FC<Props> = ({
  infos,
  disableAction = false,
  showDeselectIcon = false,
  redirect,
  onDelete,
}) => {
  const {
    id,
    first_name,
    last_name,
    phone,
    email,
    avatar_url,
    is_active,
    is_phone_verified,
  } = infos;

  const deleteMutation = useDeleteUser(id);

  const rowItems = [
    {
      label: "نام کامل ",
      value: `${first_name || "نام"} ${last_name || "و نام خوانوادگی"}`,
    },
    {
      label: "شماره تماس",
      value: phone || "-",
      bgLabel: is_phone_verified ? "text-green-600" : "text-red-600",
    },
    {
      label: "نقش کاربر",
      value: rolePersian[infos.role as Role] || "عادی",
    },
    { label: "ایمیل", value: email || "—" },
    {
      label: "وضعیت حساب",
      value: is_active ? "فعال" : "غیرفعال",
      bgLabel: is_active ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <BaseCard
      bodyClassName="w-full hover-reveal-parent group"
      redirect={
        !disableAction
          ? redirect
            ? redirect
            : `/admin/store/customers/create?edit_id=${id}`
          : undefined
      }
    >
      <div className="relative flex flex-col items-center mb-4">
        <div>
          {avatar_url ? (
            <div className="w-20 h-20 overflow-hidden rounded-full">
              <img
                src={avatar_url}
                alt={`${first_name || "-"} ${last_name || "-"}`}
                className="w-20 h-20 group-hover:!w-32 group-hover:h-32 transition-all rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center">
              <HiOutlineUser className="text-gray-400 text-3xl" />
            </div>
          )}
        </div>

        <div className="hover-reveal-child flex flex-col-reverse items-center gap-1.5">
          {!disableAction && (
            <>
              <UserAddressModal
                userId={id}
                btnAdd={<ActionButton icon={<TbCurrentLocation size={19} />} />}
              />
              <DeleteButton onDelete={() => deleteMutation.mutate()} />
            </>
          )}
          {showDeselectIcon && (
            <ActionButton
              icon={<AiOutlineCloseCircle size={18} />}
              onClick={() => {
                /* e.preventDefault();
              e.stopPropagation(); */
                onDelete?.(id);
              }}
            />
          )}
        </div>
      </div>

      <CardRows items={rowItems} disableOddBg disableCol />
    </BaseCard>
  );
};

export default CustomerCard;
