export function myProfileValidation(info: Record<string, any>) {
  const errs: Record<string, string> = {};

  const { email, first_name, last_name, phone } = info;

  // Email
 /*  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errs.email = "فرمت ایمیل معتبر نیست";
  } */

  // First Name
  if (!first_name?.trim().length) {
    errs.first_name = "نام الزامی است";
  }

  // Last Name
  if (!last_name?.trim().length) {
    errs.last_name = "نام خانوادگی الزامی است";
  }

  // Phone
  if (!phone?.trim().length) {
    errs.phone = "شماره تماس الزامی است";
  } else if (!/^09\d{9}$/.test(phone)) {
    errs.phone = "شماره تماس معتبر نیست";
  }

  return errs;
}
