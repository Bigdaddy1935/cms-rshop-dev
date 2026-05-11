"use client";

import { useEffect, useMemo, useState } from "react";
import AutocompleteInput, {
  Option,
} from "@/components/ui/inputs/AutocompleteInput";
import { useGetProvinces, useGetCities } from "@/core/hooks/api/useLocation";

type Props = {
  province?: string; // شناسه استان (ورودی از والد)
  onCityId?: (id: number) => void; // شناسه شهر (ورودی از والد)
  cityId?: number;
  city?: string;
  onChange: (values: { province: string; city: string }) => void; // خروجی: عنوان استان و شهر
};

const ProvinceCitySelector = ({
  province,
  city,
  onCityId,
  onChange,
  cityId,
}: Props) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<
    number | undefined
  >(undefined);
  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    city ? city : undefined,
  );
  const [selectedCityId, setSelectedCityId] = useState<number | undefined>(
    cityId ? cityId : undefined,
  );

  const { data: provincesData, isLoading: provincesLoading } =
    useGetProvinces();
  const { data: citiesData, isLoading: citiesLoading } =
    useGetCities(selectedProvinceId);

  useEffect(() => {
    if (!provincesData?.data) {
      return;
    }

    const findedProvince: Record<string, any> = provincesData?.data.find(
      (prov: any) => prov.title === province,
    );

    if (findedProvince) {
      setSelectedProvinceId(Number(findedProvince?.id));
    }
  }, [province, provincesData]);

  useEffect(() => {
    if (!cityId || !citiesData?.data) {
      return;
    }

    const findedCity = citiesData?.data.find(
      (city: any) => city.city_id === cityId,
    );

    if (findedCity) {
      setSelectedCityId(Number(findedCity?.city_id));
    }
  }, [cityId, citiesData]);

  const provinceOptions: Option[] = useMemo(() => {
    if (!provincesData?.data) return [];
    return provincesData.data.map((province: any) => ({
      id: String(province.id),
      title: province.title,
    }));
  }, [provincesData]);

  const cityOptions: Option[] = useMemo(() => {
    if (!citiesData?.data) return [];
    return citiesData.data.map((city: any) => ({
      id: String(city.city_id),
      title: city.title,
    }));
  }, [citiesData]);

  // اطلاع‌رسانی به والد با ارسال عنوان به جای شناسه
  useEffect(() => {
    // پیدا کردن عنوان استان متناسب با selectedProvinceId
    const provinceTitle =
      selectedProvinceId !== undefined
        ? provinceOptions.find((opt) => opt.id === String(selectedProvinceId))
            ?.title || ""
        : "";

    // پیدا کردن عنوان شهر متناسب با selectedCity
    const cityTitle =
      selectedCity !== undefined
        ? cityOptions.find((opt) => opt.id === String(selectedCity))?.title ||
          ""
        : "";

    onChange({
      province: provinceTitle,
      city: cityTitle,
    });
  }, [selectedProvinceId, selectedCity, provinceOptions, cityOptions]);

  console.log("selectedCityId =>", selectedCityId);

  if (provincesLoading || citiesLoading) {
    return (
      <div className="flex items-center justify-center gap-4 h-30 w-full bg-slate-100 animate-pulse rounded-lg p-6">
        درحال لود...
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <AutocompleteInput
        label="استان"
        placeholder="انتخاب استان"
        options={provinceOptions}
        selectedId={
          selectedProvinceId !== undefined
            ? String(selectedProvinceId)
            : undefined
        }
        onChange={(id: string | null) => {
          const numId = id ? Number(id) : undefined;
          setSelectedProvinceId(numId);
          setSelectedCity(undefined); // ریست شهر هنگام تغییر استان
        }}
      />

      <AutocompleteInput
        label="شهر"
        placeholder="انتخاب شهر"
        options={cityOptions}
        selectedId={
          selectedCityId !== undefined ? String(selectedCityId) : undefined
        }
        onChange={(id: string | null) => {
          const numId = id ? id : undefined;

          const findedCity = citiesData?.data.find(
            (city: any) => city.city_id === Number(id),
          );
          console.log("DDDDDDDDDDDD", findedCity);

          setSelectedCity(String(numId));
          onCityId?.(Number(findedCity?.city_id));
        }}
      />
    </div>
  );
};

export default ProvinceCitySelector;
