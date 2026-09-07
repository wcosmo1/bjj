import type { TechniqueStatus } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

const STYLES: Record<TechniqueStatus, string> = {
  not_started: "bg-slate-800 text-slate-300",
  learning: "bg-sky-500/20 text-sky-300",
  drilling: "bg-amber-500/20 text-amber-300",
  can_hit: "bg-lime-500/20 text-lime-300",
};

export function StatusBadge({ status }: { status: TechniqueStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
