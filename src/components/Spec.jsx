import { useState, useEffect } from "react";

// ─── FIREBASE INTEGRATION POINTS ──────────────────────────────────────────────
// When ready to connect Firebase, replace these mock functions:
//
// import { auth } from "./firebase";
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
// import { collection, addDoc, getDocs, deleteDoc, doc, query, where, orderBy } from "firebase/firestore";
//
// const db = getFirestore(app);
// const COLLECTION = "spec_records";
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";

const EMOTIONS = [
  "Ansiedad",
  "Tristeza",
  "Coraje",
  "Vergüenza",
  "Culpa",
  "Miedo",
  "Frustración",
  "Soledad",
  "Confusión",
  "Alegría",
  "Calma",
  "Orgullo",
];

const INTENSITY_LABELS = ["Leve", "Moderada", "Intensa", "Muy intensa"];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}

// ─── EMOTION CHIP ─────────────────────────────────────────────────────────────
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

// ─── INTENSITY SLIDER ─────────────────────────────────────────────────────────
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

// ─── RECORD CARD ──────────────────────────────────────────────────────────────
function RecordCard({ record, onClick }) {
  const emotionColors = {
    Ansiedad: "#F4A261",
    Tristeza: "#4EA8DE",
    Coraje: "#E76F51",
    Vergüenza: "#E9C46A",
    Culpa: "#A8DADC",
    Miedo: "#457B9D",
    Frustración: "#F4845F",
    Soledad: "#6D6875",
    Confusión: "#BDE0FE",
    Alegría: "#90BE6D",
    Calma: "#43AA8B",
    Orgullo: "#F9C74F",
  };
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

// ─── NEW RECORD FORM ──────────────────────────────────────────────────────────
function NewRecordForm({ onSave, onCancel }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    situation: "",
    thought: "",
    emotions: [],
    intensity: 2,
    behavior: "",
    notes: "",
  });
  const [error, setError] = useState("");

  const steps = [
    {
      label: "Situación",
      icon: "🌍",
      subtitle: "¿Qué estaba pasando cuando lo notaste?",
      field: (
        <textarea
          value={form.situation}
          onChange={(e) =>
            setForm((f) => ({ ...f, situation: e.target.value }))
          }
          placeholder="Describe el contexto: dónde estabas, qué hacías, con quién..."
          rows={4}
          style={textareaStyle}
        />
      ),
      valid: () => form.situation.trim().length > 0,
    },
    {
      label: "Pensamiento",
      icon: "💭",
      subtitle: "¿Qué cruzó por tu mente en ese momento?",
      field: (
        <textarea
          value={form.thought}
          onChange={(e) => setForm((f) => ({ ...f, thought: e.target.value }))}
          placeholder="¿Qué te dijiste a ti mismo? ¿Qué imágenes o ideas surgieron?"
          rows={4}
          style={textareaStyle}
        />
      ),
      valid: () => form.thought.trim().length > 0,
    },
    {
      label: "Emoción",
      icon: "❤️",
      subtitle: "¿Qué sentiste? ¿Con qué intensidad?",
      field: (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {EMOTIONS.map((e) => (
              <EmotionChip
                key={e}
                label={e}
                selected={form.emotions.includes(e)}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    emotions: f.emotions.includes(e)
                      ? f.emotions.filter((x) => x !== e)
                      : [...f.emotions, e],
                  }))
                }
              />
            ))}
          </div>
          {form.emotions.length > 0 && (
            <div>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b6b8a" }}>
                Intensidad general
              </p>
              <IntensitySlider
                value={form.intensity}
                onChange={(v) => setForm((f) => ({ ...f, intensity: v }))}
              />
            </div>
          )}
        </div>
      ),
      valid: () => form.emotions.length > 0,
    },
    {
      label: "Conducta",
      icon: "⚡",
      subtitle: "¿Qué hiciste o dejaste de hacer?",
      field: (
        <div>
          <textarea
            value={form.behavior}
            onChange={(e) =>
              setForm((f) => ({ ...f, behavior: e.target.value }))
            }
            placeholder="¿Cómo reaccionaste? ¿Qué acción tomaste (o evitaste)?"
            rows={3}
            style={{ ...textareaStyle, marginBottom: 16 }}
          />
          <p style={{ margin: "0 0 6px", fontSize: 13, color: "#6b6b8a" }}>
            Notas adicionales (opcional)
          </p>
          <textarea
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Reflexiones, patrones que notas, preguntas para tu terapeuta..."
            rows={2}
            style={textareaStyle}
          />
        </div>
      ),
      valid: () => form.behavior.trim().length > 0,
    },
  ];

  const current = steps[step];

  function handleNext() {
    if (!current.valid()) {
      setError("Este campo es necesario para continuar.");
      return;
    }
    setError("");
    if (step < steps.length - 1) setStep((s) => s + 1);
    else {
      onSave({
        ...form,
        createdAt: new Date().toISOString(),
        id: Date.now().toString(),
      });
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Progress */}
      <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
        {steps.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 999,
              background: i <= step ? "#fba458" : "#1e1e30",
              transition: "background .3s",
            }}
          />
        ))}
      </div>

      {/* Step header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>{current.icon}</div>
        <h2
          style={{
            margin: 0,
            fontSize: 22,
            color: "#e8e8f5",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
          }}
        >
          {current.label}
        </h2>
        <p style={{ margin: "6px 0 0", color: "#6b6b8a", fontSize: 14 }}>
          {current.subtitle}
        </p>
      </div>

      {/* Field */}
      <div style={{ flex: 1 }}>
        {current.field}
        {error && (
          <p style={{ color: "#F4A261", fontSize: 13, marginTop: 8 }}>
            {error}
          </p>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button
          onClick={
            step === 0
              ? onCancel
              : () => {
                  setStep((s) => s - 1);
                  setError("");
                }
          }
          style={btnSecondary}
        >
          {step === 0 ? "Cancelar" : "← Atrás"}
        </button>
        <button onClick={handleNext} style={btnPrimary}>
          {step === steps.length - 1 ? "Guardar registro" : "Siguiente →"}
        </button>
      </div>
    </div>
  );
}

// ─── DETAIL VIEW ──────────────────────────────────────────────────────────────
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

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Spec() {
  const [view, setView] = useState("home"); // home | new | detail
  const [records, setRecords] = useState(() => {
    // LOCAL STORAGE (replace with Firestore in production)
    try {
      return JSON.parse(localStorage.getItem("spec_records") || "[]");
    } catch {
      return [];
    }
  });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Replace with Firestore write in production
    localStorage.setItem("spec_records", JSON.stringify(records));
  }, [records]);

  function handleSave(record) {
    setRecords((r) => [record, ...r]);
    setView("home");
  }

  function handleDelete(id) {
    setRecords((r) => r.filter((x) => x.id !== id));
    setView("home");
  }

  const filtered = records.filter(
    (r) =>
      r.situation.toLowerCase().includes(search.toLowerCase()) ||
      r.thought.toLowerCase().includes(search.toLowerCase()) ||
      r.emotions.some((e) => e.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <>
      <Link to="/">
        <button
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1000,
            background: "#fba458",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          ← Ir al sitio del desarrollador
        </button>
      </Link>
      <div style={appShell}>
        <div style={card}>
          {/* ── HOME ── */}
          {view === "home" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Header */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h1
                      style={{
                        margin: 0,
                        fontSize: 26,
                        color: "#e8e8f5",
                        fontFamily: "Georgia, serif",
                        fontWeight: 400,
                        letterSpacing: "-0.5px",
                      }}
                    >
                      Registro SPEC
                    </h1>
                    <h2
                      style={{
                        margin: "8px 0 0",
                        fontSize: 16,
                        color: "#fba458",
                        fontFamily: "Georgia, serif",
                        fontWeight: 400,
                        letterSpacing: "-0.3px",
                      }}
                    >
                      Situación, Pensamiento, Emoción y Conducta
                    </h2>
                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#5a5a7a",
                        fontSize: 13,
                      }}
                    >
                      {records.length === 0
                        ? "Sin registros aún"
                        : `${records.length} entrada${records.length !== 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <button
                    onClick={() => setView("new")}
                    style={fabButton}
                    title="Nuevo registro"
                  >
                    +
                  </button>
                </div>

                {records.length > 0 && (
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar..."
                    style={{
                      ...textareaStyle,
                      marginTop: 16,
                      borderRadius: 999,
                      padding: "10px 16px",
                      height: "auto",
                    }}
                  />
                )}
              </div>

              {/* Records list */}
              <div style={{ flex: 1, overflowY: "auto" }}>
                {filtered.length === 0 && records.length === 0 && (
                  <div style={{ textAlign: "center", paddingTop: 60 }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>🧠</div>
                    <p
                      style={{
                        color: "#5a5a7a",
                        fontSize: 15,
                        lineHeight: 1.6,
                      }}
                    >
                      Cuando notes una emoción intensa,
                      <br />
                      registra lo que está pasando.
                    </p>
                    <button
                      onClick={() => setView("new")}
                      style={{ ...btnPrimary, marginTop: 20 }}
                    >
                      Crear primer registro
                    </button>
                  </div>
                )}
                {filtered.length === 0 && records.length > 0 && (
                  <p
                    style={{
                      color: "#5a5a7a",
                      textAlign: "center",
                      marginTop: 40,
                    }}
                  >
                    Sin resultados para "{search}"
                  </p>
                )}
                {filtered.map((r) => (
                  <RecordCard
                    key={r.id}
                    record={r}
                    onClick={() => {
                      setSelected(r);
                      setView("detail");
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── NEW RECORD ── */}
          {view === "new" && (
            <NewRecordForm
              onSave={handleSave}
              onCancel={() => setView("home")}
            />
          )}

          {/* ── DETAIL ── */}
          {view === "detail" && selected && (
            <RecordDetail
              record={selected}
              onBack={() => setView("home")}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const appShell = {
  minHeight: "100vh",
  background: "#0a0a14",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px 0",
  fontFamily: "'DM Sans', system-ui, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: 420,
  minHeight: "85vh",
  background: "#0e0e1c",
  borderRadius: 24,
  padding: "28px 24px",
  boxSizing: "border-box",
  boxShadow: "0 0 60px #fba45818, 0 0 0 1px #1e1e30",
  display: "flex",
  flexDirection: "column",
};

const textareaStyle = {
  width: "100%",
  background: "#13131f",
  border: "1px solid #1e1e30",
  borderRadius: 12,
  padding: "12px 14px",
  color: "#c8c8e0",
  fontSize: 14,
  lineHeight: 1.6,
  resize: "vertical",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  transition: "border-color .2s",
};

const btnPrimary = {
  flex: 1,
  padding: "13px 20px",
  background: "#fba458",
  color: "#fff",
  border: "none",
  borderRadius: 12,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "opacity .2s",
};

const btnSecondary = {
  padding: "13px 20px",
  background: "transparent",
  color: "#6b6b8a",
  border: "1px solid #1e1e30",
  borderRadius: 12,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "border-color .2s",
};

const fabButton = {
  width: 44,
  height: 44,
  borderRadius: 999,
  background: "#fba458",
  color: "#fff",
  border: "none",
  fontSize: 26,
  lineHeight: 1,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 20px #fba45844",
  flexShrink: 0,
};
