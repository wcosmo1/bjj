"use client";

import { BottomNav } from "./BottomNav";

export function AppShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/90 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400/15 text-sm font-black text-lime-400">
            LG
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lime-500/80">
              Long Game
            </p>
            {title ? (
              <h1 className="truncate text-lg font-bold leading-tight text-white">
                {title}
              </h1>
            ) : (
              <h1 className="text-lg font-bold leading-tight text-white">
                Lanky BJJ
              </h1>
            )}
            {subtitle ? (
              <p className="truncate text-xs text-slate-400">{subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>
      <main className="flex-1 px-4 pb-28 pt-4">{children}</main>
      <BottomNav />
      <p className="sr-only">
        Educational grappling guidance only. Not medical advice.
      </p>
    </div>
  );
}
