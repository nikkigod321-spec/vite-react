import { useState } from "react"

type Entry = {
  date: string
  start: string
  end: string
  hours: number
}

export default function App() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [date, setDate] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  function addEntry() {
    if (!date || !start || !end) return

    const startTime = new Date(`${date}T${start}`)
    let endTime = new Date(`${date}T${end}`)
    if (endTime < startTime) endTime.setDate(endTime.getDate() + 1)

    const hours = (endTime.getTime() - startTime.getTime()) / 36e5
    setEntries([...entries, { date, start, end, hours }])
  }

  const total = entries.reduce((s, e) => s + e.hours, 0)

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>🛡️ Registro de Turnos</h1>

      <div style={styles.card}>
        <label>Data</label>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={styles.input} />

        <label>Entrada</label>
        <input type="time" value={start} onChange={e => setStart(e.target.value)} style={styles.input} />

        <label>Saída</label>
        <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={styles.input} />

        <button onClick={addEntry} style={styles.button}>Adicionar Turno</button>
      </div>

      <div style={styles.card}>
        {entries.map((e, i) => (
          <div key={i} style={styles.row}>
            <div>{e.date}</div>
            <div>{e.start} → {e.end}</div>
            <div>{e.hours.toFixed(2)}h</div>
          </div>
        ))}

        <div style={styles.total}>Total: {total.toFixed(2)} horas</div>
      </div>
    </div>
  )
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "20px",
    fontFamily: "system-ui",
    maxWidth: 480,
    margin: "auto"
  },
  title: {
    textAlign: "center" as const,
    marginBottom: 20
  },
  card: {
    background: "#020617",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
  },
  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    border: "none",
    marginBottom: 12,
    background: "#1e293b",
    color: "white"
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "#22c55e",
    color: "#022c22",
    fontWeight: "bold"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: "1px solid #1e293b"
  },
  total: {
    textAlign: "center" as const,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18
  }
}      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <br /><br />

      <input type="time" value={start} onChange={e => setStart(e.target.value)} />
      <input type="time" value={end} onChange={e => setEnd(e.target.value)} />
      <br /><br />

      <button onClick={addEntry}>Adicionar Turno</button>

      <hr />

      {entries.map((e, i) => (
        <div key={i}>
          📅 {e.date} ⏰ {e.start} - {e.end} → {e.hours.toFixed(2)}h
        </div>
      ))}

      <h3>Total: {total.toFixed(2)} horas</h3>
    </div>
  )
}
