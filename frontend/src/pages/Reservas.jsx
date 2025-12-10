import React, { useEffect, useState } from 'react'
import { getReservas, crearReserva, getHabitaciones, getClientes } from '../api/api'
import Loading from '../components/Loading'

export default function Reservas(){
  const [reservas, setReservas] = useState([])
  const [habitaciones, setHabitaciones] = useState([])
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    habitacion_id: '',
    cliente_id: '',
    fecha_inicio: '',
    fecha_fin: '',
    monto_total: ''
  })

  const fetchAll = async () => {
    setLoading(true); setError(null)
    try {
      const [rRes, hRes, cRes] = await Promise.all([getReservas(), getHabitaciones(), getClientes()])
      setReservas(rRes.data)
      setHabitaciones(hRes.data)
      setClientes(cRes.data)
    } catch(e){
      console.error(e); setError('Error cargando reservas/datos')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchAll() }, [])

  const calcularMonto = () => {
    const habit = habitaciones.find(h => String(h.id) === String(form.habitacion_id))
    if(!habit || !form.fecha_inicio || !form.fecha_fin) return ''
    const a = new Date(form.fecha_inicio)
    const b = new Date(form.fecha_fin)
    const dias = Math.max(1, Math.round((b - a) / (1000*60*60*24)))
    return (dias * Number(habit.precio_base)).toFixed(2)
  }

  useEffect(()=> {
    setForm(f => ({ ...f, monto_total: calcularMonto() }))
  }, [form.habitacion_id, form.fecha_inicio, form.fecha_fin, habitaciones])

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!form.habitacion_id || !form.cliente_id || !form.fecha_inicio || !form.fecha_fin){ alert('Completa todos los campos'); return }
    try {
      await crearReserva(form)
      setForm({ habitacion_id: '', cliente_id: '', fecha_inicio:'', fecha_fin:'', monto_total:'' })
      fetchAll()
    } catch(e){ console.error(e); alert('Error creando reserva (verifica disponibilidad)') }
  }

  const onDelete = async (id) => {
    if(!confirm('Eliminar reserva?')) return
    try { await fetch(`/api/reservas/${id}`, { method: 'DELETE' }); fetchAll() } catch(e){ alert('Error eliminando') }
  }

  return (
    <>
      <h3>Reservas</h3>

      <div className="card mb-4">
        <div className="card-header">Nueva Reserva</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-2">
              <div className="col-md-3">
                <select className="form-select" value={form.habitacion_id} onChange={e=>setForm({...form, habitacion_id:e.target.value})}>
                  <option value="">Habitación...</option>
                  {habitaciones.map(h=> <option key={h.id} value={h.id}>{h.numero} - {h.tipo} - {h.precio_base}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={form.cliente_id} onChange={e=>setForm({...form, cliente_id:e.target.value})}>
                  <option value="">Cliente...</option>
                  {clientes.map(c=> <option key={c.id} value={c.id}>{c.nombre} ({c.email})</option>)}
                </select>
              </div>
              <div className="col-md-2">
                <input type="date" className="form-control" value={form.fecha_inicio} onChange={e=>setForm({...form, fecha_inicio:e.target.value})}/>
              </div>
              <div className="col-md-2">
                <input type="date" className="form-control" value={form.fecha_fin} onChange={e=>setForm({...form, fecha_fin:e.target.value})}/>
              </div>
              <div className="col-md-2">
                <input className="form-control" placeholder="Monto total" value={form.monto_total} onChange={e=>setForm({...form, monto_total:e.target.value})}/>
              </div>
            </div>
            <div className="mt-2"><button className="btn btn-success">Reservar</button></div>
          </form>
        </div>
      </div>

      {loading && <Loading/>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead><tr><th>ID</th><th>Cliente</th><th>Habitación</th><th>Inicio</th><th>Fin</th><th>Monto</th><th>Acciones</th></tr></thead>
            <tbody>
              {reservas.map(r=>{
                const habit = habitaciones.find(h=>String(h.id)===String(r.habitacion_id)) || {}
                const client = clientes.find(c=>String(c.id)===String(r.cliente_id)) || {}
                return (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{client.nombre || r.cliente_id}</td>
                    <td>{habit.numero || r.habitacion_id}</td>
                    <td>{r.fecha_inicio}</td>
                    <td>{r.fecha_fin}</td>
                    <td>{r.monto_total}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={()=>onDelete(r.id)}>Eliminar</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
