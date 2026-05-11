export function attributeValidation(attr: any) {
  const errs: Record<string, string> = {};

  if (attr.name?.trim().length === 0) {
    errs.name = "عنوان ویژگی را الزامی است";
  }
  
  if (attr.slug?.trim().length === 0) {
    errs.slug = "نامک الزامی است";
  }
  
  if (attr.type?.trim().length === 0) {
    errs.type = "انتخاب نوع ویژگی الزامی است";
  }

  if (!attr.group_id) {
    errs.group_id = "انتخاب گروه ویژگی الزامی است";
  }

  return errs;
}
