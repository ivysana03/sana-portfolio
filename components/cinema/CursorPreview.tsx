"use client";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type CursorPreviewItem = { id: string; label: string; accent: string; image?: string };
export default function CursorPreview({ items, children }: { items: CursorPreviewItem[]; children: ReactNode }) {
  const preview = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const [id, setId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const node = preview.current;
      if (node) {
        // The preview is fixed to the viewport, so calculate its position in
        // viewport coordinates and flip it above/left of the pointer when
        // the preferred lower/right placement would overflow.
        const margin = 12;
        const width = node.offsetWidth;
        const height = node.offsetHeight;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        let x = pointer.current.x + 24;
        let y = pointer.current.y + 18;
        if (x + width > viewportWidth - margin) x = pointer.current.x - width - 24;
        if (y + height > viewportHeight - margin) y = pointer.current.y - height - 18;
        target.current.x = Math.max(margin, Math.min(x, viewportWidth - width - margin));
        target.current.y = Math.max(margin, Math.min(y, viewportHeight - height - margin));
        current.current.x += (target.current.x - current.current.x) * .14;
        current.current.y += (target.current.y - current.current.y) * .14;
        node.style.transform = `translate3d(${current.current.x}px,${current.current.y}px,0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  const active = items.find((item) => item.id === id);
  const move = (event: PointerEvent<HTMLDivElement>) => { pointer.current = { x: event.clientX, y: event.clientY }; const row = (event.target as HTMLElement).closest<HTMLElement>("[data-preview-id]"); setId(row?.dataset.previewId ?? null); };
  const style = active ? ({ "--preview-accent": active.accent, "--preview-image": active.image ? `url(${active.image})` : "none" } as CSSProperties) : undefined;
  return <>
    <div className="work-cursor-zone" onPointerMove={move} onPointerLeave={() => setId(null)}>{children}</div>
    {mounted ? createPortal(<div ref={preview} className={`work-cursor-preview${active ? " is-visible" : ""}`} style={style} aria-hidden="true"><div key={active?.id} /><span>{active?.label}</span></div>, document.body) : null}
  </>;
}
