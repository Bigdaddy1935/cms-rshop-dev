"use client";

import { toast } from "react-hot-toast";

type FetcherProps = {
  route: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: HeadersInit;
  loadingText?: string;
  successText?: string;
  credentials?: "same-origin" | "omit" | "include";
  isActiveToast?: boolean
};

export const fetcher = async ({
  route,
  method = "GET",
  body,
  headers,
  loadingText = "در حال ارسال...",
  successText,
  credentials = "include",
  isActiveToast = false
}: FetcherProps): Promise<{ data: any; ok: boolean }> => {

  const toastId = isActiveToast && toast.loading(loadingText);
  const isFormData = body instanceof FormData;

  try {
    //const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${route}`, {
    const res = await fetch(`/api${route}`, {
      method,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
      credentials
    });
    
    const data = await res.json();
    toastId && toast.dismiss(toastId);

    if (!res.ok) {
      toast.error(data.message || "خطا در عملیات");
      return { data: null, ok: false };
    }

    isActiveToast && toast.success(successText || data.message || "عملیات موفق");
    return { data: data.data, ok: true };
  } catch (err: any) {
    toastId && toast.dismiss(toastId);
    toast.error(err.message || "خطای اتصال به سرور");
    return { data: null, ok: false };
  }
};
