"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clearCoachMemory,
  createDefaultCoachState,
  deriveMemorySummary,
  loadCoachState,
  saveCoachState,
} from "@/lib/coach/storage";
import {
  composeRetrievalAnswer,
  parseIntent,
  retrieveTechniques,
} from "@/lib/coach/retrieve";
import { callCoachLlm, hasLlmKey } from "@/lib/coach/llm";
import { TECHNIQUES } from "@/lib/data/techniques";
import { uid } from "@/lib/storage";
import type {
  CoachFeedback,
  CoachLlmSettings,
  CoachMemory,
  CoachMessage,
  CoachState,
  Profile,
  TechniqueProgressMap,
} from "@/lib/types";

const techniqueNames = Object.fromEntries(
  TECHNIQUES.map((t) => [t.id, t.name])
);

export function useCoachState() {
  const [state, setState] = useState<CoachState>(createDefaultCoachState);
  const [hydrated, setHydrated] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setState(loadCoachState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCoachState(state);
  }, [state, hydrated]);

  const updateMemory = useCallback((patch: Partial<CoachMemory>) => {
    setState((s) => {
      const memory = { ...s.memory, ...patch };
      memory.summary = deriveMemorySummary(memory, techniqueNames);
      return { ...s, memory };
    });
  }, []);

  const updateLlm = useCallback((llm: CoachLlmSettings) => {
    setState((s) => ({ ...s, llm }));
  }, []);

  const setFeedback = useCallback((messageId: string, feedback: CoachFeedback) => {
    setState((s) => ({
      ...s,
      messages: s.messages.map((m) =>
        m.id === messageId ? { ...m, feedback } : m
      ),
    }));
  }, []);

  const clearMemory = useCallback(() => {
    const next = clearCoachMemory(true);
    setState(next);
  }, []);

  const ask = useCallback(
    async (
      text: string,
      opts: { profile: Profile; techniqueProgress: TechniqueProgressMap }
    ) => {
      const trimmed = text.trim();
      if (!trimmed || busy) return;

      setBusy(true);
      setError(null);

      const userMsg: CoachMessage = {
        id: uid("msg"),
        role: "user",
        content: trimmed,
        createdAt: new Date().toISOString(),
      };

      setState((s) => ({ ...s, messages: [...s.messages, userMsg] }));

      try {
        const intent = parseIntent(trimmed, state.memory);
        const cards = retrieveTechniques(
          intent,
          opts.techniqueProgress,
          state.memory,
          4
        );

        // Update asked counts
        setState((s) => {
          const asked = { ...s.memory.askedTechniqueCounts };
          for (const c of cards) {
            asked[c.technique.id] = (asked[c.technique.id] ?? 0) + 1;
          }
          const memory = {
            ...s.memory,
            askedTechniqueCounts: asked,
            preferredRuleSet:
              intent.ruleSet !== "any"
                ? intent.ruleSet
                : s.memory.preferredRuleSet,
          };
          memory.summary = deriveMemorySummary(memory, techniqueNames);
          return { ...s, memory };
        });

        let content: string;
        let mode: "retrieval" | "llm" = "retrieval";

        if (hasLlmKey(state.llm)) {
          try {
            const history = state.messages
              .concat(userMsg)
              .filter((m) => m.role === "user" || m.role === "assistant")
              .map((m) => ({ role: m.role, content: m.content }));
            content = await callCoachLlm({
              settings: state.llm,
              profile: opts.profile,
              cards,
              memorySummary: state.memory.summary,
              userMessage: trimmed,
              history,
            });
            mode = "llm";
          } catch (e) {
            content = composeRetrievalAnswer(
              intent,
              cards,
              opts.profile.name
            );
            setError(
              e instanceof Error
                ? e.message
                : "LLM failed — used offline coach instead."
            );
          }
        } else {
          content = composeRetrievalAnswer(intent, cards, opts.profile.name);
        }

        const assistantMsg: CoachMessage = {
          id: uid("msg"),
          role: "assistant",
          content,
          createdAt: new Date().toISOString(),
          techniqueIds: cards.map((c) => c.technique.id),
          mode,
        };

        setState((s) => ({
          ...s,
          messages: [...s.messages, assistantMsg],
        }));
      } finally {
        setBusy(false);
      }
    },
    [busy, state.llm, state.memory, state.messages]
  );

  const llmEnabled = useMemo(() => hasLlmKey(state.llm), [state.llm]);

  return {
    state,
    hydrated,
    busy,
    error,
    llmEnabled,
    ask,
    setFeedback,
    updateMemory,
    updateLlm,
    clearMemory,
    setError,
  };
}
