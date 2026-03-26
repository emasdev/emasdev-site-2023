import { emotionColors, formatDate, formatTime } from "./specConstants";

function RecordCard({ record, onClick }) {
  const firstEmotion = record.emotions[0];
  const accentColor = emotionColors[firstEmotion] || "#fba458";

  return (
    <div
      onClick={onClick}
      style={{
        background: "#13131f",
        border: "1px solid #1e1e30",
        borderLeft: `3px solid ${accentColor}`,
        borderRadius: 12,
        padding: "16px 18px",
        cursor: "pointer",
        transition: "all .2s",
        marginBottom: 10,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#1e1e30";
        e.currentTarget.style.borderLeftColor = accentColor;
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#c8c8e0",
            fontSize: 14,
            fontWeight: 500,
            maxWidth: "75%",
            lineHeight: 1.4,
          }}
        >
          {record.situation.length > 70
            ? record.situation.slice(0, 70) + "…"
            : record.situation}
        </p>
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
          <div style={{ fontSize: 12, color: "#5a5a7a" }}>
            {formatDate(record.createdAt)}
          </div>
          <div style={{ fontSize: 11, color: "#3a3a5a", marginTop: 2 }}>
            {formatTime(record.createdAt)}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        {record.emotions.map((e) => (
          <span
            key={e}
            style={{
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 999,
              background: `${emotionColors[e] || "#fba458"}22`,
              color: emotionColors[e] || "#8BA4FF",
              border: `1px solid ${emotionColors[e] || "#fba458"}44`,
            }}
          >
            {e}
          </span>
        ))}
      </div>
    </div>
  );
}

export default RecordCard;
