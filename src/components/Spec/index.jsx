import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { appShell, card } from "./specStyles";
import SpecHome from "./SpecHome";
import NewRecordForm from "./NewRecordForm";
import RecordDetail from "./RecordDetail";
import HelpDetail from "./HelpDetail";

export default function Spec() {
  const [view, setView] = useState("home"); // home | new | detail | help
  const [records, setRecords] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("spec_records") || "[]");
    } catch {
      return [];
    }
  });
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
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
            color: "#3d3d3d",
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
          {view === "home" && (
            <SpecHome
              records={records}
              filtered={filtered}
              search={search}
              setSearch={setSearch}
              setView={setView}
              setSelected={setSelected}
            />
          )}
          {view === "new" && (
            <NewRecordForm
              onSave={handleSave}
              onCancel={() => setView("home")}
            />
          )}
          {view === "detail" && selected && (
            <RecordDetail
              record={selected}
              onBack={() => setView("home")}
              onDelete={handleDelete}
            />
          )}
          {view === "help" && <HelpDetail onBack={() => setView("home")} />}
        </div>
      </div>
    </>
  );
}
