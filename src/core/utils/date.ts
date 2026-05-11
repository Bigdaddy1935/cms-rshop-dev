import { CalendarDate } from "@internationalized/date";

/**
 * CalendarDate → ISO string (در ساعت 00:00:00)
 */
export const calToISO = (c?: CalendarDate | null): string | undefined => {
  if (!c) return undefined;
  const d = new Date(c.year, c.month - 1, c.day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};

/**
 * CalendarDate → JS Date
 */
export const calToJs = (c?: CalendarDate) =>
  c ? new Date(c.year, c.month - 1, c.day) : undefined;

/**
 * ISO string → CalendarDate (با درنظر گرفتن timezone محلی)
 */
export const isoToCal = (iso?: string | null): CalendarDate | undefined => {
  if (!iso) return undefined;
  try {
    // اینجا Date رو parse می‌کنیم تا timezone لحاظ بشه
    const d = new Date(iso);
    return new CalendarDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  } catch {
    return undefined;
  }
};


export const toPersianUTC = (
  isoDate?: string | null,
  options: { showTime?: boolean; withWeekday?: boolean } = {}
): string => {
  const { showTime = true, withWeekday = false } = options;

  if (!isoDate) return "—";

  const date = new Date(isoDate);

  // گزینه‌های اصلی
  const baseOptions: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // اضافه کردن ساعت و دقیقه فقط اگر showTime === true باشه
  if (showTime) {
    Object.assign(baseOptions, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // ۲۴ ساعته
    });
  }

  // اضافه کردن روز هفته اگر خواسته شده
  if (withWeekday) {
    Object.assign(baseOptions, {
      weekday: "long",
    });
  }

  const persianParts = new Intl.DateTimeFormat("fa-IR", baseOptions)
    .formatToParts(date)
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {} as Record<string, string>);

  // ساخت خروجی نهایی
  let result = `${persianParts.year}/${persianParts.month}/${persianParts.day}`;

  if (showTime) {
    result += `، ${persianParts.hour}:${persianParts.minute}`;
  }

  if (withWeekday) {
    result = `${persianParts.weekday}، ${result}`;
  }

  return result;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};