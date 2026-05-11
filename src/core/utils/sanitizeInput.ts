// utils/sanitizeInput.ts

/** تنظیمات اعتبارسنجی و پاک‌سازی ورودی */
export interface SanitizeOptions {
  allowEnglishOnly?: boolean;      // فقط A-Z a-z؟
  allowSpaces?: boolean;           // فاصله مجازه؟
  allowSpecialChars?: boolean;     // نمادها مجازند؟
  allowedSpecialChars?: string[];  // اگر نماد مجازه، فقط اینا؟
  allowNumbers?: boolean;          // آیا عدد مجازه؟
}

/** نتیجه‌ی پاک‌سازی */
export interface SanitizeResult {
  out: string;
  firstError: string;
}

/** توابع کمکی */
const isDigit = (ch: string) => /[0-9]/.test(ch);
const isSpace = (ch: string) => /\s/.test(ch);
const isEnglishLetter = (ch: string) => /^[A-Za-z]$/.test(ch);
const isLetterUnicode = (ch: string) => /\p{L}/u.test(ch);

/**
 * پاک‌سازی و فیلتر ورودی کاربر با قوانین سفارشی
 * @param input متن ورودی خام
 * @param options تنظیمات محدودکننده‌ی مجاز
 */
export function sanitizeInput(
  input: string,
  options: SanitizeOptions = {}
): SanitizeResult {
  const {
    allowEnglishOnly = true,
    allowSpaces = true,
    allowSpecialChars = false,
    allowedSpecialChars = [],
    allowNumbers = true,
  } = options;

  const specialsWhitelist = new Set(allowedSpecialChars);
  let out = "";
  let firstError = "";

  for (const ch of input) {
    // ۱. فاصله‌ها
    if (isSpace(ch)) {
      if (allowSpaces) {
        out += ch;
      } else if (!firstError) {
        firstError = "کاراکتر فاصله مجاز نیست.";
      }
      continue;
    }

    // ۲. اعداد
    if (isDigit(ch)) {
      if (allowNumbers) {
        out += ch;
      } else if (!firstError) {
        firstError = "استفاده از عدد مجاز نیست.";
      }
      continue;
    }

    // ۳. نمادها — این رو آوردیم بالا! قبل از حروف
    if (allowSpecialChars) {
      if (allowedSpecialChars.length > 0) {
        if (specialsWhitelist.has(ch)) {
          out += ch;
          continue; // قبول شد، برو بعدی
        }
        // اگر در لیست نبود، ادامه بده به چک‌های بعدی (شاید حرف انگلیسی باشه؟ نه، اما حداقل حذف نمی‌شه فوری)
      } else {
        out += ch; // همه نمادها مجاز
        continue;
      }
    }

    // ۴. حروف — حالا نوبت حروفه
    if (allowEnglishOnly) {
      if (isEnglishLetter(ch)) {
        out += ch;
      } else if (!firstError) {
        firstError = "فقط حروف انگلیسی مجاز است.";
      }
      continue;
    } else {
      if (isLetterUnicode(ch)) {
        out += ch;
      }
      continue;
    }

    // اگر به اینجا رسید یعنی کاراکتر غیرمجاز بود (مثل نماد غیرمجاز یا حرف غیرانگلیسی در حالت only English)
    if (!firstError) {
      firstError = "کاراکتر غیرمجاز وارد شده است.";
    }
  }

  return { out, firstError };
}