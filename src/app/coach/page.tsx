"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Card } from "@/components/Card";
import { Disclaimer } from "@/components/Disclaimer";
import { TechniqueCoachCard } from "@/components/coach/TechniqueCoachCard";
import { useApp } from "@/components/AppProvider";
import { useCoachState } from "@/hooks/useCoachState";

const CHIPS = [
  "I'm getting smashed in side control",
  "Triangle from closed guard gi",
  "No-gi I'm too light to pass",
  "Spider guard keeps collapsing",
  "Help me take the back and finish RNC",
  "Butterfly / SLX for long legs",
];

function renderMarkdownLite(text: string) {
  // Extremely small subset: **bold**, newlines, markdown links
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = [];
    let rest = line;
    const linkRe = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/;
    const boldRe = /\*\*([^*]+)\*\*/;
    let key = 0;
    while (rest.length) {
      const linkMatch = rest.match(linkRe);
      const boldMatch = rest.match(boldRe);
      const linkIdx = linkMatch?.index ?? -1;
      const boldIdx = boldMatch?.index ?? -1;
      let nextIdx = -1;
      let kind: "link" | "bold" | null = null;
      if (linkIdx >= 0 && (boldIdx < 0 || linkIdx <= boldIdx)) {
        nextIdx = linkIdx;
        kind = "link";
      } else if (boldIdx >= 0) {
        nextIdx = boldIdx;
        kind = "bold";
      }
      if (kind === null || nextIdx < 0) {
        parts.push(rest);
        break;
      }
      if (nextIdx > 0) parts.push(rest.slice(0, nextIdx));
      if (kind === "link" && linkMatch) {
        parts.push(
          <a
            key={`${i}-${key++}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lime-400 underline"
          >
            {linkMatch[1]}
          </a>
        );
        rest = rest.slice(nextIdx + linkMatch[0].length);
      } else if (kind === "bold" && boldMatch) {
        parts.push(
          <strong key={`${i}-${key++}`} className="font-bold text-white">
            {boldMatch[1]}
          </strong>
        );
        rest = rest.slice(nextIdx + boldMatch[0].length);
      }
    }
    return (
      <p key={i} className={line.trim() === "" ? "h-2" : "text-sm leading-relaxed"}>
        {parts}
      </p>
    );
  });
}

export default function CoachPage() {
  const { state: appState } = useApp();
  const {
    state,
    hydrated,
    busy,
    error,
    llmEnabled,
    ask,
    setFeedback,
    updateMemory,
    clearMemory,
  } = useCoachState();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages.length, busy]);

  async function submit(text: string) {
    setInput("");
    await ask(text, {
      profile: appState.profile,
      techniqueProgress: appState.techniqueProgress,
    });
  }

  return (
    <AppShell title="AI Coach" subtitle="Learns from your questions · video-backed">
      <div className="space-y-4">
        <Card className="border-lime-500/20 bg-lime-400/5">
          <p className="text-sm leading-relaxed text-slate-200">
            Always-on retrieval coach over your Long Game cards + curated public
            YouTube. Optional LLM in{" "}
            <Link href="/profile" className="font-semibold text-lime-400">
              Profile
            </Link>{" "}
            if you paste your own API key (stored only on this device).
          </p>
          <p className="mt-2 text-[11px] text-slate-500">
            Mode now:{" "}
            <span className="font-semibold text-slate-300">
              {llmEnabled ? "LLM + retrieval" : "Retrieval (no API key)"}
            </span>
          </p>
        </Card>

        <div className="flex flex-wrap gap-2">
          {CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={busy}
              onClick={() => submit(chip)}
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-left text-[11px] font-medium text-slate-200 hover:border-lime-500/40 hover:text-lime-300 disabled:opacity-50"
            >
              {chip}
            </button>
          ))}
        </div>

        <Card>
          <label className="block text-xs font-medium text-slate-400">
            Preferred rule set (biases advice)
          </label>
          <div className="mt-2 flex gap-2">
            {(["any", "gi", "nogi"] as const).map((rs) => (
              <button
                key={rs}
                type="button"
                onClick={() => updateMemory({ preferredRuleSet: rs })}
                className={`min-h-[40px] flex-1 rounded-xl text-xs font-bold ${
                  state.memory.preferredRuleSet === rs
                    ? "bg-lime-400 text-slate-950"
                    : "bg-slate-800 text-slate-300"
                }`}
              >
                {rs === "any" ? "Any" : rs === "gi" ? "Gi" : "No-Gi"}
              </button>
            ))}
          </div>
          <label className="mt-3 block text-xs font-medium text-slate-400">
            Struggle notes (remembered locally)
          </label>
          <textarea
            rows={2}
            className="mt-1.5 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none ring-lime-400/40 focus:ring-2"
            placeholder="e.g. stacked in closed guard, can't finish triangle angle…"
            value={state.memory.notes}
            onChange={(e) => {
              const notes = e.target.value;
              const tags = notes
                .split(/[,;\n]+/)
                .map((t) => t.trim())
                .filter(Boolean)
                .slice(0, 8);
              updateMemory({ notes, struggleTags: tags });
            }}
          />
          {state.memory.summary ? (
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Memory: {state.memory.summary}
            </p>
          ) : null}
        </Card>

        <div className="space-y-3">
          {!hydrated ? (
            <p className="text-sm text-slate-500">Loading coach memory…</p>
          ) : state.messages.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-300">
                Ask a situation. I&apos;ll map it to lanky technique cards and
                attach Watch links.
              </p>
            </Card>
          ) : null}

          {state.messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl px-3 py-3 ${
                m.role === "user"
                  ? "ml-6 bg-slate-800 text-slate-100"
                  : "mr-2 border border-slate-800 bg-slate-900/90 text-slate-200"
              }`}
            >
              <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                {m.role === "user"
                  ? "You"
                  : m.mode === "llm"
                    ? "Coach · LLM"
                    : "Coach · retrieval"}
              </p>
              {m.role === "assistant" ? (
                <div className="space-y-1">{renderMarkdownLite(m.content)}</div>
              ) : (
                <p className="text-sm leading-relaxed">{m.content}</p>
              )}

              {m.role === "assistant" && m.techniqueIds?.length ? (
                <div className="mt-3 space-y-2">
                  {m.techniqueIds.map((id) => (
                    <TechniqueCoachCard key={id} techniqueId={id} />
                  ))}
                </div>
              ) : null}

              {m.role === "assistant" ? (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFeedback(m.id, "helpful")}
                    className={`min-h-[36px] rounded-lg px-3 text-xs font-bold ${
                      m.feedback === "helpful"
                        ? "bg-lime-400 text-slate-950"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    👍 Helpful
                  </button>
                  <button
                    type="button"
                    onClick={() => setFeedback(m.id, "not_helpful")}
                    className={`min-h-[36px] rounded-lg px-3 text-xs font-bold ${
                      m.feedback === "not_helpful"
                        ? "bg-rose-400 text-slate-950"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    👎 Not really
                  </button>
                </div>
              ) : null}
            </div>
          ))}

          {busy ? (
            <p className="text-sm text-slate-400">Coach is thinking…</p>
          ) : null}
          {error ? (
            <p className="rounded-xl border border-amber-500/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
              {error}
            </p>
          ) : null}
          <div ref={bottomRef} />
        </div>

        <form
          className="sticky bottom-[72px] z-20 -mx-1 space-y-2 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 backdrop-blur"
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) void submit(input);
          }}
        >
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the situation…"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none ring-lime-400/40 focus:ring-2"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="flex min-h-[48px] w-full items-center justify-center rounded-xl bg-lime-400 text-sm font-bold text-slate-950 disabled:opacity-50"
          >
            Ask coach
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            if (
              window.confirm(
                "Clear coach chat + learning memory on this device? API key settings are kept."
              )
            ) {
              clearMemory();
            }
          }}
          className="w-full min-h-[44px] rounded-xl border border-slate-700 text-xs font-medium text-slate-400"
        >
          Clear coach memory
        </button>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
