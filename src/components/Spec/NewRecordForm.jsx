import { useState } from "react";
import { EMOTIONS } from "./specConstants";
import { textareaStyle, btnPrimary, btnSecondary } from "./specStyles";
import EmotionChip from "./EmotionChip";
import IntensitySlider from "./IntensitySlider";

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

export default NewRecordForm;
