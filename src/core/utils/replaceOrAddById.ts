export function replaceOrAddById<T extends { id: string | number }>(
  array: T[],
  item: T
): T[] {
  const index = array.findIndex((a) => a.id === item.id);
  if (index !== -1) {
    const updated = [...array];
    updated[index] = item;
    return updated;
  }
  return [...array, item];
}