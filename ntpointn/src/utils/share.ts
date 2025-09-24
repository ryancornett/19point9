export default async function copyShareText(targets: number, delta: string) {
    const deltaNum = Number(delta);
    const grade = deltaNum <= 1 ? '🟩' : deltaNum > 1.7 ? '🟥' : '🟨';
    
  const text = `I tapped ${targets} targets
in #19point9 seconds
with a ${grade}delta of ${delta}
Play at 19point9.com
1️⃣9️⃣.9️⃣`;

  try {
    await navigator.clipboard.writeText(text);
    return "Copied!";
  } catch (err) {
    return "Try again";
  }
}
