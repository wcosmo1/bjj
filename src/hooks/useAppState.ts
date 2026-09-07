"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createDefaultState,
  loadState,
  saveState,
  uid,
} from "@/lib/storage";
import type {
  AppState,
  CurriculumProgressMap,
  Profile,
  SessionLog,
  TechniqueProgressMap,
  TechniqueStatus,
} from "@/lib/types";
import { TECHNIQUES } from "@/lib/data/techniques";

export function useAppState() {
  const [state, setState] = useState<AppState>(createDefaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  const updateProfile = useCallback((profile: Profile) => {
    setState((s) => ({ ...s, profile }));
  }, []);

  const setTechniqueStatus = useCallback(
    (techniqueId: string, status: TechniqueStatus) => {
      setState((s) => {
        const techniqueProgress: TechniqueProgressMap = {
          ...s.techniqueProgress,
        };
        if (status === "not_started") {
          delete techniqueProgress[techniqueId];
        } else {
          techniqueProgress[techniqueId] = status;
        }
        return { ...s, techniqueProgress };
      });
    },
    []
  );

  const addSession = useCallback(
    (input: Omit<SessionLog, "id">) => {
      const session: SessionLog = { ...input, id: uid("session") };
      setState((s) => ({
        ...s,
        sessions: [session, ...s.sessions].sort((a, b) =>
          a.date < b.date ? 1 : a.date > b.date ? -1 : 0
        ),
      }));
      return session;
    },
    []
  );

  const deleteSession = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      sessions: s.sessions.filter((x) => x.id !== id),
    }));
  }, []);

  const toggleCurriculumItem = useCallback((itemId: string) => {
    setState((s) => {
      const curriculumProgress: CurriculumProgressMap = {
        ...s.curriculumProgress,
      };
      curriculumProgress[itemId] = !curriculumProgress[itemId];
      return { ...s, curriculumProgress };
    });
  }, []);

  const stats = useMemo(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const diff = day === 0 ? 6 : day - 1;
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - diff);
    const weekKey = startOfWeek.toISOString().slice(0, 10);

    const sessionsThisWeek = state.sessions.filter((s) => s.date >= weekKey);

    const dates = new Set(state.sessions.map((s) => s.date));
    let streak = 0;
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    // If no session today, start from yesterday for streak continuity
    const todayKey = cursor.toISOString().slice(0, 10);
    if (!dates.has(todayKey)) {
      cursor.setDate(cursor.getDate() - 1);
    }
    while (true) {
      const key = cursor.toISOString().slice(0, 10);
      if (!dates.has(key)) break;
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    const statusCounts = {
      learning: 0,
      drilling: 0,
      can_hit: 0,
    };
    for (const t of TECHNIQUES) {
      const st = state.techniqueProgress[t.id];
      if (st === "learning") statusCounts.learning += 1;
      if (st === "drilling") statusCounts.drilling += 1;
      if (st === "can_hit") statusCounts.can_hit += 1;
    }

    return {
      sessionsThisWeek: sessionsThisWeek.length,
      streak,
      statusCounts,
      totalSessions: state.sessions.length,
    };
  }, [state.sessions, state.techniqueProgress]);

  const nextFocus = useMemo(() => {
    const learning = TECHNIQUES.find(
      (t) => state.techniqueProgress[t.id] === "learning"
    );
    if (learning) return learning;
    const notStarted = TECHNIQUES.find((t) => !state.techniqueProgress[t.id]);
    return notStarted ?? TECHNIQUES[0];
  }, [state.techniqueProgress]);

  return {
    state,
    hydrated,
    updateProfile,
    setTechniqueStatus,
    addSession,
    deleteSession,
    toggleCurriculumItem,
    stats,
    nextFocus,
  };
}
