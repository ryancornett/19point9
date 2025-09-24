import { useState } from "react";
import { fmt1 } from "../hooks/useNineteenPointNine";
import copyShareText from "../utils/share";
import { Toast } from "./Toast";

type Props = {
  targets: number[];
  tapIdx: number;
  total: number;
  startTs: number | null;
  canTap: boolean;
};
export function TargetsPills({
  targets,
  tapIdx,
  total,
  startTs,
  canTap,
}: Props) {
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [message, setMessage ]= useState("");
  async function handleShareText() {
    const result = await copyShareText(targets.length, fmt1(total));
    setMessage(result);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {targets.map((t, i) => (
          <span
            key={i}
            className={`px-2.5 py-1 rounded-full text-sm border ${
              i < tapIdx
                ? "bg-emerald-50 border-emerald-600 dark:border-emerald-500"
                : i === tapIdx
                ? "bg-yellow-50 border-amber-600 dark:border-amber-400"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {fmt1(t)}
          </span>
        ))}
      </div>
      <div>
        {isToastVisible && <Toast message={message} />}
        {startTs !== null && !canTap &&
        <button
          className="w-full mt-6 bg-violet-800 text-slate-100 rounded py-1 px-2 dark:bg-violet-400 dark:text-gray-900 cursor-pointer hover:bg-violet-700 dark:hover:bg-violet-500"
          onClick={handleShareText}
        >
          Share
        </button>
        }
      </div>
      
    </>
  );
}
