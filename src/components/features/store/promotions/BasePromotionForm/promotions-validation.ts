// promotions-validation.ts

import { PromotionForm } from "../promotions-types";
import { PromotionFormConfig } from "../promotions-types";

export function validatePromotionForm(
  form: PromotionForm,
  config: PromotionFormConfig,
  scope: "general" | "products" | "categories" | "customers"
) {
  const errs: Record<string, string> = {};

  if (!form.name?.trim()) errs.name = "نام پروموشن الزامی است.";

  if (!form.starts_at || !form.ends_at)
    errs.starts_at = "تاریخ شروع و پایان الزامی است.";

  if (config.code && !form.code?.trim()) {
    errs.code = "کد تخفیف الزامی است.";
  }

  if (config.discount_fields) {
    if (!form.percent_discount && !form.amount_discount) {
      errs.discount = "حداقل یکی از درصد یا مبلغ تخفیف را وارد کنید.";
    }
  }

  if (scope === "products" && config.scope.includes("product")) {
    if (!form.allowed_products || form.allowed_products.length === 0) {
      errs.allowed_products = "حداقل یک محصول باید انتخاب شود.";
    }
  }

  if (scope === "categories" && config.scope.includes("category")) {
    if (!form.allowed_categories || form.allowed_categories.length === 0) {
      errs.allowed_categories = "حداقل یک دسته‌بندی باید انتخاب شود.";
    }
  }

  if (scope === "customers" && config.scope.includes("user")) {
    if (!form.allowed_users || form.allowed_users.length === 0) {
      errs.allowed_users = "حداقل یک کاربر باید انتخاب شود.";
    }
  }

  return errs;
}
