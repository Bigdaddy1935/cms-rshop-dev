import { ReadonlyURLSearchParams } from "next/navigation";

// ISO با مرزبندی روز (شروع یا پایان روز)
export const toISO = (d: Date, end = false) => {
  const x = new Date(d);
  end ? x.setHours(23, 59, 59, 999) : x.setHours(0, 0, 0, 0);
  return x.toISOString(); // UTC
};

// اضافه کردن یک اکسپرشن فیلتر به URLSearchParams
export const add = (p: URLSearchParams, key: string, exp: string | number) =>
  p.append(`filter.${key}`, String(exp));

// بولین 1/0 با $eq
export const eqBool10 = (
  p: URLSearchParams,
  key: string,
  v: "" | "1" | "0"
) => {
  if (v !== "") add(p, key, `$eq:${Number(v)}`);
};

// شناسه‌ها با $eq
export const eqId = (p: URLSearchParams, key: string, v?: string | "") => {
  if (v) add(p, key, `$eq:${v}`);
};

// بازه عددی با $gte/$lte
export const rangeNum = (
  p: URLSearchParams,
  key: string,
  min: number | "",
  max: number | ""
) => {
  if (min !== "") add(p, key, `$gte:${Number(min)}`);
  if (max !== "") add(p, key, `$lte:${Number(max)}`);
};

// بازه تاریخی میلادی: هر دو ⇒ $btw ، یکی ⇒ $gte/$lte
export const rangeDate = (
  p: URLSearchParams,
  key: string,
  start?: Date,
  end?: Date
) => {
  if (start && end) add(p, key, `$btw:${toISO(start)},${toISO(end, true)}`);
  else if (start) add(p, key, `$gte:${toISO(start)}`);
  else if (end) add(p, key, `$lte:${toISO(end, true)}`);
};