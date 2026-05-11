import { stripHtml } from "@/core/utils/helper";

export function storeFormValidation(data: any) {
  const errs: Record<string, string> = {};

  const { content } = data;

  const hasDesc = stripHtml(content || "").length > 0;

  !hasDesc && (errs.content = "توضیحات نمی‌تواند خالی باشد.");

  return errs;
}
