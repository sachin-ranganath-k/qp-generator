// pdf-lib Unicode font integration example
import { PDFDocument } from "pdf-lib";

export async function generatePDFWithUnicode(text) {
  const pdf = await PDFDocument.create();

  const fontBytes = await fetch("/fonts/NotoSansMath-Regular.ttf").then(r => r.arrayBuffer());
  const font = await pdf.embedFont(fontBytes);

  const page = pdf.addPage();
  page.drawText(text, { x: 50, y: 700, size: 12, font });

  const bytes = await pdf.save();
  return new Blob([bytes], { type: "application/pdf" });
}