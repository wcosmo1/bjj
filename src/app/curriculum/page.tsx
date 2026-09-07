"use client";

import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { useApp } from "@/components/AppProvider";
import { CURRICULUM, allCurriculumItemIds } from "@/lib/data/curriculum";

export default function CurriculumPage() {
  const { state, toggleCurriculumItem } = useApp();
  const allIds = useMemo(() => allCurriculumItemIds(), []);
  const doneCount = allIds.filter((id) => state.curriculumProgress[id]).length;
  const pct = Math.round((doneCount / Math.max(allIds.length, 1)) * 100);

  const currentWeek =
    CURRICULUM.find((w) =>
      w.items.some((item) => !state.curriculumProgress[item.id])
    ) ?? CURRICULUM[CURRICULUM.length - 1];

  return (
    <AppShell title="Curriculum" subtitle="12-week lanky starter plan">
      <div className="space-y-4">
        <Card className="border-lime-500/20 shadow-glow">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-lime-500">
                Overall progress
              </p>
              <p className="mt-1 text-3xl font-black text-white">
                {doneCount}
                <span className="text-lg font-semibold text-slate-500">
                  /{allIds.length}
                </span>
              </p>
              <p className="text-xs text-slate-400">checklist items done</p>
            </div>
            <p className="text-2xl font-black text-lime-400">{pct}%</p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-lime-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-slate-300">
            Suggested focus:{" "}
            <span className="font-semibold text-white">
              Week {currentWeek.week} — {currentWeek.title}
            </span>
          </p>
        </Card>

        {CURRICULUM.map((week) => {
          const weekDone = week.items.filter(
            (i) => state.curriculumProgress[i.id]
          ).length;
          return (
            <Card key={week.id} className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Week {week.week}
                  </p>
                  <h2 className="text-lg font-bold text-white">{week.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{week.focus}</p>
                </div>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300">
                  {weekDone}/{week.items.length}
                </span>
              </div>
              <ul className="space-y-2">
                {week.items.map((item) => {
                  const checked = !!state.curriculumProgress[item.id];
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggleCurriculumItem(item.id)}
                        className={`flex min-h-[56px] w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                          checked
                            ? "border-lime-500/30 bg-lime-400/10"
                            : "border-slate-800 bg-slate-950/60"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                            checked
                              ? "border-lime-400 bg-lime-400 text-slate-950"
                              : "border-slate-600 text-transparent"
                          }`}
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            checked
                              ? "text-slate-300 line-through"
                              : "text-slate-100"
                          }`}
                        >
                          {item.label}
                          {item.tip ? (
                            <span className="mt-1 block text-xs text-slate-500 no-underline">
                              {item.tip}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}

        <Disclaimer />
      </div>
    </AppShell>
  );
}
