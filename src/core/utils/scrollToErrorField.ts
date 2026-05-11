export function scrollToFirstErrorField() {
  // پیدا کردن اولین فیلدی که data-error='true' داره
  const errorElements = document.querySelectorAll("[data-error='true']");
  if (errorElements.length === 0) return;

  const firstError = errorElements[0] as HTMLElement;

  // پیداکردن نزدیک‌ترین سکشن والد فرم
  const sectionParent = firstError.closest("[data-scroll-parent='true']") as HTMLElement;

  // اگر section پیدا شد، روی اون اسکرول کن، وگرنه خود input
  const target = sectionParent || firstError;

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // افکت برای نشون دادن بخش فرم
  target.classList.add("ring-2", "ring-danger-400", "transition-all");
  setTimeout(() => {
    target.classList.remove("ring-2", "ring-danger-400");
  }, 1500);
}
