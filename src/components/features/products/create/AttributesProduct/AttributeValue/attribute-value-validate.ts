export function attributeValueValidation(attr: any) {
  const errs: Record<string, string> = {};

  if (attr.value?.trim().length === 0) {
    errs.value = "عنوان مقدار را وارد کنید";
  }

  if (!attr.group_id) {
    errs.group_id = "انتخاب گروه ویژگی الزامی است";
  }

  if (!attr.attribute_id) {
    errs.attribute_id = "انتخاب ویژگی الزامی است";
  }

  return errs;
}
