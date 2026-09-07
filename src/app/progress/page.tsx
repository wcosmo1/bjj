"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { useApp } from "@/components/AppProvider";
import { TECHNIQUES } from "@/lib/data/techniques";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function ProgressPage() {
  const { state, stats, addSession, deleteSession, setTechniqueStatus } =
    useApp();
  const [date, setDate] = useState(todayISO);
  const [notes, setNotes] = useState("");
  const [drills, setDrills] = useState("");
  const [durationMins, setDurationMins] = useState(60);
  const [savedFlash, setSavedFlash] = useState(false);

  const weeklyMinutes = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? 6 : day - 1;
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    const weekKey = startOfWeek.toISOString().slice(0, 10);
    return state.sessions
      .filter((s) => s.date >= weekKey)
      .reduce((sum, s) => sum + (s.durationMins || 0), 0);
  }, [state.sessions]);

  const tracked = TECHNIQUES.filter(
    (t) => state.techniqueProgress[t.id] && state.techniqueProgress[t.id] !== "not_started"
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    addSession({
      date,
      notes: notes.trim(),
      drills: drills.trim(),
      durationMins: Number(durationMins) || 0,
    });
    setNotes("");
    setDrills("");
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 1600);
  }

  return (
    <AppShell title="Progress" subtitle="Sessions & technique status">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <Card className="px-3 py-3 text-center">
            <p className="text-2xl font-black text-lime-400">
              {stats.sessionsThisWeek}
            </p>
            <p className="text-[10px] text-slate-400">sessions / wk</p>
          </Card>
          <Card className="px-3 py-3 text-center">
            <p className="text-2xl font-black text-white">{weeklyMinutes}</p>
            <p className="text-[10px] text-slate-400">minutes / wk</p>
          </Card>
          <Card className="px-3 py-3 text-center">
            <p className="text-2xl font-black text-white">{stats.streak}</p>
            <p className="text-[10px] text-slate-400">day streak</p>
          </Card>
        </div>

        <Card>
          <h2 className="text-base font-bold text-white">Log training session</h2>
          <form onSubmit={onSubmit} className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">
                  Date
                </span>
                <input
                  type="date"
                  required
                  className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">
                  Minutes
                </span>
                <input
                  type="number"
                  min={0}
                  max={300}
                  className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                  value={durationMins}
                  onChange={(e) => setDurationMins(Number(e.target.value))}
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                Drills
              </span>
              <input
                className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                placeholder="Spider entries, knee slice…"
                value={drills}
                onChange={(e) => setDrills(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                Notes
              </span>
              <textarea
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                placeholder="What worked? Where did you get stuck?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-lime-400 text-sm font-bold text-slate-950"
            >
              {savedFlash ? "Logged" : "Add session"}
            </button>
          </form>
        </Card>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Session history</h2>
          {state.sessions.length === 0 ? (
            <EmptyState
              title="No sessions yet"
              body="Log your first class to start a streak and weekly count."
            />
          ) : (
            state.sessions.map((s) => (
              <Card key={s.id} className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{s.date}</p>
                    <p className="text-xs text-slate-400">
                      {s.durationMins ? `${s.durationMins} min` : "Duration n/a"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteSession(s.id)}
                    className="min-h-[44px] rounded-xl px-3 text-xs font-semibold text-rose-300"
                  >
                    Delete
                  </button>
                </div>
                {s.drills ? (
                  <p className="text-sm text-slate-300">
                    <span className="font-semibold text-slate-400">Drills:</span>{" "}
                    {s.drills}
                  </p>
                ) : null}
                {s.notes ? (
                  <p className="text-sm text-slate-300">{s.notes}</p>
                ) : null}
              </Card>
            ))
          )}
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Technique statuses</h2>
          {tracked.length === 0 ? (
            <EmptyState
              title="Nothing tracked yet"
              body="Open a technique card and mark it Learning, Drilling, or Can Hit In Rolls."
            />
          ) : (
            tracked.map((t) => {
              const status = state.techniqueProgress[t.id] ?? "not_started";
              return (
                <div
                  key={t.id}
                  className="flex min-h-[64px] items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{t.name}</p>
                    <div className="mt-1">
                      <StatusBadge status={status} />
                    </div>
                  </div>
                  <select
                    className="min-h-[44px] rounded-xl border border-slate-700 bg-slate-950 px-2 text-xs text-white"
                    value={status}
                    onChange={(e) =>
                      setTechniqueStatus(
                        t.id,
                        e.target.value as typeof status
                      )
                    }
                  >
                    <option value="learning">Learning</option>
                    <option value="drilling">Drilling</option>
                    <option value="can_hit">Can hit</option>
                    <option value="not_started">Reset</option>
                  </select>
                </div>
              );
            })
          )}
        </section>
      </div>
    </AppShell>
  );
}
