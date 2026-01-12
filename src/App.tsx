import { useState } from "react"

type Entry = {
  date: string
  start: string
  end: string
  hours: number
}

export default function App() {
  // Carrega do localStorage se houver, senão vazio
  const [entries, setEntries] = useState<Entry[]>(() => {
    const saved = localStorage.getItem("entries")
    return saved ? JSON.parse(saved) : []
  })
  const [date, setDate] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")

  // Adiciona uma entrada
  function addEntry() {
    if (!date || !start || !end) return

    const startTime = new Date(`${date}T${start}`)
    let endTime = new Date(`${date}T${end}`)

    if (endTime < startTime) endTime.setDate(endTime.getDate() + 1)

    const hours = (endTime.getTime() - startTime.getTime()) / 36e5

    const newEntries = [...entries, { date, start, end, hours }]
    setEntries(newEntries)
    localStorage.setItem("entries", JSON.stringify(newEntries)) // salva
    setStart("")
    setEnd("")
  }

  // Reseta todos os turnos
  function resetWeek() {
    setEntries([])
    setDate("")
    setStart("")
    setEnd("")
    localStorage.removeItem("entries") // limpa armazenamento
  }

  const total = entries.reduce((sum, e) => sum + e.hours, 0)

  return (
    <div style={styles.app}>
      <h2 style={styles.title}>🛡️ Registro de Turnos</h2>

      <div style={styles.card}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} style={styles.input} />
        <input type="time" value={start} onChange={e => setStart(e.target.value)} style={styles.input} />
        <input type="time" value={end} onChange={e => setEnd(e.target.value)} style={styles.input} />

        <button onClick={addEntry} style={styles.button}>Adicionar Turno</button>
        <button onClick={resetWeek} style={{ ...styles.button, background: "#ef4444", marginTop: 10 }}>
          🗑️ Resetar Semana
        </button>
      </div>

      <div style={styles.card}>
        {entries.length === 0 ? (
          <div style={{ textAlign: "center" }}>Nenhum turno registrado</div>
        ) : (
          entries.map((e, i) => (
            <div key={i} style={styles.row}>
              <div>{e.date}</div>
              <div>{e.start} → {e.end}</div>
              <div>{e.hours.toFixed(2)}h</div>
            </div>
          ))
        )}
        {entries.length > 0 && (
          <div style={styles.total}>Total: {total.toFixed(2)} horas</div>
        )}
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
}
