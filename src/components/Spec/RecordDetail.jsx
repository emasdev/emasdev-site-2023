import { INTENSITY_LABELS, formatDate, formatTime } from "./specConstants";
import { btnSecondary } from "./specStyles";

function RecordDetail({ record, onBack, onDelete }) {
  const sections = [
    { label: "Situación", icon: "🌍", value: record.situation },
    { label: "Pensamiento", icon: "💭", value: record.thought },
    { label: "Conducta", icon: "⚡", value: record.behavior },
  ];
  if (record.notes)
    sections.push({ label: "Notas", icon: "📝", value: record.notes });

  return (
    <div>
      <button
        onClick={onBack}
        style={{ ...btnSecondary, marginBottom: 24, padding: "8px 16px" }}
      >
        ← Volver
      </button>
      <div style={{ marginBottom: 6, fontSize: 12, color: "#5a5a7a" }}>
        {formatDate(record.createdAt)} · {formatTime(record.createdAt)}
      </div>
      <h2
        style={{
          margin: "0 0 20px",
          fontSize: 20,
          color: "#e8e8f5",
          fontFamily: "Georgia, serif",
          fontWeight: 400,
        }}
      >
        Registro SPEC
      </h2>

      {sections.map((s) => (
        <div
          key={s.label}
          style={{
            marginBottom: 20,
            padding: "16px",
            background: "#13131f",
            borderRadius: 12,
            border: "1px solid #1e1e30",
          }}
        >
          <div style={{ fontSize: 12, color: "#5a5a7a", marginBottom: 6 }}>
            {s.icon} {s.label.toUpperCase()}
          </div>
          <p
            style={{
              margin: 0,
              color: "#c8c8e0",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {s.value}
          </p>
        </div>
      ))}

      {/* Emotions */}
      <div
        style={{
          marginBottom: 20,
          padding: "16px",
          background: "#13131f",
          borderRadius: 12,
          border: "1px solid #1e1e30",
        }}
      >
        <div style={{ fontSize: 12, color: "#5a5a7a", marginBottom: 10 }}>
          ❤️ EMOCIÓN
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {record.emotions.map((e) => (
            <span
              key={e}
              style={{
                fontSize: 13,
                padding: "4px 12px",
                borderRadius: 999,
                background: "#fba45822",
                color: "#8BA4FF",
                border: "1px solid #fba45844",
              }}
            >
              {e}
            </span>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "#6b6b8a" }}>
          Intensidad:{" "}
          <span style={{ color: "#8BA4FF" }}>
            {INTENSITY_LABELS[record.intensity - 1]}
          </span>
        </div>
      </div>

      <button
        onClick={() => onDelete(record.id)}
        style={{
          ...btnSecondary,
          color: "#E76F51",
          borderColor: "#E76F5133",
          width: "100%",
          marginTop: 8,
        }}
      >
        Eliminar registro
      </button>
    </div>
  );
}

export default RecordDetail;
