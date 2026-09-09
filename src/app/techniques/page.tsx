"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { useApp } from "@/components/AppProvider";
import { MODULES } from "@/lib/data/modules";
import {
  getTechniquesByModule,
  filterTechniquesByRuleSet,
} from "@/lib/data/techniques";
import type { RuleSet } from "@/lib/types";
import { RULESET_LABELS } from "@/lib/types";

type Filter = "all" | RuleSet;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "gi", label: "Gi" },
  { id: "nogi", label: "No-Gi" },
  { id: "both", label: "Shared" },
];

function ruleSetBadgeClass(ruleSet: RuleSet): string {
  if (ruleSet === "gi") return "bg-sky-500/15 text-sky-300";
  if (ruleSet === "nogi") return "bg-violet-500/15 text-violet-300";
  return "bg-lime-500/15 text-lime-300";
}

export default function TechniquesPage() {
  const { state } = useApp();
  const [filter, setFilter] = useState<Filter>("all");

  const modules = useMemo(() => {
    const sorted = [...MODULES].sort((a, b) => a.order - b.order);
    if (filter === "all") return sorted;
    if (filter === "both") return sorted.filter((m) => m.ruleSet === "both");
    return sorted.filter((m) => m.ruleSet === filter || m.ruleSet === "both");
  }, [filter]);

  return (
    <AppShell title="Technique guide" subtitle="Gi & No-Gi for long frames">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`min-h-[40px] rounded-full px-3.5 text-sm font-semibold transition ${
                filter === f.id
                  ? "bg-lime-400 text-slate-950"
                  : "border border-slate-700 bg-slate-900 text-slate-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {modules.map((mod) => {
          const techniques = filterTechniquesByRuleSet(
            getTechniquesByModule(mod.id),
            filter
          );
          if (techniques.length === 0) return null;
          return (
            <section key={mod.id} className="space-y-3">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{mod.title}</h2>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${ruleSetBadgeClass(mod.ruleSet)}`}
                  >
                    {RULESET_LABELS[mod.ruleSet]}
                  </span>
                </div>
                <p className="text-sm text-lime-500/90">{mod.subtitle}</p>
              </div>
              <Card>
                <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
                  {mod.overview.map((p) => (
                    <li key={p.slice(0, 24)}>{p}</li>
                  ))}
                </ul>
              </Card>
              <div className="space-y-2">
                {techniques.map((t) => {
                  const status = state.techniqueProgress[t.id] ?? "not_started";
                  return (
                    <Link
                      key={t.id}
                      href={`/techniques/${t.id}`}
                      className="flex min-h-[72px] items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-white">{t.name}</p>
                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide ${ruleSetBadgeClass(t.ruleSet)}`}
                          >
                            {RULESET_LABELS[t.ruleSet]}
                          </span>
                        </div>
                        <p className="mt-0.5 line-clamp-2 text-xs text-slate-400">
                          {t.whyLanky}
                        </p>
                      </div>
                      <StatusBadge status={status} />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
