"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { useApp } from "@/components/AppProvider";
import { useCoachState } from "@/hooks/useCoachState";
import type { CoachLlmSettings, Profile } from "@/lib/types";

export default function ProfilePage() {
  const { state, hydrated, updateProfile } = useApp();
  const {
    state: coachState,
    hydrated: coachHydrated,
    updateLlm,
    clearMemory,
    llmEnabled,
  } = useCoachState();
  const [draft, setDraft] = useState<Profile>(state.profile);
  const [llmDraft, setLlmDraft] = useState<CoachLlmSettings>(coachState.llm);
  const [saved, setSaved] = useState(false);
  const [llmSaved, setLlmSaved] = useState(false);

  useEffect(() => {
    if (hydrated) setDraft(state.profile);
  }, [hydrated, state.profile]);

  useEffect(() => {
    if (coachHydrated) setLlmDraft(coachState.llm);
  }, [coachHydrated, coachState.llm]);

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

  function onSaveLlm(e: React.FormEvent) {
    e.preventDefault();
    updateLlm({
      apiKey: llmDraft.apiKey.trim(),
      baseUrl: llmDraft.baseUrl.trim() || "https://api.openai.com/v1",
      model: llmDraft.model.trim() || "gpt-4o-mini",
    });
    setLlmSaved(true);
    window.setTimeout(() => setLlmSaved(false), 1800);
  }

  return (
    <AppShell title="Profile" subtitle="Your frame, notes & coach settings">
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
              • Open guards (spider, lasso, DLR, butterfly/SLX) usually beat low
              closed-guard stalls.
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
          <Link
            href="/coach"
            className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-lime-400 px-4 text-sm font-bold text-slate-950"
          >
            Open AI Coach
          </Link>
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

        <Card className="border-amber-500/20">
          <h2 className="text-base font-bold text-white">
            Optional LLM coach (local only)
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400">
            Paste an OpenAI-compatible API key to upgrade Coach answers. Keys
            stay in this browser&apos;s localStorage — never committed or sent
            to GitHub Pages servers. Without a key, Coach still works via
            retrieval + curated videos.
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            Status:{" "}
            <span className="font-semibold text-slate-300">
              {llmEnabled ? "LLM enabled on this device" : "Retrieval-only"}
            </span>
          </p>
          <form onSubmit={onSaveLlm} className="mt-3 space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                API key
              </span>
              <input
                type="password"
                autoComplete="off"
                className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                value={llmDraft.apiKey}
                onChange={(e) =>
                  setLlmDraft({ ...llmDraft, apiKey: e.target.value })
                }
                placeholder="sk-… (optional)"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                Base URL
              </span>
              <input
                className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                value={llmDraft.baseUrl}
                onChange={(e) =>
                  setLlmDraft({ ...llmDraft, baseUrl: e.target.value })
                }
                placeholder="https://api.openai.com/v1"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-400">
                Model
              </span>
              <input
                className="min-h-[48px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-white outline-none ring-lime-400/40 focus:ring-2"
                value={llmDraft.model}
                onChange={(e) =>
                  setLlmDraft({ ...llmDraft, model: e.target.value })
                }
                placeholder="gpt-4o-mini"
              />
            </label>
            <button
              type="submit"
              className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-950"
            >
              {llmSaved ? "Saved on device" : "Save LLM settings"}
            </button>
            <button
              type="button"
              className="flex min-h-[44px] w-full items-center justify-center rounded-xl border border-slate-700 text-xs font-medium text-slate-400"
              onClick={() => {
                setLlmDraft({
                  apiKey: "",
                  baseUrl: "https://api.openai.com/v1",
                  model: "gpt-4o-mini",
                });
                updateLlm({
                  apiKey: "",
                  baseUrl: "https://api.openai.com/v1",
                  model: "gpt-4o-mini",
                });
              }}
            >
              Remove API key from this device
            </button>
          </form>
        </Card>

        <Card>
          <h2 className="text-sm font-bold text-white">Coach memory</h2>
          <p className="mt-2 text-xs text-slate-400">
            Chat history, thumbs feedback, struggle notes, and derived memory
            live only in localStorage.
          </p>
          {coachState.memory.summary ? (
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              {coachState.memory.summary}
            </p>
          ) : (
            <p className="mt-2 text-[11px] text-slate-600">No memory yet.</p>
          )}
          <button
            type="button"
            className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-xl border border-rose-500/40 text-xs font-semibold text-rose-300"
            onClick={() => {
              if (
                window.confirm(
                  "Clear coach chat + learning memory? API key settings stay."
                )
              ) {
                clearMemory();
              }
            }}
          >
            Clear coach memory
          </button>
        </Card>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
