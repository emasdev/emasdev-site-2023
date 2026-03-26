export const EMOTIONS = [
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

export const INTENSITY_LABELS = ["Leve", "Moderada", "Intensa", "Muy intensa"];

export const emotionColors = {
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

export function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
}
