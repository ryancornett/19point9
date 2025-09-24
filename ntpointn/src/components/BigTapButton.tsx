type Props = {
startTs: number | null;
canTap: boolean;
buttonDisabled: boolean;
onClick: () => void;
};


export function BigTapButton({ startTs, canTap, buttonDisabled, onClick }: Props) {
return (
<button
onClick={onClick}
className={`stylish w-full max-w-sm rounded-2xl px-6 py-5 text-xl font-semibold transition active:scale-[0.9] ${
buttonDisabled ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-gray-900 text-white"
}`}
disabled={buttonDisabled}
title={
startTs == null
? "Start the round"
: canTap
? "Tap as close as possible to the next target"
: "Round over"
}
>
{startTs == null ? "Start" : canTap ? "Tap!" : "Round Over"}
</button>
);
}