import { btnSecondary } from "./specStyles";

const section = {
  marginBottom: 20,
  padding: "16px",
  background: "#13131f",
  borderRadius: 12,
  border: "1px solid #1e1e30",
};

const sectionLabel = {
  fontSize: 12,
  color: "#fba458",
  marginBottom: 8,
  fontWeight: 600,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
};

const body = {
  margin: 0,
  color: "#c8c8e0",
  fontSize: 14,
  lineHeight: 1.7,
};

const subheading = {
  color: "#e8e8f5",
  fontSize: 15,
  fontWeight: 600,
  margin: "14px 0 6px",
};

const distortion = {
  marginBottom: 12,
  paddingLeft: 12,
  borderLeft: "2px solid #2a2a3e",
};

const distortionName = {
  color: "#fba458",
  fontWeight: 600,
  fontSize: 14,
  marginBottom: 2,
};

const distortionDesc = {
  color: "#8888aa",
  fontSize: 13,
  lineHeight: 1.6,
  margin: 0,
};

function HelpDetail({ onBack }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={onBack}
          style={{ ...btnSecondary, marginBottom: 18, padding: "8px 16px" }}
        >
          ← Volver
        </button>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            color: "#e8e8f5",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            letterSpacing: "-0.5px",
          }}
        >
          Manual de Ayuda
        </h1>
        <p style={{ margin: "6px 0 0", color: "#5a5a7a", fontSize: 13 }}>
          Introducción a la Terapia Cognitivo Conductual
        </p>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", paddingRight: 2 }}>
        {/* Qué es la TCC */}
        <div style={section}>
          <div style={sectionLabel}>🧠 ¿Qué es la TCC?</div>
          <p style={body}>
            La{" "}
            <strong style={{ color: "#e8e8f5" }}>
              Terapia Cognitivo Conductual (TCC)
            </strong>{" "}
            es un enfoque psicoterapéutico basado en la evidencia que sostiene
            que nuestros <em>pensamientos, emociones y conductas</em> están
            interconectados y se influyen mutuamente.
          </p>
          <p style={{ ...body, marginTop: 10 }}>
            A diferencia de otros enfoques, la TCC se centra en el{" "}
            <strong style={{ color: "#e8e8f5" }}>presente</strong>: identifica
            patrones de pensamiento disfuncionales y los modifica activamente
            para producir cambios en el estado emocional y el comportamiento.
          </p>
        </div>

        {/* El modelo cognitivo */}
        <div style={section}>
          <div style={sectionLabel}>🔁 El Modelo Cognitivo</div>
          <p style={body}>
            El núcleo de la TCC es el{" "}
            <strong style={{ color: "#e8e8f5" }}>modelo cognitivo</strong>, que
            propone que no son los eventos en sí mismos los que determinan cómo
            nos sentimos, sino la{" "}
            <strong style={{ color: "#e8e8f5" }}>interpretación</strong> que
            hacemos de ellos.
          </p>
          <div
            style={{
              margin: "14px 0",
              padding: "12px 16px",
              background: "#0a0a14",
              borderRadius: 10,
              border: "1px solid #1e1e30",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {[
              { icon: "🌍", label: "Situación" },
              { icon: "→", label: null },
              { icon: "💭", label: "Pensamiento" },
              { icon: "→", label: null },
              { icon: "❤️", label: "Emoción" },
              { icon: "→", label: null },
              { icon: "⚡", label: "Conducta" },
            ].map((item, i) =>
              item.label ? (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 20 }}>{item.icon}</div>
                  <div style={{ fontSize: 11, color: "#5a5a7a", marginTop: 2 }}>
                    {item.label}
                  </div>
                </div>
              ) : (
                <div key={i} style={{ color: "#2a2a3e", fontSize: 18 }}>
                  {item.icon}
                </div>
              ),
            )}
          </div>
          <p style={{ ...body, marginTop: 4 }}>
            Modificando el{" "}
            <strong style={{ color: "#e8e8f5" }}>pensamiento</strong> (la
            interpretación) podemos transformar la respuesta emocional y
            conductual ante una misma situación.
          </p>
        </div>

        {/* Pensamientos automáticos */}
        <div style={section}>
          <div style={sectionLabel}>⚡ Pensamientos Automáticos</div>
          <p style={body}>
            Son pensamientos involuntarios y rápidos que surgen en respuesta a
            situaciones cotidianas. Aparecen de forma espontánea, casi sin
            esfuerzo consciente, y suelen aceptarse como verdades absolutas.
          </p>
          <p style={{ ...body, marginTop: 10 }}>Características:</p>
          <ul style={{ ...body, paddingLeft: 20, marginTop: 6 }}>
            <li>Son específicos a cada situación</li>
            <li>Parecen plausibles y razonables en el momento</li>
            <li>
              Tienden a ser negativos en personas con malestar psicológico
            </li>
            <li>Pueden identificarse con práctica y atención</li>
          </ul>
          <p style={{ ...body, marginTop: 10 }}>
            <strong style={{ color: "#e8e8f5" }}>Ejemplos:</strong>{" "}
            <em>&ldquo;No soy capaz de hacer nada bien&rdquo;</em>,{" "}
            <em>&ldquo;Si no salió perfecto, fallé&rdquo;</em>,{" "}
            <em>&ldquo;Los demás me están juzgando&rdquo;</em>.
          </p>
        </div>

        {/* Distorsiones cognitivas */}
        <div style={section}>
          <div style={sectionLabel}>🔍 Distorsiones Cognitivas</div>
          <p style={{ ...body, marginBottom: 14 }}>
            Son patrones de pensamiento sistemáticamente sesgados que
            distorsionan la realidad. Reconocerlas es el primer paso para
            cuestionarlas:
          </p>

          {[
            {
              name: "Pensamiento todo-o-nada",
              desc: "Ver las situaciones en blanco y negro, sin términos medios. \u201cSi no salió perfecto, fue un fracaso total.\u201d",
            },
            {
              name: "Catastrofización",
              desc: "Exagerar la magnitud de un problema o anticipar el peor resultado posible. \u201cSi cometo ese error, todo se va a derrumbar.\u201d",
            },
            {
              name: "Filtro mental",
              desc: "Enfocarse selectivamente en los aspectos negativos ignorando los positivos.",
            },
            {
              name: "Descalificación de lo positivo",
              desc: "Rechazar experiencias positivas: \u201cEsto salió bien de pura casualidad.\u201d",
            },
            {
              name: "Leer la mente",
              desc: "Asumir que sabemos lo que otros piensan sin evidencia. \u201cSé que me está juzgando.\u201d",
            },
            {
              name: "Personalización",
              desc: "Atribuirse la responsabilidad de eventos negativos que no dependen exclusivamente de uno.",
            },
            {
              name: "Generalización excesiva",
              desc: "Extraer una regla general de un solo evento negativo. \u201cSiempre me pasa lo mismo.\u201d",
            },
            {
              name: "Enunciados con 'debería'",
              desc: "Usar reglas rígidas sobre cómo uno mismo u otros deberían comportarse. \u201cDebería poder con todo sola/o.\u201d",
            },
          ].map((d) => (
            <div key={d.name} style={distortion}>
              <div style={distortionName}>{d.name}</div>
              <p style={distortionDesc}>{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Cómo usar el registro SPEC */}
        <div style={section}>
          <div style={sectionLabel}>📋 Cómo Usar el Registro SPEC</div>
          <p style={body}>
            El registro <strong style={{ color: "#e8e8f5" }}>SPEC</strong> es
            una herramienta central de la TCC para identificar y examinar
            patrones cognitivos ante situaciones de malestar emocional.
          </p>

          {[
            {
              icon: "🌍",
              letter: "S — Situación",
              desc: "Describe el momento concreto que desencadenó el malestar: ¿Qué pasó? ¿Dónde? ¿Con quién? Sé específico y objetivo, como si lo viera una cámara.",
            },
            {
              icon: "💭",
              letter: "P — Pensamiento",
              desc: "¿Qué pensaste en ese momento? Escribe el pensamiento automático tal como apareció, sin censurarlo ni editarlo.",
            },
            {
              icon: "❤️",
              letter: "E — Emoción",
              desc: "Nombra la emoción o emociones que sentiste (tristeza, ansiedad, enojo, vergüenza…) e indicá su intensidad del 1 al 10.",
            },
            {
              icon: "⚡",
              letter: "C — Conducta",
              desc: "¿Qué hiciste como consecuencia? Incluyendo lo que evitaste hacer (conducta de evitación también cuenta).",
            },
          ].map((item) => (
            <div key={item.letter} style={{ marginTop: 14 }}>
              <div style={subheading}>
                {item.icon} {item.letter}
              </div>
              <p style={{ ...body, paddingLeft: 4 }}>{item.desc}</p>
            </div>
          ))}

          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: "#0a0a14",
              borderRadius: 10,
              border: "1px solid #2a2a3e",
            }}
          >
            <p style={{ ...body, color: "#8888aa", fontSize: 13 }}>
              💡 <strong style={{ color: "#c8c8e0" }}>Consejo:</strong>{" "}
              Completar el registro lo antes posible después del evento ayuda a
              capturar los pensamientos con mayor fidelidad. Con práctica, este
              proceso se vuelve automático.
            </p>
          </div>
        </div>

        {/* Preguntas para cuestionar pensamientos */}
        <div style={section}>
          <div style={sectionLabel}>
            ❓ Preguntas para Cuestionar Pensamientos
          </div>
          <p style={{ ...body, marginBottom: 12 }}>
            Una vez identificado el pensamiento automático, podés examinarlo con
            estas preguntas:
          </p>
          <ul style={{ ...body, paddingLeft: 20 }}>
            <li style={{ marginBottom: 8 }}>
              ¿Qué evidencia tengo <em>a favor</em> y <em>en contra</em> de este
              pensamiento?
            </li>
            <li style={{ marginBottom: 8 }}>
              ¿Estoy cayendo en alguna distorsión cognitiva?
            </li>
            <li style={{ marginBottom: 8 }}>
              ¿Qué le diría a un amigo que pensara esto?
            </li>
            <li style={{ marginBottom: 8 }}>
              ¿Cuál es el peor resultado posible? ¿Podría tolerarlo?
            </li>
            <li style={{ marginBottom: 8 }}>
              ¿Hay alguna forma alternativa de ver esta situación?
            </li>
            <li>¿Este pensamiento me ayuda o me perjudica?</li>
          </ul>
        </div>

        {/* Nota final */}
        <div
          style={{
            ...section,
            borderColor: "#fba45830",
            background: "#13131f",
          }}
        >
          <div style={sectionLabel}>📌 Importante</div>
          <p style={body}>
            Esta aplicación es una herramienta de{" "}
            <strong style={{ color: "#e8e8f5" }}>
              psicoeducación y autoregistro
            </strong>
            , no reemplaza la atención profesional. Si estás atravesando un
            período de malestar significativo, te recomendamos consultar con un
            profesional de salud mental.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HelpDetail;
