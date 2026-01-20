import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

export async function generatePDF(questions, header) {
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);

  // Use a local Unicode font you copied from system
  const res = await fetch("/fonts/DejaVuSans.ttf");
  if (!res.ok) {
    throw new Error("Font not found in public/fonts");
  }

  const fontBytes = await res.arrayBuffer();
  const font = await pdf.embedFont(fontBytes);

  let page = pdf.addPage();
  let y = 780;

  // Header
  page.drawText(header.college || "", { x: 50, y, size: 14, font });
  y -= 20;
  page.drawText(
    `Subject: ${header.subject || ""}    Time: ${header.time || ""}    Max Marks: ${header.marks || ""}`,
    { x: 50, y, size: 11, font }
  );

  y -= 30;

  // Questions
  questions.forEach((q, i) => {
    if (y < 50) {
      page = pdf.addPage();
      y = 750;
    }

    page.drawText(`${i + 1}. (${q.marks}M) ${q.text}`, {
      x: 50,
      y,
      size: 12,
      font
    });

    y -= 24;
  });

  const bytes = await pdf.save();
  return new Blob([bytes], { type: "application/pdf" });
}
