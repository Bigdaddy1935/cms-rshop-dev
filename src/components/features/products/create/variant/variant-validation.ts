export function validateVariant(form: any) {
  const errs: Record<string,string> = {};

  const hasSku = !!(form.sku ?? "").toString().trim();
  const hasPrice = Number(form.price) > 0;

  if (!hasSku) errs.sku = "کد انبار الزامی است.";
  if (!hasPrice) errs.price = "قیمت الزامی است.";

  return errs;
}