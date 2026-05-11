// src/utils/flattenCategories.ts
export type CategoryNode = {
  id: number | string;
  title: string;
  children?: CategoryNode[];
};

export type FlatCategory = {
  id: number | string;
  title: string; // متن با فاصله برای نمایش
  depth: number; // عمق واقعی برای استایل یا padding
};

/**
 * درخت دسته‌بندی را به آرایهٔ فلت تبدیل می‌کند
 * @param nodes آرایه‌ی ریشه‌ی درخت
 * @param indentUnit رشته‌ای که برای ایندنت در متن استفاده می‌شود (پیش‌فرض NBSP)
 */
export function flattenCategories(
  nodes?: CategoryNode[],
  indentUnit = "\u00A0\u00A0" // دو NBSP برای اینکه در HTML حذف نشه
): FlatCategory[] {
  const out: FlatCategory[] = [];

  const walk = (arr: CategoryNode[], depth = 0) => {
    for (const c of arr) {
      out.push({
        id: c.id,
        title: `${indentUnit.repeat(depth)}${c.title}`,
        depth,
      });
      if (c.children?.length) walk(c.children, depth + 1);
    }
  };

  if (nodes?.length) walk(nodes, 0);
  return out;
}
