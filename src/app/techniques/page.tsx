"use client";

import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { StatusBadge } from "@/components/StatusBadge";
import { useApp } from "@/components/AppProvider";
import { MODULES } from "@/lib/data/modules";
import { getTechniquesByModule } from "@/lib/data/techniques";

export default function TechniquesPage() {
  const { state } = useApp();
  const modules = [...MODULES].sort((a, b) => a.order - b.order);

  return (
    <AppShell title="Technique guide" subtitle="Built for long frames">
      <div className="space-y-5">
        {modules.map((mod) => {
          const techniques = getTechniquesByModule(mod.id);
          return (
            <section key={mod.id} className="space-y-3">
              <div>
                <h2 className="text-lg font-bold text-white">{mod.title}</h2>
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
                        <p className="font-semibold text-white">{t.name}</p>
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
