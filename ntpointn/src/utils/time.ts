export function fmt1(n: number) {
return (Math.round(n * 10) / 10).toFixed(1);
}


export function clamp(n: number, min: number, max: number) {
return Math.min(max, Math.max(min, n));
}


export function sum(arr: number[]) {
return arr.reduce((a, b) => a + b, 0);
}