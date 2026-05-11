export function validateSideBanner(data: any, showBadgeFields: boolean) {
  const errors: Record<string, string> = {};

  if (data.useBackground) {
    if (!data.title || data.title.trim() === "") {
      errors.title = "لطفاً عنوان بنر را وارد کنید.";
    }

    if (!data.subtitle || data.subtitle.trim() === "") {
      errors.subtitle = "لطفاً متن بنر را وارد کنید.";
    }

    if ((!data.image_url || data.image_url.trim() === "") && !data.mediaFile) {
      errors.image_url_bg = "تصویر الزامی است.";
    }

    if (showBadgeFields) {
      if (!data.badge_text || data.badge_text.trim() === "") {
        errors.badge_text = "لطفاً متن برچسب را وارد کنید.";
      }
    }
  } else if (
    (!data.image_url || data.image_url.trim() === "") &&
    !data.mediaFile
  ) {
    errors.image_url = "تصویر الزامی است.";
  }

  if (!data.link || data.link.trim() === "") {
    errors.link = "لطفاً لینک بنر را وارد کنید.";
  }

  return errors;
}
