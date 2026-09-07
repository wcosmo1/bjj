"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { StatusBadge } from "@/components/StatusBadge";
import { useApp } from "@/components/AppProvider";
import { MODULES } from "@/lib/data/modules";

export default function HomePage() {
  const { state, hydrated, stats, nextFocus } = useApp();
  const nextStatus = state.techniqueProgress[nextFocus.id] ?? "not_started";
  const nextModule = MODULES.find((m) => m.id === nextFocus.moduleId);

  return (
    <AppShell
      title={`Hey, ${state.profile.name || "athlete"}`}
      subtitle="Play the long game"
    >
      {!hydrated ? (
        <p className="text-sm text-slate-400">Loading your mat log…</p>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-slate-900 to-slate-950">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                This week
              </p>
              <p className="mt-1 text-3xl font-black text-lime-400">
                {stats.sessionsThisWeek}
              </p>
              <p className="text-xs text-slate-400">sessions logged</p>
            </Card>
            <Card>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Day streak
              </p>
              <p className="mt-1 text-3xl font-black text-white">
                {stats.streak}
              </p>
              <p className="text-xs text-slate-400">consecutive days</p>
            </Card>
          </div>

          <Card className="shadow-glow border-lime-500/20">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-lime-500">
              Next recommended focus
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">
              {nextFocus.name}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {nextModule?.title ?? "Technique"}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <StatusBadge status={nextStatus} />
              <Link
                href={`/techniques/${nextFocus.id}`}
                className="inline-flex min-h-[44px] items-center rounded-xl bg-lime-400 px-4 text-sm font-bold text-slate-950"
              >
                Open technique
              </Link>
            </div>
          </Card>

          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Technique board
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-sky-500/10 px-2 py-3">
                <p className="text-xl font-bold text-sky-300">
                  {stats.statusCounts.learning}
                </p>
                <p className="text-[10px] text-slate-400">Learning</p>
              </div>
              <div className="rounded-xl bg-amber-500/10 px-2 py-3">
                <p className="text-xl font-bold text-amber-300">
                  {stats.statusCounts.drilling}
                </p>
                <p className="text-[10px] text-slate-400">Drilling</p>
              </div>
              <div className="rounded-xl bg-lime-500/10 px-2 py-3">
                <p className="text-xl font-bold text-lime-300">
                  {stats.statusCounts.can_hit}
                </p>
                <p className="text-[10px] text-slate-400">Can hit</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/techniques"
              className="flex min-h-[72px] flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <span className="text-sm font-bold text-white">Technique guide</span>
              <span className="text-xs text-slate-400">6 modules</span>
            </Link>
            <Link
              href="/progress"
              className="flex min-h-[72px] flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <span className="text-sm font-bold text-white">Log a session</span>
              <span className="text-xs text-slate-400">
                {stats.totalSessions} total
              </span>
            </Link>
            <Link
              href="/curriculum"
              className="flex min-h-[72px] flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <span className="text-sm font-bold text-white">12-week plan</span>
              <span className="text-xs text-slate-400">Starter checklist</span>
            </Link>
            <Link
              href="/profile"
              className="flex min-h-[72px] flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <span className="text-sm font-bold text-white">Your frame</span>
              <span className="text-xs text-slate-400">
                {state.profile.heightFeet}&apos;{state.profile.heightInches}&quot; ·{" "}
                {state.profile.weightLbs} lbs
              </span>
            </Link>
          </div>

          <Disclaimer />
        </div>
      )}
    </AppShell>
  );
}
