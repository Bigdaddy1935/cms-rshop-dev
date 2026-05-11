export function faqFormValidation(icon: any) {
  const errs: Record<string, string> = {};

  const { question, answer, faq_category_id } = icon;

  if (!question.length) {
    errs.question = "عنوان سوال الزامی است";
  }
  if (!answer.length) {
    errs.answer = "جواب سوال الزامی است";
  }
  if (!faq_category_id) {
    errs.faq_category_id = "دسته بندی سوال الزامی است";
  }

  return errs;
}
