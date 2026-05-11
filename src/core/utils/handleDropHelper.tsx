// utils/handleDropHelper.ts
export async function handleDropHelper<
  T extends { id: number; display_order: number | null }
>(
  items: T[],
  draggingId: number | null,
  overId: number,
  mutationFn: (payload: { id: number; display_order: number }) => Promise<any>,
  setItems: (items: T[]) => void,
  setDraggingId: (id: number | null) => void
) {
  if (draggingId === null || draggingId === overId) return;

  const idxA = items.findIndex((i) => i.id === draggingId);
  const idxB = items.findIndex((i) => i.id === overId);
  if (idxA === -1 || idxB === -1) return;

  const itemA = items[idxA];
  const itemB = items[idxB];

  // 👇 اینجا null رو هندل می‌کنیم
  const payloadA = { id: itemA.id, display_order: itemB.display_order ?? 0 };
  const payloadB = { id: itemB.id, display_order: itemA.display_order ?? 0 };

  try {
    const results = await Promise.allSettled([
      mutationFn(payloadA),
      mutationFn(payloadB),
    ]);

    const hasError = results.some((r) => r.status === "rejected");
    if (hasError) {
      console.warn("Swap failed, no UI update.");
      return;
    }

    const newItems = items.map((item) => {
      if (item.id === itemA.id)
        return { ...item, display_order: payloadA.display_order };
      if (item.id === itemB.id)
        return { ...item, display_order: payloadB.display_order };
      return item;
    });

    const idxAnew = newItems.findIndex((i) => i.id === itemA.id);
    const idxBnew = newItems.findIndex((i) => i.id === itemB.id);
    [newItems[idxAnew], newItems[idxBnew]] = [
      newItems[idxBnew],
      newItems[idxAnew],
    ];

    setItems(newItems);
  } catch (err) {
    console.error("Swap failed:", err);
  } finally {
    setDraggingId(null);
  }
}
