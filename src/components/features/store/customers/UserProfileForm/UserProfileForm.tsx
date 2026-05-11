"use client";

import { useForm } from "@/core/hooks/common/form/useForm";
import { myProfileValidation } from "./my-profile-validate";
import { useEffect } from "react";
import TextInput from "@/components/ui/inputs/TextInput";
import PhoneInput from "@/components/shared/PhoneInput";
import EmailInput from "@/components/shared/EmailInput";
import FormActionButtons from "@/components/common/FormActionButtons";
import UserBoxUploader from "@/components/media/UserBoxUploader";
import BaseCard from "@/components/ui/BaseCard";
import IconBadge from "@/components/common/IconBadge";
import { rolePersian } from "@/core/types/enum-fa";
import { Role } from "@/core/types";
import { HiOutlineLightningBolt } from "react-icons/hi";
import MyInfoSidebar from "./MyInfoSidebar";
import { handleMutation } from "@/core/utils/mutationHelper";
import { CardHeaderProps } from "@/components/common/Card/CardHeader";
import ToggleSection from "@/components/shared/Toggle/ToggleSection";
import { useUpdateUser } from "@/core/hooks/api/users/useUsers";
import UserAddressModal from "../modals/UserAddressModal";
import UserAddressCard from "./UserAddress/UserAddressCard";
import { UserAddress } from "../customer.types";
import { useRouter } from "next/navigation";
import { useSizeGuideUpload } from "@/core/hooks/api/useSizeGuide";
import { TbBuildingEstate } from "react-icons/tb";
import SelectBox from "@/components/ui/inputs/SelectBox";
import { useUpdateStaff } from "@/core/hooks/api/useUsersAdmin";
import { useQueryParam } from "@/core/hooks/common/useQueryParam";
import EmptyStateContainer from "@/components/common/EmptyStateContainer";

type MyProfileFormProps = {
  info: any;
  isLoading: boolean;
  headerProps: CardHeaderProps;
  disableEditForm?: boolean;
  hiddenUserAddress?: boolean;
  disableShowIsActive?: boolean;
  disableShowPermissions?: boolean;
};

const initialProfileForm = {
  avatar_url: null,
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
  is_active: true,
  is_phone_verified: false,
  addresses: [],
  role: "user",
};

const UserProfileForm: React.FC<MyProfileFormProps> = ({
  info,
  isLoading,
  headerProps,
  hiddenUserAddress = false,
  disableEditForm = false,
  disableShowIsActive = false,
  disableShowPermissions = false,
}) => {
  const router = useRouter();
  const roles = useQueryParam(["role", "staff_role"]);

  const { mutate: updateUser, isPending: isPendingUser } = useUpdateUser();
  const { mutate: updateStaff, isPending: isPendingStaff } = useUpdateStaff();
  const { mutateAsync: uploadMedias, isPending: isPendingUpload } =
    useSizeGuideUpload();

  const { form, errors, handleFieldChange, setForm, submit } = useForm(
    initialProfileForm,
    {
      onValidate: myProfileValidation,
      runValidationOnChange: true,
    },
  );

  useEffect(() => {
    info && setForm(info);
  }, [info]);

  const handleSubmit = submit(async (changed) => {
    let imageUrl = typeof form.avatar_url === "string" ? form.avatar_url : "";

    if ((form.avatar_url as any) instanceof File) {
      const formData = new FormData();
      formData.append("files", form.avatar_url as any);

      const uploadRes = (await handleMutation(() => uploadMedias(formData), {
        returnResponse: true,
      })) as any;

      if (!uploadRes.ok) return false;
      imageUrl = uploadRes.data?.[0]?.url ?? null;
    }

    const { email, first_name, is_active, last_name, phone, role } = form;

    const dataToSend = {
      first_name,
      last_name,
      phone,
      role,
      avatar_url: imageUrl,
      email: !email?.length ? null : email,
      is_active,
    };

    if (roles.role && roles.role !== "user") {
      updateStaff(
        { data: dataToSend, id: info?.id },
        {
          onSuccess: (res) => {
            res.ok && router.push("/admin/store/permissions");
          },
        },
      );
    } else {
      updateUser(
        { data: dataToSend, id: info?.id },
        {
          onSuccess: (res) => {
            res.ok && router.push("/admin/store/customers");
          },
        },
      );
    }
  });

  return (
    <BaseCard
      CardHeaderProps={headerProps}
      isLoading={isLoading}
      bodyClassName="!cursor-default px-4 pb-4"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ستون اصلی فرم */}
        <div
          className={`w-4/6 flex-1 flex flex-col gap-6 pt-5 ${!hiddenUserAddress ? "pb-4" : ""} ${disableEditForm ? "pointer-events-none" : ""}`}
        >
          <div className="flex items-center gap-2.5">
            <UserBoxUploader
              defaultImg={form.avatar_url}
              onFile={(file) => handleFieldChange("avatar_url", file as any)}
            />
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <IconBadge
                  icon={HiOutlineLightningBolt}
                  circleClassName="bg-sky-100 !w-6 !h-6"
                  iconClassName="text-sky-600 -top-[43px] -left-[6px] w-6"
                />
                <p>
                  {info?.role?.length
                    ? rolePersian[info.role as Role]
                    : "نقش کاربر"}
                </p>
              </div>
              <div>
                <p className="text-nowrap text-gray-600 text-[13px]">
                  پنل مدیریت فروشگاه
                </p>
              </div>
            </div>
          </div>

          {/* Editable fields */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <TextInput
              label=""
              placeholder="نام را وارد کنید"
              value={form.first_name || ""}
              onChange={(v) => handleFieldChange("first_name", v)}
              isRequired
              inputAlign="right"
              allowEnglishOnly={false}
              errorMessage={errors.first_name}
            />
            <TextInput
              label=""
              placeholder="نام خانوادگی را وارد کنید"
              value={form.last_name || ""}
              onChange={(v) => handleFieldChange("last_name", v)}
              isRequired
              inputAlign="right"
              allowEnglishOnly={false}
              errorMessage={errors.last_name}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <PhoneInput
              label=""
              placeholder="09XXXXXXXXXX"
              value={form.phone || ""}
              onChange={(v) => handleFieldChange("phone", v)}
              isRequired
            />
            <EmailInput
              label=""
              value={form.email || ""}
              onChange={(v) => handleFieldChange("email", v)}
              errorMessage={errors.email}
            />
          </div>
          {!disableShowIsActive ? (
            <div className="grid grid-cols-2 items-center gap-4">
              {roles?.role === "true" && roles?.staff_role?.length ? (
                <SelectBox
                  label=""
                  value={form.role}
                  onChange={(val) => {
                    handleFieldChange("role", val);
                  }}
                  options={Object.entries(rolePersian).map(([key, title]) => ({
                    key,
                    title,
                  }))}
                  placeholder="انتخاب وضعیت"
                />
              ) : (
                ""
              )}
              <ToggleSection
                title={`وضعیت حساب`}
                initialMode={form.is_active}
                onChange={(val) => handleFieldChange("is_active", val)}
              />
            </div>
          ) : (
            ""
          )}
          {!disableEditForm ? (
            <div className="flex items-center justify-end">
              <div className="-ml-4">
                <FormActionButtons
                  onSubmit={handleSubmit}
                  isLoading={
                    isLoading ||
                    isPendingStaff ||
                    isPendingUser ||
                    isPendingUpload
                  }
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <MyInfoSidebar
          info={info}
          disableExtraData={disableShowIsActive}
          disableShowPermissions={disableShowPermissions}
        />
      </div>
      {!hiddenUserAddress ? (
        form.addresses ? (
          <EmptyStateContainer
            title="آدرس های کاربر"
            icon={TbBuildingEstate}
            initial={form.addresses}
            modal={<UserAddressModal userId={info?.id} />}
          >
            <div className="w-full flex flex-col gap-4 pt-6">
              {form?.addresses?.map((addr: UserAddress, index: number) => (
                <UserAddressCard key={index} address={addr} userId={info?.id} />
              ))}
            </div>
          </EmptyStateContainer>
        ) : (
          <EmptyStateContainer
            title="آدرس های کاربر"
            icon={TbBuildingEstate}
            modal={<UserAddressModal userId={info?.id} />}
          />
        )
      ) : (
        ""
      )}
    </BaseCard>
  );
};

export default UserProfileForm;
