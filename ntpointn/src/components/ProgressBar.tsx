type Props = { value: number; max: number };
export function ProgressBar({ value, max }: Props) {
const pct = Math.min(100, (value / max) * 100);
return (
<div className="mt-4 h-3 w-full rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
<div className="h-full bg-gray-900 dark:bg-gray-400" style={{ width: `${pct}%` }} />
</div>
);
}