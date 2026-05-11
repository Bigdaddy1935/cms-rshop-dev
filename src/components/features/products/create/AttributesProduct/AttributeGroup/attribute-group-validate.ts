export function attributeGroupValidation(attr: any) {
  const errs: Record<string, string> = {};

  if (attr.name?.trim().length === 0) {
    errs.name = "عنوان گروه الزامی است";
  }
  
  if (attr.slug?.trim().length === 0) {
    errs.slug = "نامک الزامی است";
  }

  return errs;
}
