export function faqcatFormValidation(icon: any) {
  const errs: Record<string, string> = {};

  const { name, icon_id } = icon;

  if (!name.length) {
    errs.name = "نام دسته بندی سوال الزامی است.";
  }

  if (!icon_id) {
    errs.icon_id = "آیکون الزامی است.";
  }

  return errs;
}
