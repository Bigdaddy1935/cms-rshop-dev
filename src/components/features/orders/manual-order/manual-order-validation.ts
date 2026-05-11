// validation/manual-order-validation.ts
export function validateManualOrder(data: any) {
  const errors: Record<string, string> = {};

  if (!data.userId) {
    errors.userId = "لطفاً کاربر را انتخاب کنید.";
  }

  if (!data.selectedAddressId) {
    errors.selectedAddressId = "لطفاً آدرس تحویل را انتخاب کنید.";
  }

  if (!data.products || data.products.length === 0) {
    errors.products = "حداقل یک محصول باید انتخاب شود.";
  }

  return errors;
}