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
    setStart("")
    setEnd("")
  }

  const total = entries.reduce((sum, e) => sum + e.hours, 0)

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto", fontFamily: "Arial" }}>
      <h2>📋 Controle de Turnos — Vigia</h2>

      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
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
