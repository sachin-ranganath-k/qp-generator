export default function ExamHeader({ header, setHeader }) {
  return (
    <div>
      <h3>Exam Details</h3>
      {["college", "subject", "time", "marks"].map(field => (
        <input
          key={field}
          placeholder={field.toUpperCase()}
          value={header[field]}
          onChange={e => setHeader({ ...header, [field]: e.target.value })}
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        />
      ))}
    </div>
  );
}