
type Props = { message: string | null };
export function Toast({ message }: Props) {
if (!message) return null;
return (
<div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-3 py-2 rounded-full shadow-lg">
{message}
</div>
);
}