import { useState } from "react";
import FileUpload from "./FileUpload";
import ExamHeader from "./ExamHeader";
import Section from "./Section";
import SelectedQuestions from "./SelectedQuestions";
import { generatePDF } from "../utils/pdfGenerator";

const MARKS = [1, 2, 3, 5];

export default function CreateQP() {
    const [bank, setBank] = useState({});
  const [selected, setSelected] = useState([]);
  const [usedSet] = useState(() => new Set());

  const [counts, setCounts] = useState({ 1: 2, 2: 2, 3: 2, 5: 1 });
  const [header, setHeader] = useState({
    college: "",
    subject: "",
    time: "",
    marks: ""
  });

  const handleDownload = async () => {
    if (!selected.length) {
      alert("No questions selected");
      return;
    }

    const blob = await generatePDF(selected, header);

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "question-paper.pdf";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: 20 }}>
      <h2>Question Paper Generator</h2>

      <FileUpload onParsed={setBank} />
      <ExamHeader header={header} setHeader={setHeader} />

      <h3>Question Count</h3>
      {MARKS.map(m => (
        <div key={m}>
          {m} Mark:
          <input
            type="number"
            min="1"
            value={counts[m]}
            onChange={e =>
              setCounts({ ...counts, [m]: Number(e.target.value) })
            }
            style={{ width: 60, marginLeft: 10 }}
          />
        </div>
      ))}

      {MARKS.map(m => (
        <Section
          key={m}
          marks={m}
          bank={bank}
          count={counts[m]}
          usedSet={usedSet}
          onSelect={qs => setSelected(prev => [...prev, ...qs])}
        />
      ))}

      <SelectedQuestions questions={selected} />

      {selected.length > 0 && (
        <button
          onClick={handleDownload}
          style={{ marginTop: 20, padding: "10px 20px" }}
        >
          Download PDF
        </button>
      )}
    </div>
  );
}