export const validateCategory = (data: any) => {
  const errors: any = {};
  
  const hasLogo = !data.mediaFile && !data?.media?.url;

  if (!data.title.trim()) errors.title = "عنوان الزامی است";
  if (!data.slug.trim()) errors.slug = "اسلاگ الزامی است";
  if (hasLogo)
    errors.mediaId = "تصویر الزامی است";
  if (data.parentId === -1) errors.parentId = "انتخاب دسته بندی الزامی است";

  return errors;
};
