export function validateBrand(brand: any) {
  const errs: Record<string, string> = {};

  const hasName = !!brand.name?.trim();
  const hasSlug = !!brand.slug?.trim();
  const hasLogo = typeof brand.logo === "string" || brand.logo instanceof File;

  if (!hasName) {
    errs.name = "نام برند الزامی است.";
  }

  if (!hasSlug) {
    errs.slug = "نامک الزامی است.";
  }

  if (!hasLogo) {
    errs.logo = "لوگوی برند الزامی است.";
  }

  return errs;
}
