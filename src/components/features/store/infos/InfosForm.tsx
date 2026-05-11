"use client";

import FormActionButtons from "@/components/common/FormActionButtons";
import BaseCard from "@/components/ui/BaseCard";
import TextInput from "@/components/ui/inputs/TextInput";
import { useForm } from "@/core/hooks/common/form/useForm";
import { BsShop } from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { TiSocialLinkedin } from "react-icons/ti";
import { validateInfos } from "./infos-validation";
import { useInfosCreate } from "@/core/hooks/api/useSeting";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlinePhoneIncoming } from "react-icons/hi";
import EmailInput from "@/components/shared/EmailInput";
import PhoneInput from "@/components/shared/PhoneInput";

const initialInfos = {
  shop_card_number: "",
  shop_card_holder: "",
  shop_bank_name: "",
  shop_iban: "",

  social_instagram: "",
  social_telegram: "",
  social_eitaa: "",
  social_rubika: "",
  social_whatsapp: "",
  social_bale: "",

  contact_email: "",
  contact_phone: "",
};

type InfosFormProps = {
  isLoading: boolean;
  data: any;
};

const InfosForm: React.FC<InfosFormProps> = ({ isLoading, data }) => {
  const router = useRouter();
  const { mutate: createInfos } = useInfosCreate();

  const [logo, setLogo] = useState<File | null | string>(null);

  const { form, errors, setForm, submit, handleFieldChange } = useForm(
    initialInfos,
    {
      onValidate: validateInfos,
      runValidationOnChange: true,
    },
  );

  useEffect(() => {
    if (logo as File) handleUploadLogo();
  }, [logo]);

  useEffect(() => {
    if (data?.length) {
      const settings = data.filter(
        (setting: any) => setting.key !== "homepage_layout_type",
      );
      setForm(apiArrayToFormObject(settings));
    }
  }, [data]);

  const handleSubmit = submit(async () => {
    const payload = formObjectToApiArray(form);

    createInfos(payload, {
      onSuccess: (res: any) => {
        if (res?.ok) router.push("/admin/store");
      },
    });
  });

  const apiArrayToFormObject = (data: any[]) => {
    return data.reduce(
      (acc, item) => {
        acc[item.key] = item.value ?? "";
        return acc;
      },
      {} as Record<string, string>,
    );
  };

  const formObjectToApiArray = (form: Record<string, string>) => {
    return Object.entries(form).map(([key, value]) => ({
      key,
      value,
      category: key.startsWith("social_")
        ? "social"
        : key.startsWith("contact_")
          ? "contact"
          : "payment",
    }));
  };

  const handleUploadLogo = () => {
    
  }

  return (
    <BaseCard
      CardHeaderProps={{
        title: "اطلاعات کلی فروشگاه",
        icon: <BsShop className="w-6 h-6" />,
        tooltipTitle: "اطلاعات حیاتی فروشگاه",
        tooltipDescription:
          "در این بخش اطلاعات ضروری برای تنظیمات فروشگاه و شبکه‌های اجتماعی را وارد کنید. این اطلاعات برای تکمیل فرآیند پرداخت و ارتباط با کاربران استفاده خواهد شد.",
      }}
      wrapperContents
      isLoading={isLoading}
    >
      {/* <ImageBoxUploader
        textBtn={logo ? "تغییر لوگو" : "+ افزودن لوگو"}
        title="لوگوی وبسایت"
        changeStatusFile={logo}
        defaultImg={logo}
        onFile={setLogo}
        errorMessage={errors.logo}
      /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="نام کامل دارنده کارت"
          placeholder="وارد کنید..."
          value={form.shop_card_holder}
          onChange={(val) => handleFieldChange("shop_card_holder", val)}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.shop_card_holder}
        />
        {/*         <Input
          style={{ direction: "ltr" }}
          labelPlacement="outside"
          label="شماره تلفن مدیر"
          placeholder="09XX-XXX-XXXX"
          type="tel"
          inputMode="tel"
          variant="flat"
          isRequired
          maxLength={11}
          value={""}
          onChange={() => {}}
          errorMessage={errors.phone}
        /> */}
        <TextInput
          label="نام بانک"
          placeholder="وارد کنید..."
          value={form.shop_bank_name}
          onChange={(val) => handleFieldChange("shop_bank_name", val)}
          isRequired
          inputAlign="right"
          allowEnglishOnly={false}
          errorMessage={errors.shop_bank_name}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label="شماره کارت فروشگاه"
          placeholder="0000_0000_0000_0000"
          maxLength={16}
          value={form.shop_card_number}
          inputAlign="left"
          onChange={(val) => handleFieldChange("shop_card_number", val)}
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.shop_card_number}
        />
        <TextInput
          label="شماره شبا فروشگاه"
          placeholder="0000_0000_0000_0000_0000_0000"
          maxLength={30}
          value={form.shop_iban}
          inputAlign="left"
          onChange={(val) => handleFieldChange("shop_iban", val)}
          endContent="IR"
          isRequired
          allowEnglishOnly={false}
          errorMessage={errors.shop_iban}
        />
      </div>

      <div className="flex items-center cursor-auto text-gray-700 gap-6 justify-between border-b py-3 my-2">
        <p>تماس با ما</p>
        <HiOutlinePhoneIncoming className="text-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PhoneInput
          label="تلفن پشتیبانی"
          value={form.contact_phone}
          onChange={(val) => handleFieldChange("contact_phone", val)}
        />

        <EmailInput
          label="ایمیل پشتیبانی"
          value={form.contact_email}
          onChange={(val) => handleFieldChange("contact_email", val)}
        />
      </div>

      <div className="flex items-center cursor-auto text-gray-700 gap-6 justify-between border-b py-3 my-2">
        <p>شبکه های اجتماعی فروشگاه</p>
        <TiSocialLinkedin className="text-2xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label={
            <div className="flex items-center gap-2">
              <LuInstagram className="text-xl text-pink-500" />
              <span>اینستاگرام</span>
            </div>
          }
          placeholder="لینک کامل اینستاگرام"
          type="text"
          /* endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://instagram.com
              </span>
            </div>
          } */
          value={form.social_instagram}
          allowSpecialChars
          onChange={(val) => handleFieldChange("social_instagram", val)}
          inputAlign="left"
        />

        <TextInput
          label={
            <div className="flex items-center gap-2">
              <FaTelegram className="text-xl text-sky-500" />
              <span>تلگرام</span>
            </div>
          }
          placeholder="لینک کامل تلگرام"
          type="text"
          /* endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">https://t.me</span>
            </div>
          } */
          allowSpecialChars
          value={form.social_telegram}
          onChange={(val) => handleFieldChange("social_telegram", val)}
          inputAlign="left"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/eitaa.png" className="w-5" alt="eitaa" />
              <span>ایتا</span>
            </div>
          }
          placeholder="لینک کامل ایتا"
          type="text"
          /* endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://eitaa.com
              </span>
            </div>
          } */
          allowSpecialChars
          value={form.social_eitaa}
          onChange={(val) => handleFieldChange("social_eitaa", val)}
          inputAlign="left"
        />

        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/rubika.png" className="w-5" alt="rubika" />
              <span>روبیکا</span>
            </div>
          }
          allowSpecialChars
          placeholder="لینک کامل روبیکا"
          type="text"
          /* endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://rubika.ir
              </span>
            </div>
          } */
          value={form.social_rubika}
          onChange={(val) => handleFieldChange("social_rubika", val)}
          inputAlign="left"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/whatsapp.png" className="w-5" alt="whatsap" />
              <span>واتساپ</span>
            </div>
          }
          allowSpecialChars
          placeholder="لینک کامل واتساپ"
          type="text"
          /*  endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">
                https://whatsapp.com
              </span>
            </div>
          } */
          value={form.social_whatsapp}
          onChange={(val) => handleFieldChange("social_whatsapp", val)}
          inputAlign="left"
        />

        <TextInput
          label={
            <div className="flex items-center gap-2">
              <img src="/images/balle.jpg" className="w-5" alt="balle" />
              <span>بله</span>
            </div>
          }
          allowSpecialChars
          placeholder="لینک کامل بله"
          type="text"
          /* endContent={
            <div className="pointer-events-none flex items-center pr-4">
              <span className="text-default-400 text-sm">https://ble.ir</span>
            </div>
          } */
          value={form.social_bale}
          onChange={(val) => handleFieldChange("social_bale", val)}
          inputAlign="left"
        />
      </div>

      <FormActionButtons
        cancelHref="/admin/store"
        onSubmit={handleSubmit}
        submitText="ثبت تغیرات"
      />
    </BaseCard>
  );
};

export default InfosForm;
