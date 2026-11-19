"use client";

import * as React from "react";
import Image from "next/image";
import {
  whatYouWillFindData,
  type WhatYouWillFindData,
  type HoroscopeInsightItem,
} from "@/data/horoscope";
import { cn } from "@/lib";

export interface WhatYouWillFindProps
  extends React.HTMLAttributes<HTMLElement> {
  data?: Partial<WhatYouWillFindData>;
  showStars?: boolean;
  /** Explicitly toggle interactive lines editor mode (defaults to checking ?edit URL parameter in dev) */
  editMode?: boolean;
  /** Optional vertical offset in pixels to shift the zodiac wheel up or down (e.g. -25 to move up) */
  wheelOffsetTop?: number;
  className?: string;
}

interface LineCoordinates {
  id: string;
  startX: number;
  startY: number;
  bendX: number; // bend Y equals startY (horizontal first leg)
  endX: number;
  endY: number;
}

/**
 * WhatYouWillFind Section (Horoscope Insights Include)
 *
 * SPECIFICATIONS:
 * - Desktop master: 1440 x 835 (min-h-[835px]), angle 0, opacity 1
 * - Wheel box at desktop: left 450, top 235, size 540 (cx 720, cy 505, R 270)
 * - 7 insight zones:
 *   Left side: Career (200, 246), Business (159, 375), Love & Relationship (80, 514), Finance (241, 627)
 *   Right side: Health (849, 280), Marriage (849, 409), Personal Growth (849, 548)
 * - Connector lines: Polyline with horizontal first leg (at startY) and diagonal leg to wheel anchor
 * - Visual Line Editor: Gated behind ?edit URL flag or editMode prop for dragging anchors and bends
 */
export function WhatYouWillFind({
  data: propData,
  showStars = true,
  editMode,
  wheelOffsetTop,
  className,
  ...props
}: WhatYouWillFindProps) {
  const data: WhatYouWillFindData = {
    ...whatYouWillFindData,
    ...propData,
    wheel: {
      ...whatYouWillFindData.wheel,
      ...propData?.wheel,
    },
    insights: propData?.insights ?? whatYouWillFindData.insights,
  };

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const wheelRef = React.useRef<HTMLDivElement | null>(null);
  const labelRefs = React.useRef<Record<string, HTMLDivElement | null>>({});

  // Overrides state for editor mode
  const [overrides, setOverrides] = React.useState<Record<string, { x: number; y: number }>>({});
  const draggingAnchorRef = React.useRef<string | null>(null);

  const [bendOverrides, setBendOverrides] = React.useState<Record<string, number>>({});
  const draggingBendRef = React.useRef<string | null>(null);

  const [lines, setLines] = React.useState<LineCoordinates[]>([]);
  const [copied, setCopied] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);

  // Wheel vertical offset:
  // - Tablet (< 1280px): -12px placement
  // - 1440 Master Desktop (>= 1280px): +20px placement (strictly frozen)
  const [wheelOffset, setWheelOffset] = React.useState<number | null>(
    wheelOffsetTop !== undefined ? wheelOffsetTop : null
  );

  React.useEffect(() => {
    if (wheelOffsetTop !== undefined) {
      setWheelOffset(wheelOffsetTop);
      return;
    }
    const updateOffset = () => {
      const isDesktop = window.innerWidth >= 1280;
      setWheelOffset((prev) => {
        // If editMode is active and user customized it, preserve user's setting
        if (isEditMode && prev !== null) return prev;
        return isDesktop ? 20 : -12;
      });
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, [wheelOffsetTop, isEditMode]);

  // Detect ?edit mode from URL or prop (client only)
  React.useEffect(() => {
    if (editMode !== undefined) {
      setIsEditMode(editMode);
    } else if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV !== "production"
    ) {
      const hasEditParam = new URLSearchParams(window.location.search).has("edit");
      setIsEditMode(hasEditParam);
    }
  }, [editMode]);

  // Calculate connector line coordinates with polyline bend point
  const calculateLines = React.useCallback(() => {
    if (!sectionRef.current || !wheelRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const wheelRect = wheelRef.current.getBoundingClientRect();

    if (sectionRect.width === 0 || wheelRect.width === 0) return;

    const computedLines: LineCoordinates[] = [];

    data.insights.forEach((item) => {
      const labelEl = labelRefs.current[item.id];
      if (!labelEl) return;

      const labelRect = labelEl.getBoundingClientRect();

      const startX =
        item.side === "left"
          ? labelRect.right - sectionRect.left
          : labelRect.left - sectionRect.left;
      const startY = labelRect.top + labelRect.height / 2 - sectionRect.top;

      const a = overrides[item.id] ?? item.anchor;
      const endX = wheelRect.left - sectionRect.left + a.x * wheelRect.width;
      const endY = wheelRect.top - sectionRect.top + a.y * wheelRect.height;

      // Bend X: wheel-relative fraction, or midpoint if not set
      const bendFrac = bendOverrides[item.id] ?? item.bend;
      let bendX =
        bendFrac === undefined
          ? (startX + endX) / 2
          : wheelRect.left - sectionRect.left + bendFrac * wheelRect.width;

      // Keep the bend between start and end so the line never doubles back
      const lo = Math.min(startX, endX);
      const hi = Math.max(startX, endX);
      bendX = Math.min(hi, Math.max(lo, bendX));

      computedLines.push({ id: item.id, startX, startY, bendX, endX, endY });
    });

    setLines(computedLines);
  }, [data.insights, overrides, bendOverrides]);

  // Recalculate connector lines whenever wheelOffset changes
  React.useEffect(() => {
    calculateLines();
  }, [calculateLines, wheelOffset]);

  // Setup ResizeObserver & triggers for lines recomputation
  React.useEffect(() => {
    calculateLines();

    const resizeObserver = new ResizeObserver(() => {
      calculateLines();
    });

    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
    }
    if (wheelRef.current) {
      resizeObserver.observe(wheelRef.current);
    }

    Object.values(labelRefs.current).forEach((el) => {
      if (el) resizeObserver.observe(el);
    });

    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        calculateLines();
      });
    }

    window.addEventListener("resize", calculateLines);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateLines);
    };
  }, [calculateLines]);

  // Drag handlers for Bend handle (cyan square)
  const startBendDrag = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    draggingBendRef.current = id;
  };

  const onBendDrag = (e: React.PointerEvent) => {
    const id = draggingBendRef.current;
    if (!id || !wheelRef.current) return;
    const r = wheelRef.current.getBoundingClientRect();
    const frac = (e.clientX - r.left) / r.width; // only X moves
    setBendOverrides((o) => ({ ...o, [id]: frac }));
  };

  const endBendDrag = (e: React.PointerEvent) => {
    if (draggingBendRef.current) {
      try {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      } catch { }
    }
    draggingBendRef.current = null;
  };

  // Drag handlers for Anchor handle (gold circle)
  const startAnchorDrag = (id: string) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    draggingAnchorRef.current = id;
  };

  const onAnchorDrag = (e: React.PointerEvent) => {
    const id = draggingAnchorRef.current;
    if (!id || !wheelRef.current) return;
    const r = wheelRef.current.getBoundingClientRect();
    // Free dragging anywhere inside or around the wheel
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setOverrides((o) => ({ ...o, [id]: { x, y } }));
  };

  const endAnchorDrag = (e: React.PointerEvent) => {
    if (draggingAnchorRef.current) {
      try {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      } catch { }
    }
    draggingAnchorRef.current = null;
  };

  // Export updated data for copying into src/data/horoscope.ts
  const exportText = () =>
    JSON.stringify(
      data.insights.map((item) => {
        const a = overrides[item.id] ?? item.anchor;
        const line = lines.find((l) => l.id === item.id);
        const wheel = wheelRef.current?.getBoundingClientRect();
        const section = sectionRef.current?.getBoundingClientRect();
        const bend =
          bendOverrides[item.id] ??
          item.bend ??
          (line && wheel && section
            ? (line.bendX - (wheel.left - section.left)) / wheel.width
            : undefined);
        return {
          id: item.id,
          anchor: { x: +a.x.toFixed(4), y: +a.y.toFixed(4) },
          bend: bend === undefined ? undefined : +bend.toFixed(4),
        };
      }),
      null,
      2
    );

  const handleCopy = () => {
    const text = exportText();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        },
        () => {
          setCopied(false);
        }
      );
    }
  };

  const handleReset = () => {
    setOverrides({});
    setBendOverrides({});
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1280;
    setWheelOffset(wheelOffsetTop !== undefined ? wheelOffsetTop : isDesktop ? 20 : -12);
  };

  return (
    <section
      ref={sectionRef}
      id="what-you-will-find"
      aria-labelledby="what-you-will-find-heading"
      className={cn(
        // SECTION CONTAINER: Mobile auto, Tablet min-h-[515px], Desktop master 1440 x 835 (min-h-[835px])
        "relative w-full max-w-[1440px] mx-auto min-h-0 md:min-h-[515px] xl:min-h-[835px]",
        "pt-[30px] xl:pt-[60px] pb-[20px] xl:pb-[60px] px-0",
        "flex flex-col items-center",
        "opacity-100 rotate-0 text-white overflow-visible select-none",
        "max-md:min-h-0 max-md:gap-[10px] max-md:px-[20px] max-md:pt-[25px] max-md:pb-[25px]",
        className
      )}
      {...props}
    >
      {/* Background Stars (consistent with Free Calculator and Horoscope sections) */}
      {showStars && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
        >
          <Image
            src="/images/blogs/blogs-stars.svg"
            alt=""
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      )}

      {/* HEADER BLOCK: ornament + heading + paragraph */}
      <header className="relative z-10 flex w-full max-w-[816px] flex-col items-center justify-center gap-[15px] text-center px-[20px] max-md:px-0">
        {/* Ornament */}
        <div className="mx-auto flex items-center justify-center">
          <Image
            src="/images/ornament.svg"
            alt=""
            width={362}
            height={34}
            priority={false}
            className="w-[260px] sm:w-[320px] xl:w-[362px] h-[34px] object-contain select-none pointer-events-none"
          />
        </div>

        {/* Heading: Lovelace Text 400, #FFD8A2 */}
        <h2
          id="what-you-will-find-heading"
          className="font-heading font-normal text-[32px] sm:text-[38px] xl:text-[44px] leading-[1.2] tracking-normal text-[#FFD8A2] m-0"
        >
          {data.title}
        </h2>

        {/* Paragraph: Lato 500, #ECECEC */}
        <p className="font-sans font-medium text-[15px] sm:text-[16px] xl:text-[18px] leading-[1.4] tracking-normal text-[#ECECEC] m-0 max-w-[700px]">
          {data.description}
        </p>
      </header>

      {/* ========================================================
          MOBILE (< 768px) ONLY: faded wheel + 2-column label grid
          Hidden at md and above, so tablet and desktop are untouched.
          ======================================================== */}
      <div className="relative z-10 mt-8 w-full max-w-[350px] md:hidden">
        {/* Wheel background: 301 x 301, 30% opacity, centered */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[86%] -translate-x-1/2 -translate-y-1/2 opacity-30"
        >
          <Image
            src={data.wheel.src}
            alt={data.wheel.alt}
            fill
            priority={false}
            sizes="301px"
            className="object-contain select-none"
          />
        </div>

        {/* 4 rows x 56px, 28px row gap, 18px column gap (= 308px total) */}
        <ul className="relative m-0 grid list-none grid-cols-2 gap-x-[18px] gap-y-[28px] p-0">
          {(["career", "health", "business", "marriage", "love", "growth", "finance"] as const).map(
            (id) => {
              const item = data.insights.find((i) => i.id === id);
              if (!item) return null;
              return (
                <li
                  key={id}
                  className={cn(
                    "flex min-w-0",
                    id === "finance" && "col-span-2 justify-center"
                  )}
                >
                  <div
                    className={cn(
                      "box-border flex min-h-[56px] min-w-0 items-center rounded-[13px]",
                      "border border-[var(--zodiac-border-gold)] bg-transparent",
                      "gap-[clamp(8px,2.82vw,12px)] p-[clamp(8px,2.35vw,10px)]",
                      id === "finance" ? "w-[128px] max-w-full" : "w-full"
                    )}
                  >
                    {/* Icon: 36 x 36 (scales down on very small screens) */}
                    <div
                      aria-hidden="true"
                      className="relative flex h-[clamp(28px,8.47vw,36px)] w-[clamp(28px,8.47vw,36px)] shrink-0 items-center justify-center rounded-[80px]"
                    >
                      <Image
                        src={item.icon}
                        alt=""
                        width={36}
                        height={36}
                        unoptimized
                        className="h-full w-full object-contain select-none pointer-events-none"
                      />
                    </div>

                    {/* Lato 400, 17.33px, scales with viewport (17.33 / 425 = 4.08vw) */}
                    <span className="min-w-0 font-sans font-normal text-[clamp(12.5px,4.08vw,17.33px)] leading-[1.15] tracking-normal text-[#ECECEC] text-left">
                      {item.label}
                    </span>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      </div>

      {/* ========================================================
          DIAGRAM AREA: Wheel + Insight Zones + SVG Connector Lines
          (Tablet and Desktop master: md and above)
          ======================================================== */}
      {/* SVG Connector Lines Overlay */}
      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible max-md:hidden"
        aria-hidden="true"
      >
        {lines.map((line) => (
          <g key={line.id}>
            {/* Polyline: Horizontal first leg (at startY) -> bend -> into the wheel diagram */}
            <polyline
              points={`${line.startX},${line.startY} ${line.bendX},${line.startY} ${line.endX},${line.endY}`}
              fill="none"
              stroke="rgba(255, 216, 162, 0.35)"
              strokeWidth="1"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>

      {/* 1. CENTRAL ZODIAC WHEEL (aspect-ratio 1:1, uncropped full diagram) */}
      <div
        ref={wheelRef}
        style={wheelOffset !== null && wheelOffset !== undefined ? { transform: `translateY(${wheelOffset}px)` } : undefined}
        className={cn(
          "absolute aspect-square flex items-center justify-center shrink-0 z-10",
          // Tablet layout: width 277, height 277, shifted down by 40px to top 232.91px, centered at 50%
          "w-[277px] h-[277px] top-[232.91px] left-[calc(50%-138.5px)]",
          // Placement: -12px on tablet (< 1280px), +20px on desktop (>= 1280px)
          "-translate-y-[12px] xl:translate-y-[20px]",
          // Desktop master: 540x540 at left 450 (31.25%), top 235/201 (24.14%)
          "xl:w-[540px] xl:h-[540px] xl:left-[31.25%] xl:top-[24.14%]",
          "max-md:hidden"
        )}
      >
        <Image
          src={data.wheel.src}
          alt={data.wheel.alt}
          fill
          priority={false}
          sizes="(max-width: 1280px) 277px, 540px"
          className="object-contain select-none pointer-events-none"
        />
      </div>

      {/* 2. INSIGHT ZONES & LABELS */}
      <div className="absolute inset-0 pointer-events-none z-30 max-md:hidden">
        {data.insights.map((item) => {
          const isLeft = item.side === "left";

          return (
            <div
              key={item.id}
              className={cn(
                "absolute h-[50px] min-h-[50px] xl:h-[68px] flex items-center pointer-events-auto",
                isLeft ? "justify-start" : "justify-start xl:justify-end",
                // Tablet layout vs Desktop layout (1440 strictly frozen)
                item.id === "career" && [
                  "w-auto top-[192.91px] left-[20px] sm:left-[calc(50%-308px)]",
                  "xl:w-[28.82%] xl:top-[29.46%] xl:left-[13.89%]",
                ],
                item.id === "business" && [
                  "w-auto top-[267.91px] left-[12px] sm:left-[calc(50%-358px)]",
                  "xl:w-[28.82%] xl:top-[44.91%] xl:left-[11.04%]",
                ],
                item.id === "love" && [
                  "w-auto top-[335.91px] left-[8px] sm:left-[calc(50%-368px)]",
                  "xl:w-[28.82%] xl:top-[61.56%] xl:left-[5.56%]",
                ],
                item.id === "finance" && [
                  "w-auto top-[412.91px] left-[20px] sm:left-[calc(50%-298px)]",
                  "xl:w-[28.82%] xl:top-[75.09%] xl:left-[16.74%]",
                ],
                item.id === "health" && [
                  "w-auto top-[182.91px] left-[calc(50%+155px)]",
                  "xl:w-[28.82%] xl:top-[33.53%] xl:left-[58.96%]",
                ],
                item.id === "marriage" && [
                  "w-auto top-[279.91px] left-[calc(50%+155px)]",
                  "xl:w-[28.82%] xl:top-[48.98%] xl:left-[58.96%]",
                ],
                item.id === "growth" && [
                  "w-auto top-[376.91px] left-[calc(50%+155px)]",
                  "xl:w-[33.68%] xl:top-[65.63%] xl:left-[58.96%]",
                ]
              )}
            >
              {/* VISIBLE LABEL BOX */}
              <div
                ref={(el) => {
                  labelRefs.current[item.id] = el;
                }}
                className={cn(
                  // Height 50px on tablet, 68px on desktop
                  "flex h-[50px] min-h-[50px] xl:h-[68px] xl:min-h-[68px] w-auto items-center",
                  // Gap 12px on tablet, 18px on desktop
                  "gap-[10px] sm:gap-[12px] xl:gap-[18px]",
                  // Border gold 1px, rounded 13px
                  "rounded-[13px] border border-[var(--zodiac-border-gold)]",
                  // Padding: 5px 10px 5px 5px on tablet, py 5px pl 6px pr 18px on desktop
                  "bg-transparent py-[5px] pl-[5px] pr-[10px] xl:pl-[6px] xl:pr-[18px]",
                  "box-border transition-all duration-200 select-none",
                  (item.id === "love" || item.id === "growth") && "h-auto py-[6px] xl:h-[68px] xl:py-[5px]"
                )}
              >
                {/* Icon Circle: 40x40 on tablet, 54x54 on desktop */}
                <div
                  className="relative flex h-[40px] w-[40px] xl:h-[54px] xl:w-[54px] shrink-0 items-center justify-center rounded-[80px]"
                  aria-hidden="true"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={54}
                    height={54}
                    unoptimized
                    className="h-[40px] w-[40px] xl:h-[54px] xl:w-[54px] object-contain select-none pointer-events-none"
                  />
                </div>

                {/* Text: Lato 400 on tablet, Lato 700 22.5px on desktop */}
                {item.id === "love" ? (
                  <span className="font-sans font-normal xl:font-bold text-[16px] sm:text-[18px] lg:text-[19.08px] xl:text-[22.5px] leading-[1.15] xl:leading-[30.7px] tracking-normal text-[#ECECEC] text-left xl:whitespace-nowrap">
                    Love and<br className="xl:hidden" /> Relationship
                  </span>
                ) : item.id === "growth" ? (
                  <span className="font-sans font-normal xl:font-bold text-[16px] sm:text-[18px] lg:text-[19.08px] xl:text-[22.5px] leading-[1.15] xl:leading-[30.7px] tracking-normal text-[#ECECEC] text-left xl:whitespace-nowrap">
                    Personal<br className="xl:hidden" /> Growth
                  </span>
                ) : (
                  <span className="font-sans font-normal xl:font-bold text-[17px] sm:text-[19.08px] xl:text-[22.5px] leading-none xl:leading-[30.7px] tracking-normal text-[#ECECEC] whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* ========================================================
          3. INTERACTIVE EDITOR OVERLAY (Enabled when ?edit URL parameter or editMode)
          ======================================================== */}
      {isEditMode && (
        <>
          {/* Draggable handles on the lines */}
          <div className="absolute inset-0 pointer-events-none z-40 max-md:hidden">
            {lines.map((line) => (
              <React.Fragment key={line.id}>
                {/* Bend Handle (cyan square): moves horizontally */}
                <div
                  onPointerDown={startBendDrag(line.id)}
                  onPointerMove={onBendDrag}
                  onPointerUp={endBendDrag}
                  onPointerCancel={endBendDrag}
                  title={`${line.id} horizontal bend`}
                  style={{ left: line.bendX, top: line.startY, touchAction: "none" }}
                  className="pointer-events-auto absolute h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 cursor-ew-resize rounded-xs border-2 border-cyan-300 bg-cyan-300/40 hover:bg-cyan-300/80 shadow-xs"
                />
                {/* End Anchor Handle (gold circle): snaps to wheel ring */}
                <div
                  onPointerDown={startAnchorDrag(line.id)}
                  onPointerMove={onAnchorDrag}
                  onPointerUp={endAnchorDrag}
                  onPointerCancel={endAnchorDrag}
                  title={`${line.id} wheel anchor`}
                  style={{ left: line.endX, top: line.endY, touchAction: "none" }}
                  className="pointer-events-auto absolute h-[14px] w-[14px] -translate-x-1/2 -translate-y-1/2 cursor-move rounded-full border-2 border-[#FFD8A2] bg-[#FFD8A2]/50 hover:bg-[#FFD8A2] shadow-xs"
                />
              </React.Fragment>
            ))}
          </div>

          {/* Floating Editor Controls Panel */}
          <aside
            aria-label="Lines Editor"
            className="fixed bottom-6 right-6 z-50 flex w-[340px] flex-col gap-3 rounded-xl border border-cyan-400/40 bg-[#090D22]/95 p-4 text-white shadow-2xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-sans font-bold text-[14px] text-cyan-300">
                🛠 Lines Editor (?edit)
              </span>
              <button
                type="button"
                onClick={() => setIsEditMode(false)}
                className="text-xs text-white/50 hover:text-white"
              >
                Close
              </button>
            </div>

            <p className="font-sans text-[12px] leading-relaxed text-[#ECECEC]/80">
              • <strong className="text-cyan-300">Cyan square:</strong> Drag horizontally to adjust line bend.<br />
              • <strong className="text-[#FFD8A2]">Gold circle:</strong> Drag freely anywhere inside the diagram.
            </p>

            {/* Wheel Vertical Shift (Y) Slider */}
            <div className="flex flex-col gap-1 border-t border-white/10 pt-2">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-white/80">Move Diagram Up/Down:</span>
                <span className="font-mono text-cyan-300 font-bold">
                  {(wheelOffset ?? 0) > 0 ? `+${wheelOffset}` : (wheelOffset ?? 0)}px
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={-120}
                  max={120}
                  value={wheelOffset ?? 0}
                  onChange={(e) => setWheelOffset(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setWheelOffset(0)}
                  className="rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/60 hover:text-white"
                >
                  0px
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Presets:</span>
                <div className="flex gap-1.5">
                  {[-25, -12, 0, 20].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setWheelOffset(val)}
                      className={cn(
                        "rounded px-2 py-0.5 font-mono text-[10px]",
                        wheelOffset === val
                          ? "bg-cyan-500 font-bold text-black"
                          : "bg-white/10 text-white hover:bg-white/20"
                      )}
                    >
                      {val > 0 ? `+${val}` : val}px
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[10px] text-white/50">
                Tip: Slide left (negative) to move diagram UP.
              </span>
            </div>

            <textarea
              readOnly
              value={exportText()}
              rows={6}
              className="w-full rounded-md border border-white/15 bg-black/60 p-2 font-mono text-[11px] text-white/90 selection:bg-cyan-500/30 focus:outline-none"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "flex-1 rounded-md py-1.5 px-3 font-sans font-bold text-[12px] transition-all",
                  copied
                    ? "bg-emerald-500 text-black"
                    : "bg-cyan-400 text-black hover:bg-cyan-300 active:scale-95"
                )}
              >
                {copied ? "Copied to Clipboard!" : "Copy JSON"}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-md border border-white/20 py-1.5 px-3 font-sans text-[12px] text-white/70 hover:bg-white/10 active:scale-95"
              >
                Reset
              </button>
            </div>
          </aside>
        </>
      )}
    </section>
  );
}

export default WhatYouWillFind;
