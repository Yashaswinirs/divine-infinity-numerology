"use client";

import * as React from "react";
import { cn } from "@/lib";

export interface AboutHeroValues {
  contentShiftX: number;
  contentShiftY: number;
  compassZoom: number;
  compassShiftX: number;
  compassShiftY: number;
}

export interface AboutHeroControlsProps {
  values: AboutHeroValues;
  onChange: (values: AboutHeroValues) => void;
  onReset: () => void;
  className?: string;
}

export function AboutHeroControls({
  values,
  onChange,
  onReset,
  className,
}: AboutHeroControlsProps) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const update = <K extends keyof AboutHeroValues>(
    key: K,
    val: AboutHeroValues[K]
  ) => {
    onChange({
      ...values,
      [key]: val,
    });
  };

  const exportJson = JSON.stringify(
    {
      contentShiftX: values.contentShiftX,
      contentShiftY: values.contentShiftY,
      compassZoom: Number(values.compassZoom.toFixed(2)),
      compassShiftX: values.compassShiftX,
      compassShiftY: values.compassShiftY,
    },
    null,
    2
  );

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(exportJson);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <aside
      aria-label="About Hero Visual Tuner"
      className={cn("fixed bottom-5 right-5 z-60 font-sans", className)}
    >
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-xl transition-all cursor-pointer",
          "border border-[#FFD8A2]/50 bg-[#0d1226]/90 text-[#FFD8A2] backdrop-blur-md",
          "hover:bg-[#FFD8A2] hover:text-[#0d1226]",
          isOpen && "mb-3"
        )}
      >
        <span className="text-sm">⚙️</span>
        <span>{isOpen ? "Close Tuner" : "About Hero Tuner"}</span>
      </button>

      {/* Floating Panel */}
      {isOpen && (
        <div className="w-[340px] max-h-[85vh] overflow-y-auto rounded-2xl border border-[#FFD8A2]/30 bg-[#090d22]/95 p-4 text-white shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-[#FFD8A2]">About Hero Controls</h2>
              <p className="text-[10px] text-white/50">Desktop (1440px) visual fine-tuner</p>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="rounded border border-white/20 px-2 py-1 text-[10px] text-white/70 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              Reset All
            </button>
          </div>

          <div className="mt-3.5 space-y-4 text-xs">
            {/* Section 1: Content Controls */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 space-y-3">
              <span className="font-semibold text-[#FFF0DB] block text-[11px] uppercase tracking-wider">
                Left Content (Text)
              </span>

              {/* Content X */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/70">Move X (Left / Right):</span>
                  <span className="font-mono text-[#FFD8A2] font-semibold">
                    {values.contentShiftX > 0 ? `+${values.contentShiftX}` : values.contentShiftX}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={-200}
                    max={200}
                    step={1}
                    value={values.contentShiftX}
                    onChange={(e) => update("contentShiftX", Number(e.target.value))}
                    className="w-full accent-[#FFD8A2] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => update("contentShiftX", 0)}
                    className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/50 hover:text-white"
                  >
                    0
                  </button>
                </div>
              </div>

              {/* Content Y */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/70">Move Y (Up / Down):</span>
                  <span className="font-mono text-[#FFD8A2] font-semibold">
                    {values.contentShiftY > 0 ? `+${values.contentShiftY}` : values.contentShiftY}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={-150}
                    max={150}
                    step={1}
                    value={values.contentShiftY}
                    onChange={(e) => update("contentShiftY", Number(e.target.value))}
                    className="w-full accent-[#FFD8A2] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => update("contentShiftY", 0)}
                    className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/50 hover:text-white"
                  >
                    0
                  </button>
                </div>
              </div>
            </div>

            {/* Section 2: Compass Controls */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 space-y-3">
              <span className="font-semibold text-[#FFF0DB] block text-[11px] uppercase tracking-wider">
                Right Compass Image
              </span>

              {/* Compass Zoom */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/70">Zoom (Scale):</span>
                  <span className="font-mono text-[#FFD8A2] font-semibold">
                    {values.compassZoom.toFixed(2)}x
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0.5}
                    max={2.0}
                    step={0.02}
                    value={values.compassZoom}
                    onChange={(e) => update("compassZoom", Number(e.target.value))}
                    className="w-full accent-[#FFD8A2] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => update("compassZoom", 1.0)}
                    className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/50 hover:text-white"
                  >
                    1x
                  </button>
                </div>
              </div>

              {/* Compass X */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/70">Move X (Left / Right):</span>
                  <span className="font-mono text-[#FFD8A2] font-semibold">
                    {values.compassShiftX > 0 ? `+${values.compassShiftX}` : values.compassShiftX}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={-200}
                    max={200}
                    step={1}
                    value={values.compassShiftX}
                    onChange={(e) => update("compassShiftX", Number(e.target.value))}
                    className="w-full accent-[#FFD8A2] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => update("compassShiftX", 0)}
                    className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/50 hover:text-white"
                  >
                    0
                  </button>
                </div>
              </div>

              {/* Compass Y */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-white/70">Move Y (Up / Down):</span>
                  <span className="font-mono text-[#FFD8A2] font-semibold">
                    {values.compassShiftY > 0 ? `+${values.compassShiftY}` : values.compassShiftY}px
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={-150}
                    max={150}
                    step={1}
                    value={values.compassShiftY}
                    onChange={(e) => update("compassShiftY", Number(e.target.value))}
                    className="w-full accent-[#FFD8A2] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => update("compassShiftY", 0)}
                    className="rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/50 hover:text-white"
                  >
                    0
                  </button>
                </div>
              </div>
            </div>

            {/* Export JSON Box & Copy */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Recorded Values:</span>
                {copied && <span className="text-emerald-400 font-bold text-[10px]">✓ Copied!</span>}
              </div>
              <textarea
                readOnly
                value={exportJson}
                rows={5}
                className="w-full rounded-lg border border-white/15 bg-black/50 p-2 font-mono text-[10px] text-[#FFD8A2] selection:bg-[#FFD8A2]/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  "w-full rounded-lg py-2 text-xs font-bold transition-all cursor-pointer",
                  copied
                    ? "bg-emerald-500 text-black"
                    : "bg-[#FFD8A2] text-[#655373] hover:brightness-105 active:scale-[0.98]"
                )}
              >
                {copied ? "✓ Copied to Clipboard!" : "📋 Copy Values for Chat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default AboutHeroControls;
