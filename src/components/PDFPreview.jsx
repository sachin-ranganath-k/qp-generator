export default function PDFPreview({ blob }) {
  if (!blob) return null;
  return (
    <iframe
      src={URL.createObjectURL(blob)}
      width="100%"
      height="500"
      title="PDF Preview"
    />
  );
}