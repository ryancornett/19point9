import { fmt1 } from "../hooks/useNineteenPointNine";


type Props = { elapsed: number; nextTarget: number };
export function TimerDisplay({ elapsed, nextTarget }: Props) {
return (
<div className="text-center dark:text-slate-100">
<div className="text-6xl font-black tabular-nums tracking-tight stylish">
<span>{fmt1(elapsed)}</span>
<span className="text-2xl ml-3 align-[10%] opacity-70">/ {fmt1(nextTarget)}</span>
</div>
<div className="mt-2 text-sm opacity-70">seconds · next target time</div>
</div>
);
}