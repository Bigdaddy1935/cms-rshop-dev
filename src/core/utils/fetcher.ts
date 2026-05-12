"use client";

import { toast } from "react-hot-toast";

export class FetcherError extends Error {
  status: number;
  payload: any;
  constructor(message: string, status: number, payload: any) {
    super(message);
    this.name = "FetcherError";
    this.status = status;
    this.payload = payload;
  }
}

type FetcherProps = {
  route: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: HeadersInit;
  loadingText?: string;
  successText?: string;
  credentials?: "same-origin" | "omit" | "include";
  isActiveToast?: boolean;
  /**
   * When true, fetcher throws FetcherError on non-2xx responses instead
   * of returning { data: null, ok: false }. Use this from React Query
   * queryFn/mutationFn so isError surfaces correctly.
   */
  throwOnError?: boolean;
};

export const fetcher = async ({
  route,
  method = "GET",
  body,
  headers,
  loadingText = "در حال ارسال...",
  successText,
  credentials = "include",
  isActiveToast = false,
  throwOnError = false,
}: FetcherProps): Promise<{ data: any; ok: boolean }> => {

  const toastId = isActiveToast && toast.loading(loadingText);
  const isFormData = body instanceof FormData;

  try {
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
      if (throwOnError) {
        throw new FetcherError(data.message || "Request failed", res.status, data);
      }
      return { data: null, ok: false };
    }

    isActiveToast && toast.success(successText || data.message || "عملیات موفق");
    return { data: data.data, ok: true };
  } catch (err: any) {
    toastId && toast.dismiss(toastId);
    if (err instanceof FetcherError) {
      throw err;
    }
    // Browser-aborted fetches (React Query unmount, route change,
    // page navigation) throw DOMException with name "AbortError".
    // That's a deliberate cancel, not a network error — surfacing
    // "خطای اتصال به سرور" toasts during normal navigation spams
    // the admin UI. Drop silently.
    const isAbort =
      err?.name === "AbortError" ||
      err?.code === "ABORT_ERR" ||
      err?.code === 20;
    if (isAbort) {
      return { data: null, ok: false };
    }
    toast.error(err.message || "خطای اتصال به سرور");
    if (throwOnError) {
      throw new FetcherError(err.message || "Network error", 0, null);
    }
    return { data: null, ok: false };
  }
};

/**
 * React Query-friendly wrapper: returns the response payload directly
 * (no { data, ok } envelope) and throws FetcherError on failure so
 * isError/isPending/onError reflect reality.
 */
export const queryFetch = async <T = any>(args: Omit<FetcherProps, "throwOnError">): Promise<T> => {
  const result = await fetcher({ ...args, throwOnError: true });
  return result.data as T;
};
