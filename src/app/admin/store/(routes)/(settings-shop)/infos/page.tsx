"use client";

// Icons
import InfosForm from "@/components/features/store/infos/InfosForm";
import { useGetSettings } from "@/core/hooks/api/useSeting";

const Infos = () => {
  const { data: settings, isPending } = useGetSettings();
  return <InfosForm data={settings?.data} isLoading={isPending} />;
};

export default Infos;
