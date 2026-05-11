import { stripHtml } from "@/core/utils/helper";

export function validateProduct(product: any) {
  const errs: Record<string, string> = {};

  const hasMedia =
    ((product.media_ids?.length || product.medias?.length) ?? 0) > 0;

  const hasPinned = !!product.media_pinned_id;
  const hasName = !!product.name?.trim();
  const hasPrice = !product?.variants?.length ? true : Number(product.price) > 0;
  const hasCategory = Number(product.category_id) > 0;
  const hasWeight = Number(product.weight) > 0;
  const hasBrand = Number(product.brand_id) > 0;
  const hasDesc = stripHtml(product.description || "").length > 0;
  const hasSku = (product?.sku || "").length > 0;

  !hasName && (errs.name = "نام محصول الزامی است.");
  !hasPrice && (errs.price = "قیمت معتبر نیست.");
  !hasCategory && (errs.category_id = "انتخاب دسته بندی الزامی است.");
  !hasWeight && (errs.weight = "وزن معتبر نیست.");
  !hasBrand && (errs.brand_id = "انتخاب برند الزامی است.");
  !hasDesc && (errs.description = "توضیحات نمی‌تواند خالی باشد.");
  !hasSku && (errs.sku = "کد انبار الزامی است");
  !hasMedia && (errs.media_ids = "حداقل یک تصویر باید انتخاب شود.");
  !hasPinned && (errs.media_pinned_id = "پین کردن یک تصویر الزامی است.");

  return errs;
}
