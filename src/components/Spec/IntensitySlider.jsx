import { INTENSITY_LABELS } from "./specConstants";

function IntensitySlider({ value, onChange }) {
  return (
    <div style={{ marginTop: 8 }}>
      <input
        type="range"
        min={1}
        max={4}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#fba458" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        {INTENSITY_LABELS.map((l, i) => (
          <span
            key={l}
            style={{
              fontSize: 11,
              color: i + 1 === value ? "#8BA4FF" : "#44445a",
            }}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default IntensitySlider;
