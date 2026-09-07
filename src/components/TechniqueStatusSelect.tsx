"use client";

import type { TechniqueStatus } from "@/lib/types";
import { STATUS_LABELS, STATUS_ORDER } from "@/lib/types";

export function TechniqueStatusSelect({
  value,
  onChange,
}: {
  value: TechniqueStatus;
  onChange: (status: TechniqueStatus) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">
        Progress status
      </span>
      <select
        className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm text-white outline-none ring-lime-400/40 focus:ring-2"
        value={value}
        onChange={(e) => onChange(e.target.value as TechniqueStatus)}
      >
        {STATUS_ORDER.map((s) => (
          <option key={s} value={s}>
            {STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </label>
  );
}
