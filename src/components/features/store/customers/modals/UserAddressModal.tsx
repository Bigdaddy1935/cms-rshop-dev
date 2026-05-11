"use client";

import React, { useState, useEffect } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import RadioGroup from "@/components/ui/RadioGroup";
import ProvinceCitySelector from "@/components/shared/ProvinceCitySelector";
import { Checkbox } from "@heroui/react";
import { LuMapPinHouse } from "react-icons/lu";
import Textarea from "@/components/ui/inputs/Textarea";
import {
  useAddNewUserAddress,
  useUpdateUserAddress,
} from "@/core/hooks/api/users/useAddressUsers";
import { handleMutation } from "@/core/utils/mutationHelper";
import { UserAddress } from "../customer.types";

type UserAddressModalProps = {
  btnAdd?: React.ReactNode;
  userId: number;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultData?: UserAddress;
};

const UserAddressModal: React.FC<UserAddressModalProps> = ({
  btnAdd = null,
  userId,
  isOpen,
  onOpenChange,
  defaultData,
}) => {
  const [form, setForm] = useState<UserAddress>({
    city: "",
    city_id: 0,
    province: "",
    address_line: "",
    plaque: "",
    unit: "",
    address_name: null,
    recipient_name: null,
    recipient_phone: null,
    postal_code: "",
    is_self: true,
    is_primary: false,
  });

  const { mutateAsync: addAddressMutation, isPending: isPendingCreate } =
    useAddNewUserAddress(userId);
  const { mutateAsync: updateAddressMutation, isPending: isPendingUpdate } =
    useUpdateUserAddress();

  useEffect(() => {
    setFormHandler();
  }, [defaultData]);

  useEffect(() => {
  }, [form]);

  const handleSubmit = () => {
    const payload = {
      ...form,
      recipient_name: form.is_self ? null : form.recipient_name,
    };

    if (defaultData && updateAddressMutation) {
      return handleMutation(
        () =>
          updateAddressMutation({
            data: payload,
            addressId: defaultData.id || 0,
          }),
        {
          resetForm,
        },
      );
    } else {
      return handleMutation(() => addAddressMutation(payload), {
        resetForm,
      });
    }
  };

  const resetForm = () => {
    setForm({
      city: "",
      province: "",
      city_id: 0,
      address_line: "",
      plaque: "",
      unit: "",
      address_name: null,
      recipient_name: null,
      recipient_phone: null,
      postal_code: "",
      is_self: true,
      is_primary: false,
    });
  };

  const setFormHandler = () => {
    if (defaultData) {
      setForm(defaultData);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      triggerProps={
        defaultData
          ? null
          : {
              title: "+ افزودن",
              className: "bg-secondary-light text-secondary",
            }
      }
      onCancel={() => {
        !userId ? resetForm() : setFormHandler();
      }}
      title={defaultData ? "ویرایش آدرس" : "ثبت آدرس جدید"}
      confirmText={defaultData ? "بروزرسانی" : "ثبت آدرس"}
      cancelText="لغو"
      onConfirm={handleSubmit}
      size="lg"
      trigger={isOpen === undefined ? btnAdd : undefined}
      icon={<LuMapPinHouse />}
      isConfirmDisabled={isPendingCreate || isPendingUpdate}
    >
      <div className="flex flex-col gap-6">
        <RadioGroup
          label="نوع تحویل‌گیرنده"
          value={form.is_self ? "self" : "other"}
          onChange={(val) =>
            setForm((prev) => ({ ...prev, is_self: val === "self" }))
          }
          options={[
            { label: "برای خود کاربر", value: "self" },
            { label: "برای شخص دیگر", value: "other" },
          ]}
          radioSize="sm"
          orientation="horizontal"
          groupClassName="flex items-center gap-4"
        />

        {!form.is_self && (
          <div className="flex items-center gap-2">
            <TextInput
              label="نام تحویل‌گیرنده"
              value={form.recipient_name || ""}
              onChange={(val) => setForm({ ...form, recipient_name: val })}
              placeholder="مثلاً: علی رضایی"
              isRequired
              allowEnglishOnly={false}
              inputAlign="right"
            />
            <PhoneInput
              value={form.recipient_phone || ""}
              onChange={(val) => setForm({ ...form, recipient_phone: val })}
              label="شماره تماس تحویل‌گیرنده"
              placeholder="09xxxxxxxxx"
              isRequired
            />
          </div>
        )}

        <ProvinceCitySelector
          province={form.province}
          city={form.city}
          cityId={form.city_id}
          onChange={({ province, city }) => {
            if (province.length && city.length) {
              setForm((prev) => ({ ...prev, province, city }));
            }
          }}
          onCityId={(id) => setForm({ ...form, city_id: id })}
        />

        <div className="flex items-center gap-2">
          <TextInput
            label="نام آدرس"
            placeholder="مثلا محل کار یا خانه و..."
            value={form.address_name || ""}
            onChange={(val) => setForm({ ...form, address_name: val })}
            allowEnglishOnly={false}
          />

          <TextInput
            label="کد پستی"
            placeholder="مثلاً: 1234567890"
            minLength={10}
            maxLength={10}
            inputAlign="left"
            allowChars={false}
            value={form.postal_code}
            onChange={(val) => setForm({ ...form, postal_code: val })}
          />
        </div>

        <div className="flex items-center gap-2">
          <TextInput
            label="پلاک"
            placeholder="شماره پلاک"
            allowChars={false}
            value={form.plaque}
            onChange={(val) => setForm({ ...form, plaque: val })}
            allowEnglishOnly={false}
          />

          <TextInput
            label="واحد"
            placeholder="شماره واحد"
            allowChars={false}
            value={form.unit}
            onChange={(val) => setForm({ ...form, unit: val })}
          />
        </div>

        <Textarea
          value={form.address_line}
          onChange={(value) => setForm({ ...form, address_line: value })}
          placeholder="آدرس کامل را وارد کنید"
        />

        <Checkbox
          isSelected={form.is_primary}
          onValueChange={(val) => setForm({ ...form, is_primary: val })}
        >
          <span className="text-sm">آدرس اصلی</span>
        </Checkbox>
      </div>
    </BaseModal>
  );
};

export default UserAddressModal;
