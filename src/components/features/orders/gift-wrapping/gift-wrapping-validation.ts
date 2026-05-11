export function giftWrappingValidation(data: any) {
  const errs: Record<string, string> = {};

  if (!data.name.trim()) errs.name = "نام الزامی است.";
  if (!data.description.trim()) errs.description = "توضیحات الزامی است.";
  if (!data.price || data.price <= 0)
    errs.price = "قیمت باید بیشتر از صفر باشد.";
  if (!data.image_id) errs.image_id = "تصویر الزامی است.";

  return errs;
}
