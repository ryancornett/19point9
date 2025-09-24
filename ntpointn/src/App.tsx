import { useNineteenPointNine } from "./hooks/useNineteenPointNine";
import { TimerDisplay } from "./components/TimerDisplay";
import { ProgressBar } from "./components/ProgressBar";
import { BigTapButton } from "./components/BigTapButton";
import { Controls } from "./components/Controls";
import { TargetsPills } from "./components/TargetsPills";
import { TapsList } from "./components/TapsList";
import { Toast } from "./components/Toast";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path.js";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.1/cdn/"
);

export default function App() {
  const { state, actions } = useNineteenPointNine(9);
  const {
    isRunning,
    startTs,
    elapsed,
    targets,
    tapIdx,
    taps,
    nextTarget,
    lastTarget,
    total,
    canTap,
    buttonDisabled,
    targetCount,
    toast,
  } = state;

  let playCount = 0;
  useEffect(() => {
    playCount++;
    console.log(playCount);
  }, [isRunning]);

  const THEME_KEY = "npn:theme"; // "dark" | "light"

  function getInitialDark(): boolean {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") return true;
    if (saved === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  const [isDark, setIsDark] = useState<boolean>(getInitialDark);
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  const toggleDark = () => setIsDark((d) => !d);
  const baseClasses =
    "min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6 dark:bg-slate-800";

  return (
    <div className={`${isDark ? "dark" : ""} ${baseClasses}`}>
      <div className="w-full max-w-xl space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold dark:text-slate-100 stylish">19point9</h1>
          <div className="text-sm opacity-70 dark:text-slate-100">
            It's tappin' time
          </div>
        </header>

        <Controls
          isDark={isDark}
          setIsDark={toggleDark}
          isRunning={isRunning}
          startTs={startTs}
          targetCount={targetCount}
          setTargetCount={actions.setTargetCount}
          reseed={actions.reseed}
          onReset={actions.handleReset}
        />

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-700">
          <TimerDisplay elapsed={elapsed} nextTarget={nextTarget} />
          <ProgressBar value={elapsed} max={lastTarget} />
          <div className="mt-6 flex justify-center">
            <BigTapButton
              startTs={startTs}
              canTap={canTap}
              buttonDisabled={buttonDisabled}
              onClick={actions.handleStartOrTap}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-700">
            <h2 className="font-semibold mb-3 dark:text-slate-100">
              Target sequence
            </h2>
            <TargetsPills
              targets={targets}
              tapIdx={tapIdx}
              total={total}
              startTs={startTs}
              canTap={canTap}
            />
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-700">
            <TapsList taps={taps} targets={targets} total={total} />
          </div>
        </div>

        <footer className="text-xs opacity-60 dark:text-slate-100 text-center">
          First click or space bar press starts the timer, then tap or press as
          closely as possible to each target.
        </footer>
      </div>

      <Toast message={toast} />
      <Footer />
    </div>
  );
}
