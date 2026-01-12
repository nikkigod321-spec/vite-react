import { useState } from "react";

export default function App() {
  const [entries, setEntries] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const addEntry = () => {
    if (!date || !start || !end) return;

    const startTime = new Date(date + "T" + start);
    let endTime = new Date(date + "T" + end);

    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    const hours = (endTime.getTime() - startTime.getTime()) / 36e5;

    setEntries([...entries, { date, start, end, hours }]);
  };

  const total = entries.reduce((s, e) => s + e.hours, 0);

  return (
    <div style={{ padding: 20 }}>
      <h2>Registro de Ponto – Vigia</h2>

      <label>Data</label><br />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br /><br />

      <label>Entrada</label><br />
      <input type="time" value={start} onChange={e => setStart(e.target.value)} /><br /><br />

      <label>Saída</label><br />
      <input type="time" value={end} onChange={e => setEnd(e.target.value)} /><br /><br />

      <button onClick={addEntry}>Adicionar turno</button>

      <hr />

      {entries.map((e, i) => (
        <div key={i}>
          {e.date} — {e.start} até {e.end} → {e.hours.toFixed(2)} horas
        </div>
      ))}

      <h3>Total trabalhado: {total.toFixed(2)} horas</h3>
    </div>
  );
}
