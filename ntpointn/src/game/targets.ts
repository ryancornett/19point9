import { seededRng } from "../utils/rng";


/**
* Generate N-1 distinct integer targets between 1..19 (inclusive), sorted,
* then append the quirky final target 19.9.
*/
export function generateTargets(count: number, seed?: number): number[] {
const rng = seededRng(seed ?? Math.random() * 1e9);
const need = Math.max(1, count - 1);
const set = new Set<number>();
while (set.size < need) {
set.add(1 + Math.floor(rng() * 19));
}
const arr = Array.from(set).sort((a, b) => a - b);
arr.push(19.9);
return arr;
}