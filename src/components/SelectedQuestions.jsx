export default function SelectedQuestions({ questions }) {
  if (!questions.length) return null;

  return (
    <div>
      <h3>Selected Questions</h3>
      <ol>
        {questions.map((q, i) => (
          <li key={i}>
            ({q.marks}M) {q.text}
          </li>
        ))}
      </ol>
    </div>
  );
}