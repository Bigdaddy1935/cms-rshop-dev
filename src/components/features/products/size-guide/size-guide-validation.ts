export function sizeGuideValidation(size: any) {
  const errs: Record<string, string> = {};


  const hasLogo = typeof size.image === "string" || size.image instanceof File;

  if (!size.title?.trim()) {
    errs.title = " عنوان راهنمای سایز الزامی است.";
  }

  if (!size.description?.trim()) {
    errs.description = "توضیحات راهنمای سایز الزامی است.";
  }

  if (!hasLogo) {
    errs.image = "لوگوی راهنمای سایز الزامی است.";
  }

  return errs;
}
