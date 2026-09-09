"use client";

import Link from "next/link";
import { getMediaForTechnique } from "@/lib/data/media";
import { getTechniqueById } from "@/lib/data/techniques";
import { RULESET_LABELS } from "@/lib/types";
import { VideoLinks } from "./VideoLinks";

export function TechniqueCoachCard({ techniqueId }: { techniqueId: string }) {
  const technique = getTechniqueById(techniqueId);
  if (!technique) return null;
  const media = getMediaForTechnique(techniqueId);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <Link
            href={`/techniques/${technique.id}`}
            className="text-sm font-bold text-lime-400 hover:underline"
          >
            {technique.name}
          </Link>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
            {RULESET_LABELS[technique.ruleSet]}
          </p>
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-300">
        {technique.whyLanky}
      </p>
      {media?.videos?.length ? (
        <div className="mt-3">
          <VideoLinks videos={media.videos.slice(0, 2)} compact />
        </div>
      ) : (
        <p className="mt-2 text-[11px] text-slate-500">
          No curated video yet — ask your gym coach to demo this live.
        </p>
      )}
    </div>
  );
}
