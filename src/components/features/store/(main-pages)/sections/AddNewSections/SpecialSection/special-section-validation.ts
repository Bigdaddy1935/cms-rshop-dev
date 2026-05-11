export function validateSpecialSection(data: any) {
  const errors: Record<string, string> = {};

  const hasLogo = !data.file && !data?.image;

/*   if (!data.title || data.title.trim() === "") {
    errors.title = "لطفاً عنوان بخش را وارد کنید.";
  }

  if (!data.description || data.description.trim() === "") {
    errors.description = "لطفاً توضیحات بخش را وارد کنید.";
  } */

  if (!data?.product_ids?.length) {
    errors.product_ids = "انتخاب محصول الزامی است.";
  }

  if (!data.slug || data.slug.trim() === "") {
    errors.slug = "لطفاً اسلاگ بخش را وارد کنید.";
  }

  if (!data.display_style || data.display_style.trim() === "") {
    errors.display_style = "لطفاً نوع نمایش را انتخاب کنید.";
  }

  if (isNaN(data.products_limit) || data.products_limit < 0) {
    errors.products_limit = "تعداد نمایش باید یک عدد معتبر باشد.";
  }

  if (!data.start_date.trim().length || !data.end_date.trim().length) {
    errors.date = "لطفاً لینک مشاهده همه را وارد کنید.";
  }

  if (hasLogo) errors.image = "تصویر الزامی است";

  return errors;
}
