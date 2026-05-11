export function staticSectionValidation(
  data: any,
  showCategory?: boolean,
  sectionType?: any,
) {
  const errors: Record<string, string> = {};

  if (sectionType === "promotion_based") {
    /* if (!data?.start_date?.length && !data?.end_date?.length) {
      errors.start_date = "بازه اعتبار تخفیف شگفت انگیز الزامی است"
    } */
    if (!data?.promotion_id) {
      errors.promotion_id = "انتخاب پروموشن الزامی است";
    }
  }

  if (sectionType === "featured") {
    if (!data?.start_date?.length && !data?.end_date?.length) {
      errors.start_date = "بازه اعتبار تخفیف شگفت انگیز الزامی است";
    }
  }

  if (data.title.trim() === "") {
    errors.title = "عنوان بخش الزامی است.";
  }

  if (data.slug.trim() === "") {
    errors.slug = "نامک بخش الزامی است.";
  }

  if (isNaN(data.products_limit) || data.products_limit <= 3) {
    errors.products_limit = "تعداد نمایش باید بیشتر از 3 باشد.";
  }

  if (
    sectionType !== "promotion_based" &&
    (!data.view_all_link || data.view_all_link.trim() === "")
  ) {
    errors.view_all_link = "لطفاً لینک مشاهده همه را وارد کنید.";
  }

  if (showCategory) {
    if (!data.category_id) {
      errors.category_id = "انتخاب دسته بندی الزامی است.";
    }
  }

  return errors;
}
