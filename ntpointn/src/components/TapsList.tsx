import { fmt1 } from "../hooks/useNineteenPointNine";

type Props = { taps: number[]; targets: number[]; total: number };
export function TapsList({ taps, targets, total }: Props) {
  return (
    <div>
      <h2 className="font-semibold mb-3 dark:text-slate-100">Your taps</h2>
      {taps.length === 0 ? (
        <div className="text-sm opacity-70 dark:text-slate-100">
          No taps yet (click start or press space bar).
        </div>
      ) : (
        <ul className="space-y-2">
          {taps.map((t, i) => {
            const target = targets[i];
            const d = Math.abs(t - target);
            const perfect = d < 0.051; // ~50ms grace
            return (
              <li
                key={i}
                className="flex items-center justify-between text-sm dark:text-slate-100"
              >
                <span className="tabular-nums">
                  #{i + 1}: {fmt1(t)}
                </span>
                <span
                  className={`tabular-nums font-medium ${
                    perfect
                      ? "text-emerald-600 dark:text-emerald-500"
                      : d <= 0.3
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-500/90"
                  }`}
                >
                  Δ {fmt1(d)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {taps.length > 0 && (
        <div className="mt-3 text-sm">
          <div className="flex items-center justify-between font-medium dark:text-slate-100">
            <span>Total difference</span>
            <span className="tabular-nums">
              <span
                className={`${
                  Number(fmt1(total)) < 1
                    ? "text-emerald-600 dark:text-emerald-500"
                    : Number(fmt1(total)) >= 1 && Number(fmt1(total)) < 1.7
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-rose-600 dark:text-rose-500/90"
                }`}
              >
                Δ
              </span>{" "}
              {fmt1(total)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
