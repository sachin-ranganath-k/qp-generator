import mammoth from "mammoth";

export async function parseDocx(file) {
  const buffer = await file.arrayBuffer();
  const result = await mammoth.convertToHtml({ arrayBuffer: buffer });
  return result.value;
}

export function extractQuestions(html) {
  const dom = new DOMParser().parseFromString(html, "text/html");
  const rows = dom.querySelectorAll("table tr");
  const questions = [];

  rows.forEach((row, i) => {
    if (i === 0) return;
    const cells = row.querySelectorAll("td");
    if (cells.length < 4) return;

    questions.push({
      chapter: Number(cells[1].innerText),
      marks: Number(cells[2].innerText),
      text: cells[3].innerText.trim()
    });
  });

  return questions;
}

export function buildQuestionBank(questions) {
  const bank = {};
  questions.forEach(q => {
    bank[q.marks] ??= {};
    bank[q.marks][q.chapter] ??= [];
    bank[q.marks][q.chapter].push(q);
  });
  return bank;
}