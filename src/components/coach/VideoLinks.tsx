"use client";

import type { TechniqueVideo } from "@/lib/types";
import { youtubeThumb } from "@/lib/data/media";

export function VideoLinks({
  videos,
  compact = false,
}: {
  videos: TechniqueVideo[];
  compact?: boolean;
}) {
  if (!videos.length) return null;

  return (
    <ul className={compact ? "space-y-2" : "space-y-3"}>
      {videos.map((v) => {
        const thumb = youtubeThumb(v.url);
        return (
          <li
            key={v.url + v.title}
            className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/70"
          >
            <div className={compact ? "flex gap-2 p-2" : "flex gap-3 p-3"}>
              {thumb ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumb}
                  alt=""
                  className={
                    compact
                      ? "h-14 w-20 shrink-0 rounded-lg object-cover"
                      : "h-16 w-28 shrink-0 rounded-lg object-cover"
                  }
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {v.title}
                </p>
                {v.instructor ? (
                  <p className="truncate text-[11px] text-slate-400">
                    {v.instructor}
                    {v.ruleSet ? ` · ${v.ruleSet}` : ""}
                  </p>
                ) : null}
                {!compact ? (
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500">
                    {v.whyThisVideo}
                  </p>
                ) : null}
                {v.needsReview ? (
                  <p className="mt-1 text-[10px] font-medium text-amber-400/90">
                    Link flagged for review — verify with your coach.
                  </p>
                ) : null}
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-[36px] items-center rounded-lg bg-lime-400 px-3 text-xs font-bold text-slate-950"
                >
                  Watch ↗
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
