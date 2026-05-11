export function promoBannerValidation(data: any) {
  const errors: Record<string, string> = {};

  if (!data.title || !data.title.trim()) {
    errors.title = "عنوان الزامی است";
  }

  if (!data.link || !data.link.trim()) {
    errors.link = "لینک دکمه الزامی است";
  }

  if (data.useBackground) {
    if (!data.description || !data.description.trim()) {
      errors.description = "توضیحات بنر الزامی است";
    }

    if (!data.background_color || !data.background_color.trim()) {
      errors.background_color = "رنگ پس‌زمینه الزامی است";
    }

    if (!data.text_color || !data.text_color.trim()) {
      errors.text_color = "رنگ پس‌زمینه الزامی است";
    }

    if (!data.link_text || !data.link_text.trim()) {
      errors.link_text = "متن دکمه الزامی است";
    }
  } else {
    // حالت تصویری
    if (!data.image_url && !data.mediaFile) {
      errors.image_url = "تصویر بنر الزامی است";
    }
  }

  // بازه زمانی همیشه الزامی
  if (!data.start_date || !data.end_date) {
    errors.start_date = "بازه زمانی اعتبار الزامی است";
  }

  if (isNaN(data.display_duration) || data.display_duration < 5) {
    errors.display_duration = "مدت نمایش باید حداقل ۵ ثانیه باشد";
  }
  
  return errors;
}
