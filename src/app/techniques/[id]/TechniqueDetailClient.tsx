"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { TechniqueStatusSelect } from "@/components/TechniqueStatusSelect";
import { useApp } from "@/components/AppProvider";
import { MODULES } from "@/lib/data/modules";
import { getTechniqueById } from "@/lib/data/techniques";
import type { TechniqueStatus } from "@/lib/types";
import { RULESET_LABELS } from "@/lib/types";
import { getMediaForTechnique } from "@/lib/data/media";
import { VideoLinks } from "@/components/coach/VideoLinks";

export default function TechniqueDetailClient({ id }: { id: string }) {
  const technique = getTechniqueById(id);
  const { state, setTechniqueStatus } = useApp();

  if (!technique) {
    return (
      <AppShell title="Technique" subtitle="Not found">
        <EmptyState
          title="Technique not found"
          body="That card is missing from the guide."
          action={
            <Link
              href="/techniques"
              className="inline-flex min-h-[44px] items-center rounded-xl bg-lime-400 px-4 text-sm font-bold text-slate-950"
            >
              Back to guide
            </Link>
          }
        />
      </AppShell>
    );
  }

  const mod = MODULES.find((m) => m.id === technique.moduleId);
  const status: TechniqueStatus =
    state.techniqueProgress[technique.id] ?? "not_started";

  const media = getMediaForTechnique(technique.id);


  return (
    <AppShell title={technique.name} subtitle={mod?.title}>
      <div className="space-y-4">
        <Link
          href="/techniques"
          className="inline-flex min-h-[40px] items-center text-sm font-medium text-lime-400"
        >
          ← All techniques
        </Link>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-300">
            {RULESET_LABELS[technique.ruleSet]}
          </span>
        </div>


        {media?.videos?.length ? (
          <Card className="border-lime-500/20">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Watch (references)
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
              Public instructionals that match this card. Educational references only —
              confirm details with your gym coach.
            </p>
            <div className="mt-3">
              <VideoLinks videos={media.videos} />
            </div>
          </Card>
        ) : null}

        <Card className="border-lime-500/20">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-lime-500">
            Why it fits lanky frames
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-200">
            {technique.whyLanky}
          </p>
        </Card>

        {technique.transferNote ? (
          <Card className="border-amber-500/20 bg-amber-400/5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-400">
              Gi ↔ No-Gi callout
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-200">
              {technique.transferNote}
            </p>
          </Card>
        ) : null}

        <Card>
          <TechniqueStatusSelect
            value={status}
            onChange={(s) => setTechniqueStatus(technique.id, s)}
          />
        </Card>

        <Card>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Steps / cues
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-200">
            {technique.steps.map((step) => (
              <li key={step.slice(0, 32)}>{step}</li>
            ))}
          </ol>
          <div className="mt-4 rounded-xl bg-slate-950/80 p-3">
            <p className="text-xs font-semibold text-lime-400">Quick cues</p>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
              {technique.cues.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Common mistakes
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-300">
            {technique.mistakes.map((m) => (
              <li key={m}>• {m}</li>
            ))}
          </ul>
        </Card>
      </div>
    </AppShell>
  );
}
