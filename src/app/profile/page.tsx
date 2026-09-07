"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { useApp } from "@/components/AppProvider";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const { state, hydrated, updateProfile } = useApp();
  const [draft, setDraft] = useState<Profile>(state.profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setDraft(state.profile);
  }, [hydrated, state.profile]);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({
      ...draft,
      heightFeet: Number(draft.heightFeet) || 0,
      heightInches: Number(draft.heightInches) || 0,
      weightLbs: Number(draft.weightLbs) || 0,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  }

  return (
    <AppShell title="Profile" subtitle="Your frame & notes">
      <div className="space-y-4">
        <Card>
          <h2 className="text-base font-bold text-white">
            How long frames play differently
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
            <li>
              • You create space with skeletal frames — make them climb your
              limbs.
            </li>
            <li>
              • Open guards (spider, lasso, DLR) usually beat low closed-guard
              stalls.
            </li>
            <li>
              • Finish with angles (triangles, armbars, back takes), not
              strength contests.
            </li>
            <li>
              • Passing relies on mobility and connection — not raw smash
              weight.
            </li>
          </ul>
        </Card>

        <Card>
          <form onSubmit={onSave} className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                Name
              </span>
              <input
                className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </label>

            <div className="grid grid-cols-3 gap-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">
                  Feet
                </span>
                <input
                  type="number"
                  min={4}
                  max={8}
                  className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                  value={draft.heightFeet}
                  onChange={(e) =>
                    setDraft({ ...draft, heightFeet: Number(e.target.value) })
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">
                  Inches
                </span>
                <input
                  type="number"
                  min={0}
                  max={11}
                  className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                  value={draft.heightInches}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      heightInches: Number(e.target.value),
                    })
                  }
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-slate-400">
                  Weight (lbs)
                </span>
                <input
                  type="number"
                  min={80}
                  max={400}
                  className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                  value={draft.weightLbs}
                  onChange={(e) =>
                    setDraft({ ...draft, weightLbs: Number(e.target.value) })
                  }
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                Notes
              </span>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                value={draft.notes}
                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                placeholder="Injuries, preferred guards, goals…"
              />
            </label>

            <button
              type="submit"
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-lime-400 text-sm font-bold text-slate-950"
            >
              {saved ? "Saved" : "Save profile"}
            </button>
          </form>
        </Card>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
