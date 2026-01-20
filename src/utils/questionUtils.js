export function pickRandom(questions, count, usedSet) {
  const available = questions.filter(q => !usedSet.has(q.text));
  if (available.length < count) {
    alert("Not enough unique questions");
    return [];
  }
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);
  selected.forEach(q => usedSet.add(q.text));
  return selected;
}