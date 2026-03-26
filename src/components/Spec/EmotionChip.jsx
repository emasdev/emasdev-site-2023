function EmotionChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: 999,
        border: selected ? "2px solid #fba458" : "2px solid #2a2a3a",
        background: selected ? "#fba45822" : "transparent",
        color: selected ? "#8BA4FF" : "#6b6b8a",
        fontSize: 13,
        cursor: "pointer",
        transition: "all .2s",
        fontFamily: "inherit",
      }}
    >
      {label}
    </button>
  );
}

export default EmotionChip;
