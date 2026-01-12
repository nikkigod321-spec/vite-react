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

    if (endTime < startTime) {
      endTime.setDate(endTime.getDate() + 1)
    }

    const hours = (endTime.getTime() - startTime.getTime()) / 36e5

    setEntries([...entries, { date, start, end, hours }])
  }

  const total = entries.reduce((sum, e) => sum + e.hours, 0)

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "white", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>🛡️ Registro de Turnos</h2>

      <div style={{ background: "#0f172a", padding: 15, borderRadius: 10 }}>
        <input style={input} type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input style={input} type="time" value={start} onChange={e => setStart(e.target.value)} />
        <input style={input} type="time" value={end} onChange={e => setEnd(e.target.value)} />

        <button style={btn} onClick={addEntry}>Adicionar</button>
      </div>

      <div style={{ marginTop: 20 }}>
        {entries.map((e, i) => (
          <div key={i} style={row}>
            {e.date} {e.start} → {e.end} | {e.hours.toFixed(2)}h
          </div>
        ))}
      </div>

      <h3 style={{ textAlign: "center", marginTop: 20 }}>
        Total: {total.toFixed(2)} horas
      </h3>
    </div>
  )
}

const input = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  borderRadius: 8,
  border: "none",
  background: "#1e293b",
  color: "white"
}

const btn = {
  width: "100%",
  padding: 12,
  borderRadius: 8,
  border: "none",
  background: "#22c55e",
  fontWeight: "bold"
}

const row = {
  background: "#020617",
  padding: 10,
  marginBottom: 8,
  borderRadius: 6
}
