import { useState } from "react";
import "./App.css";

export default function App() {
  const [data, setData] = useState("");
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [turnos, setTurnos] = useState<any[]>([]);

  function adicionar() {
    if (!data || !entrada || !saida) return alert("Preencha tudo");

    const h1 = Number(entrada.split(":")[0]) + Number(entrada.split(":")[1]) / 60;
    const h2 = Number(saida.split(":")[0]) + Number(saida.split(":")[1]) / 60;

    if (h2 <= h1) return alert("Saída inválida");

    const horas = h2 - h1;

    setTurnos([...turnos, { data, entrada, saida, horas }]);
  }

  const total = turnos.reduce((s, t) => s + t.horas, 0).toFixed(2);

  return (
    <div className="app">
      <h1>Registro de Ponto</h1>

      <div className="card">
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <input type="time" value={entrada} onChange={e => setEntrada(e.target.value)} />
        <input type="time" value={saida} onChange={e => setSaida(e.target.value)} />
        <button onClick={adicionar}>Adicionar turno</button>
      </div>

      <div className="card">
        {turnos.map((t, i) => (
          <p key={i}>{t.data} • {t.entrada} → {t.saida} = {t.horas.toFixed(2)}h</p>
        ))}
      </div>

      <h2>Total: {total} horas</h2>
    </div>
  );
}      <input type="time" value={end} onChange={e => setEnd(e.target.value)} /><br /><br />

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
