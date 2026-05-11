export function validateInfos(infos: any) {
  const errs: Record<string, string> = {};

  if (infos.shop_card_number?.trim() === "") {
    errs.shop_card_number = "شماره کارت الزامی است";
  }

  if (infos.shop_card_holder?.trim() === "") {
    errs.shop_card_holder = "نام دارنده کارت الزامی است";
  }

  if (infos.shop_bank_name?.trim() === "") {
    errs.shop_bank_name = "نام بانک الزامی است";
  }

  if (infos.shop_iban?.trim() === "") {
    errs.shop_iban = "شماره شبا الزامی است";
  }
  return errs;
}
