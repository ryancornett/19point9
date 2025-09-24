import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fmt1, sum } from "../utils/time";
import { generateTargets } from "../game/targets";

export type GameState = {
  isRunning: boolean;
  startTs: number | null;
  elapsed: number;
  targets: number[];
  tapIdx: number;
  taps: number[];
  diffs: number[];
  nextTarget: number;
  lastTarget: number;
  total: number;
  canTap: boolean;
  canStart: boolean;
  buttonDisabled: boolean;
  targetCount: number;
  seed: number;
  toast: string | null;
};

export type GameActions = {
  handleStartOrTap: () => void;
  handleReset: () => void;
  setTargetCount: (n: number) => void;
  reseed: () => void;
  clearToast: () => void;
};

export function useNineteenPointNine(initialTargets = 9) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTs, setStartTs] = useState<number | null>(null);
  const [nowTs, setNowTs] = useState<number>(0);
  const [seed, setSeed] = useState<number>(() =>
    Math.floor(Math.random() * 1e9)
  );
  const [targetCount, setTargetCount] = useState<number>(initialTargets);
  const [tapIdx, setTapIdx] = useState(0);
  const [taps, setTaps] = useState<number[]>([]);
  const [diffs, setDiffs] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const targets = useMemo(
    () => generateTargets(targetCount, seed),
    [targetCount, seed]
  );
  const lastTarget = targets[targets.length - 1];

  // Elapsed (seconds), allow going beyond lastTarget
  const elapsed = useMemo(() => {
    if (!isRunning || startTs == null) return 0;
    const raw = (nowTs - startTs) / 1000;
    return Math.max(0, raw);
  }, [isRunning, startTs, nowTs]);

  // RAF ticker
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!isRunning) return;
    const tick = (t: number) => {
      setNowTs(t);
      if (rafRef.current != null) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isRunning]);

  // Auto stop: when all targets tapped OR cutoff (19.9 + 1.1)
  useEffect(() => {
    if (!isRunning) return;
    const cutoff = lastTarget + 1.1;

    if (tapIdx >= targets.length) {
      setIsRunning(false);
      return;
    }

    if (elapsed >= cutoff) {
      const missTime = cutoff;
      const remainingTargets = targets.slice(tapIdx);

      setTaps((prev) => [...prev, ...remainingTargets.map(() => missTime)]);
      setDiffs((prev) => [
        ...prev,
        ...remainingTargets.map((t) => Math.abs(missTime - t)),
      ]);

      setTapIdx(targets.length);
      setIsRunning(false);
      setToast("Time! Grace window ended.");
    }
  }, [isRunning, elapsed, tapIdx, targets, lastTarget]);

  // Start or Tap
  const handleStartOrTap = useCallback(() => {
    if (!isRunning && startTs == null) {
      // Start
      setTaps([]);
      setDiffs([]);
      setTapIdx(0);
      const now = performance.now();
      setStartTs(now);
      setNowTs(now);
      setIsRunning(true);
      return;
    }

    // Tap
    if (!isRunning || startTs == null || tapIdx >= targets.length) return;
    const t = (nowTs - startTs) / 1000;
    const diff = Math.abs(t - targets[tapIdx]);
    setTaps((prev) => [...prev, t]);
    setDiffs((prev) => [...prev, diff]);
    setTapIdx((i) => i + 1);
  }, [isRunning, startTs, nowTs, tapIdx, targets]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setStartTs(null);
    setNowTs(0);
    setTaps([]);
    setDiffs([]);
    setTapIdx(0);
  }, []);

  // Spacebar support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleStartOrTap();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleStartOrTap]);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 1500);
    return () => clearTimeout(id);
  }, [toast]);

  const nextTarget = targets[Math.min(tapIdx, targets.length - 1)];
  const total = sum(diffs);
  const canTap = isRunning && tapIdx < targets.length;
  const canStart = !isRunning && startTs == null;
  const buttonDisabled = !(canTap || canStart);

  const reseed = () => setSeed(Math.floor(Math.random() * 1e9));
  const clearToast = () => setToast(null);

  const state: GameState = {
    isRunning,
    startTs,
    elapsed,
    targets,
    tapIdx,
    taps,
    diffs,
    nextTarget,
    lastTarget,
    total,
    canTap,
    canStart,
    buttonDisabled,
    targetCount,
    seed,
    toast,
  };

  const actions: GameActions = {
    handleStartOrTap,
    handleReset,
    setTargetCount,
    reseed,
    clearToast,
  };

  return { state, actions } as const;
}

// Re-export fmt1 for UI components
export { fmt1 };
