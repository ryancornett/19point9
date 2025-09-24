export function seededRng(seed: number) {
let s = Math.floor(seed) % 2147483647;
if (s <= 0) s += 2147483646;
return function () {
s = (s * 16807) % 2147483647;
return (s - 1) / 2147483646;
};
}