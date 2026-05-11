"use client";
import React, { useEffect, useRef, useState } from "react";

type PanZoomProps = {
  minScale?: number;
  maxScale?: number;
  step?: number;          // ضریب زوم هر اسکرول
  height?: number;        // ارتفاع ظرف pan/zoom
  className?: string;
  lockBodyScrollOnHover?: boolean; // قفل‌کردن اسکرول صفحه هنگام hover
  children: React.ReactNode;
};

export function PanZoom({
  minScale = 0.5,
  maxScale = 3,
  step = 1.1,
  height = 400,
  className,
  lockBodyScrollOnHover = true,
  children,
}: PanZoomProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);
  const [panning, setPanning] = useState(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  // --- Zoom حول مکان نشانگر
  const zoomAt = (clientX: number, clientY: number, nextScale: number) => {
    const c = containerRef.current!;
    const rect = c.getBoundingClientRect();
    const x = (clientX - rect.left - tx) / scale;
    const y = (clientY - rect.top - ty) / scale;
    const s = Math.min(maxScale, Math.max(minScale, nextScale));
    const newTx = clientX - rect.left - x * s;
    const newTy = clientY - rect.top - y * s;
    setScale(s);
    setTx(newTx);
    setTy(newTy);
  };

  // --- Wheel handler
  const handleWheel = (e: WheelEvent | React.WheelEvent) => {
    // مهار کامل اسکرول صفحه
    e.preventDefault?.();
    e.stopPropagation?.();
    const anyE = e as any;
    const clientX = anyE.clientX;
    const clientY = anyE.clientY;
    const deltaY = anyE.deltaY ?? 0;
    const direction = deltaY < 0 ? 1 : -1;
    const factor = direction > 0 ? step : 1 / step;
    zoomAt(clientX, clientY, scale * factor);
  };

  // --- Pan با Pointer
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // فقط دکمهٔ چپ
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setPanning(true);
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!panning || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    setTx((v) => v + dx);
    setTy((v) => v + dy);
    last.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    setPanning(false);
    last.current = null;
  };
  const onPointerCancel = () => {
    setPanning(false);
    last.current = null;
  };

  // --- میانبرها: Ctrl/Cmd + (+ / - / 0)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      if (["=", "+", "-", "0"].includes(e.key)) e.preventDefault();
      if (e.key === "=" || e.key === "+") {
        const rect = containerRef.current!.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scale * step);
      } else if (e.key === "-") {
        const rect = containerRef.current!.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scale / step);
      } else if (e.key === "0") {
        setScale(1); setTx(0); setTy(0);
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [scale, step]);

  // --- Fallback سختگیر: addEventListener با passive:false روی خود ظرف
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const wheelListener = (e: WheelEvent) => handleWheel(e);
    el.addEventListener("wheel", wheelListener, { passive: false });
    return () => el.removeEventListener("wheel", wheelListener as EventListener);
  }, [scale, step, tx, ty]);

  // --- قفل اسکرول بدنه هنگام hover (اختیاری)
  useEffect(() => {
    if (!lockBodyScrollOnHover) return;
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => { document.documentElement.style.overscrollBehaviorY = "none"; document.body.style.overflowY = "hidden"; };
    const onLeave = () => { document.documentElement.style.overscrollBehaviorY = ""; document.body.style.overflowY = ""; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      onLeave();
    };
  }, [lockBodyScrollOnHover]);

  // --- دکمه‌های کنترلی
  const zoomIn = () => {
    const rect = containerRef.current!.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scale * step);
  };
  const zoomOut = () => {
    const rect = containerRef.current!.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scale / step);
  };
  const reset = () => { setScale(1); setTx(0); setTy(0); };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className || ""}`}>
      {/* کنترل‌ها */}
      <div className="absolute z-10 top-2 left-2 flex gap-2">
        <button onClick={zoomOut}  className="rounded-md bg-black/40 text-white px-2 py-1 text-sm" aria-label="Zoom out">−</button>
        <button onClick={zoomIn}   className="rounded-md bg-black/40 text-white px-2 py-1 text-sm" aria-label="Zoom in">+</button>
        <button onClick={reset}    className="rounded-md bg-black/40 text-white px-2 py-1 text-sm" aria-label="Reset">100%</button>
      </div>

      {/* ظرف pan/zoom */}
      <div
        ref={containerRef}
        // نکات مهم کلاس‌ها:
        // - overscroll-contain: جلوگیری از handoff به والد/صفحه
        // - overflow-hidden: نبود اسکرول داخلی
        // - touch-none: ژست‌های تاچ پیش‌فرض غیرفعال
        className={`w-full ${panning ? "cursor-grabbing" : "cursor-grab"} select-none touch-none overflow-hidden overscroll-contain`}
        style={{ height }}
        // گرفتن wheel در فاز capture برای مرورگرهایی که هنوز bubble می‌کنند
        onWheelCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleWheel(e as unknown as React.WheelEvent);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        // جلوگیری از اسکرول با کلیدها (space/pageup/pagedown/arrow) وقتی فوکوس گرفت
        tabIndex={0}
        onKeyDownCapture={(e) => {
          if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp"].includes(e.key)) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <div
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: "0 0",
            willChange: "transform",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
