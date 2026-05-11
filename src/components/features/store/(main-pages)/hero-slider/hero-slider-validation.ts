export function validateHeroSlider(data: any, showButtonFields: boolean) {
  const errors: Record<string, string> = {};

  if (!data.button_link || data.button_link.trim() === "") {
    errors.button_link = "لطفاً لینک را وارد کنید.";
  }

  if (showButtonFields && data.title.trim() === "") {
    errors.title = "لطفاً عنوان را وارد کنید.";
  }
  if (showButtonFields && data.description.trim() === "") {
    errors.description = "لطفاً توضیحات را وارد کنید.";
  }

  if (
    (!data.image_url || data.image_url.trim() === "") &&
    !data.mediaFile &&
    (!data.background_color || data.background_color.trim() === "")
  ) {
    errors.image_url = "لطفاً تصویر یا رنگ پس‌زمینه را مشخص کنید.";
  }

  return errors;
}
