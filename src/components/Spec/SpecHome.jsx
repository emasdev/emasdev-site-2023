import { textareaStyle, btnPrimary, fabButton } from "./specStyles";
import RecordCard from "./RecordCard";

function SpecHome({
  records,
  filtered,
  search,
  setSearch,
  setView,
  setSelected,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
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
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 52 }}>
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
            Sin resultados para &ldquo;{search}&rdquo;
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

      {/* Help button */}
      <div
        style={{ display: "flex", justifyContent: "flex-end", paddingTop: 12 }}
      >
        <button
          onClick={() => setView("help")}
          style={{
            background: "transparent",
            border: "1px solid #2a2a3e",
            borderRadius: 999,
            color: "#5a5a7a",
            fontSize: 13,
            padding: "7px 16px",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "border-color .2s, color .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#fba458";
            e.currentTarget.style.color = "#fba458";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#2a2a3e";
            e.currentTarget.style.color = "#5a5a7a";
          }}
        >
          ¿Cómo usarlo?
        </button>
      </div>
    </div>
  );
}

export default SpecHome;
