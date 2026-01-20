import { parseDocx, extractQuestions, buildQuestionBank } from "../utils/docParser";

export default function FileUpload({ onParsed }) {
  const handleUpload = async e => {
    const file = e.target.files[0];
    if (!file || !file.name.endsWith(".docx")) {
      alert("Upload .docx file only");
      return;
    }
    const html = await parseDocx(file);
    const questions = extractQuestions(html);
    onParsed(buildQuestionBank(questions));
  };

  return (
    <div>
      <h3>Upload Question Bank (.docx)</h3>
      <input type="file" accept=".docx" onChange={handleUpload} />
    </div>
  );
}