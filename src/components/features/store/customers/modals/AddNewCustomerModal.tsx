"use client";

import { useState } from "react";
import BaseModal from "@/components/ui/modals/BaseModal";
import TextInput from "@/components/ui/inputs/TextInput";
import EmailInput from "@/components/shared/EmailInput";
import PhoneInput from "@/components/shared/PhoneInput";
import { handleMutation } from "@/core/utils/mutationHelper";
import { HiOutlineUser } from "react-icons/hi2";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { Role } from "@/core/types";
import { rolePersian } from "@/core/types/enum-fa";
import { useCreateUser } from "@/core/hooks/api/useUsersAdmin";

const AddNewCustomerModal: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    phoneValid: true,
    email: "",
    role: "user" as Role,
  });

  const { mutateAsync: addNewUser, isPending } = useCreateUser();

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      phoneValid: true,
      email: "",
      role: "user",
    });
  };

  const addNewUserHandler = async () => {
    if (!form.phoneValid) return false;

    const newUser = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      phone: form.phone,
      email: form.email ? form.email.trim() : undefined,
      role: form.role
    };
    return handleMutation(() => addNewUser(newUser), { resetForm });
  };

  return (
    <BaseModal
      title="افزودن کاربر جدید"
      confirmText="تأیید و ثبت"
      cancelText="لغو"
      onConfirm={addNewUserHandler}
      onCancel={resetForm}
      size="lg"
      triggerProps={{
        className: "bg-secondary-light text-secondary",
        title: "+ افزودن",
      }}
      icon={<HiOutlineUser />}
      isConfirmDisabled={isPending}
    >
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <TextInput
            label="نام"
            placeholder="نام را وارد کنید"
            value={form.firstName}
            onChange={(v) => setForm({ ...form, firstName: v })}
            isRequired
            allowEnglishOnly={false}
          />

          <TextInput
            label="نام خانوادگی"
            placeholder="نام خانوادگی را وارد کنید"
            value={form.lastName}
            onChange={(v) => setForm({ ...form, lastName: v })}
            isRequired
            allowEnglishOnly={false}
          />
        </div>

        <div className="flex items-center gap-2">
          <PhoneInput
            value={form.phone}
            onChange={(val, valid) =>
              setForm({ ...form, phone: val, phoneValid: valid })
            }
          />

          <EmailInput
            value={form.email}
            onChange={(val) => setForm({ ...form, email: val })}
          />
        </div>
        <SelectBox
          label="نقش کاربر"
          value={form.role}
          onChange={(val) => setForm({ ...form, role: val as Role })}
          options={Object.entries(rolePersian).map(([key, title]) => ({
            key,
            title,
          }))}
          placeholder="انتخاب وضعیت"
        />
      </div>
    </BaseModal>
  );
};

export default AddNewCustomerModal;
