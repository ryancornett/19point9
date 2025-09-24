import { clamp } from "../utils/time";
import { SlIcon } from '@shoelace-style/shoelace/dist/react';


type Props = {
    isDark: boolean;
  isRunning: boolean;
  startTs: number | null;
  targetCount: number;
  setTargetCount: (n: number) => void;
  reseed: () => void;
  onReset: () => void;
  setIsDark: (b: boolean) => void;
};

export function Controls({
    isDark,
  isRunning,
  startTs,
  targetCount,
  setTargetCount,
  reseed,
  onReset,
  setIsDark
}: Props) {


  return (
    <div className="flex items-center gap-3 flex-wrap">
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-xl border bg-gray-300 dark:bg-slate-700 border-gray-400 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-slate-800 transition duration-150 cursor-pointer"
        disabled={isRunning || startTs == null}
        title="Reset to play again"
      >
        Reset
      </button>
      <div className="ml-auto flex items-center gap-2">
        <label className="text-sm dark:text-slate-100">Targets:</label>
        <input
          type="number"
          className="w-16 rounded-lg border px-2 py-1 dark:text-slate-100"
          min={2}
          max={18}
          value={targetCount}
          onChange={(e) =>
            setTargetCount(clamp(Number(e.target.value) || 5, 5, 15))
          }
          disabled={isRunning}
          title="Total targets (last is 19.9)"
        />
        <button
          className="px-4 py-2 rounded-xl border dark:text-slate-100 bg-gray-300 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800 transition duration-150 cursor-pointer"
          onClick={reseed}
          disabled={isRunning}
          title="Generate new target times"
        >
          Reseed
        </button>
        <button className="dark:text-white cursor-pointer hover:scale-115 transition duration-150 text-xl ml-4" onClick={() => setIsDark(!isDark)}>{isDark ? <SlIcon name="moon-stars"></SlIcon> : <SlIcon name="sun"></SlIcon>}</button>
      </div>
    </div>
  );
}
