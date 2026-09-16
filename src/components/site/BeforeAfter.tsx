// Drag-to-compare slider. The most persuasive element on a detailing site — it shows the
// work instead of claiming it. Clip-path keeps both images at full frame width, so the
// reveal is a true wipe rather than a squashed image.
// PLACEHOLDER IMAGERY: swap both sides for real shop photos of the same car.
import { useCallback, useRef, useState } from "react";

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  }, []);

  if (!beforeSrc || !afterSrc) return null;

  return (
    <div
      ref={frame}
      role="slider"
      tabIndex={0}
      aria-label="Compare before and after"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      onKeyDown={onKey}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-navy-950 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => { if (dragging.current) move(e.clientX); }}
      onPointerUp={() => { dragging.current = false; }}
      onPointerCancel={() => { dragging.current = false; }}
    >
      {/* After — full frame, underneath */}
      <img src={afterSrc} alt={afterLabel} draggable={false} className="absolute inset-0 h-full w-full object-cover" />

      {/* Before — same frame, wiped in from the left */}
      <img
        src={beforeSrc}
        alt={beforeLabel}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          filter: "saturate(0.4) brightness(0.7) contrast(0.9)",
        }}
      />

      <span className="pointer-events-none absolute left-5 top-5 bg-navy-950/80 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-5 top-5 bg-white/90 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-navy-900 backdrop-blur">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/90" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/70 bg-navy-950/60 text-sm tracking-[0.2em] text-white backdrop-blur">
          &#8596;
        </span>
      </div>
    </div>
  );
}
