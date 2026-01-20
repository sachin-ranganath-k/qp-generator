import { pickRandom } from "../utils/questionUtils";

export default function Section({ marks, bank, count, usedSet, onSelect }) {
  if (!bank[marks]) return null;

  return (
    <div>
      <h3>{marks} Mark Questions</h3>
      {Object.keys(bank[marks]).map(ch => (
        <button
          key={ch}
          onClick={() => onSelect(pickRandom(bank[marks][ch], count, usedSet))}
          style={{ marginRight: 10 }}
        >
          Chapter {ch}
        </button>
      ))}
    </div>
  );
}