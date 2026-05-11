"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PromotionType } from "@/core/hooks/api/usePromotions";

type HooksShape = {
  useGetOne: (id?: number) => any;
  useCreate: () => any;
  useUpdate: (id: number) => any;
};

type PromotionRouteWrapperProps = {
  Hooks: HooksShape;
  Provider?: React.ComponentType<any>;
  providerProps?: any;
  formType?: PromotionType;
  children: (opts: {
    initialData: any;
    isLoading: boolean;
    resetSignal: number;
    handleSubmit: (payload: any) => void;
    setResetSignal: (n: number | ((p: number) => number)) => void;
    setCtxKey: (n: number | ((p: number) => number)) => void;
  }) => React.ReactNode;
};

const PromotionRouteWrapper: React.FC<PromotionRouteWrapperProps> = ({
  Provider,
  providerProps,
  children,
  Hooks,
  formType,
}) => {
  const router = useRouter();
  const searchParams = usePathname();
  const params = useSearchParams();
  const id = params?.get("edit_id") ? Number(params.get("edit_id")) : undefined;

  const [resetSignal, setResetSignal] = useState(0);
  const [ctxKey, setCtxKey] = useState(0);

  const { data, isLoading } = Hooks.useGetOne(id);
  const createHook = Hooks.useCreate();
  const updateHook = Hooks.useUpdate(id || 0);

  const handleSubmit = async (payload: any) => {
    if (id) {
      const resp = await updateHook.mutateAsync(payload);
      resp.ok &&
        router.push(
          `/admin/store/promotions/${searchParams.slice(
            24,
            searchParams.lastIndexOf("/")
          )}`
        );
    } else {
      const resp = await createHook.mutateAsync(payload);
      if (resp.ok) {
        setCtxKey((p) => p + 1);
        setResetSignal((p) => p + 1);
      }
    }
  };

  const content = children({
    initialData: data?.data,
    isLoading,
    resetSignal,
    handleSubmit,
    setResetSignal,
    setCtxKey,
  });

  if (Provider) {
    return (
      <Provider key={ctxKey} {...providerProps}>
        {content}
      </Provider>
    );
  }

  return content;
};

export default PromotionRouteWrapper;
