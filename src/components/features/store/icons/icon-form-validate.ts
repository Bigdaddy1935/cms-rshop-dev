export function IconFormvalidation(icon: any) {
  const errs: Record<string, string> = {};

  const { name, svg } = icon;

  if (!name.length) {
    errs.name = "نام آیکون الزامی است.";
  }

  if (!svg.length) {
    errs.svg = "svg آیکون الزامی است.";
  }

  return errs;
}
