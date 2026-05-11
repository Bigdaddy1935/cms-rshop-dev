"use client";

import { useGetSettings } from "@/core/hooks/api/useSeting";
import { Alert, Button } from "@heroui/react";
import Link from "next/link";

type StoreOnboardingProps = {
  className?: string;
};

const StoreOnboarding: React.FC<StoreOnboardingProps> = ({ className }) => {
  const { data: settings, isLoading } = useGetSettings();

  const requiredKeys = [
    "shop_bank_name",
    "shop_card_holder",
    "shop_card_number",
    "shop_iban",
    "contact_email",
    "contact_phone",
  ];

  if (isLoading) {
    return null;
  }

  if (!settings?.data || settings.data.length === 0) {
    return (
      <div className={`mb-6 ${className}`}>
        <Alert
          color={"warning"}
          title={"برای نمایش فروشگاه باید اطلاعات فروشگاه را کامل وارد کنید"}
          className="shadow-md"
          endContent={
            <Button
              color="warning"
              size="sm"
              variant="flat"
              as={Link}
              href="/admin/store/infos"
            >
              تکمیل اطلاعات فروشگاه
            </Button>
          }
        />
      </div>
    );
  }

  const isComplete = requiredKeys.every((key) => {
    const item = settings.data.find((setting: any) => setting.key === key);
    return item && item.value && item.value.trim() !== "";
  });

  if (!isComplete) {
    return (
      <div className={`mb-6 ${className}`}>
        <Alert
          color={"warning"}
          title={"برای نمایش فروشگاه باید اطلاعات فروشگاه را کامل وارد کنید"}
          className="shadow-md"
          endContent={
            <Button
              color="warning"
              size="sm"
              variant="flat"
              as={Link}
              href="/admin/store/infos"
            >
              تکمیل اطلاعات فروشگاه
            </Button>
          }
        />
      </div>
    );
  }

  return null;
};

export default StoreOnboarding;
