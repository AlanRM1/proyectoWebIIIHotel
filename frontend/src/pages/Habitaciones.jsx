import React, { useEffect, useState } from 'react'
import { getHabitaciones, crearHabitacion, actualizarHabitacion, eliminarHabitacion } from '../api/api'
import Loading from '../components/Loading'

export default function Habitaciones(){
  const [habitaciones, setHabitaciones] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({ numero: '', tipo: '', precio_base: '' })
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    setLoading(true); setError(null)
    try {
      const res = await getHabitaciones()
      setHabitaciones(res.data)
    } catch (e) {
      console.error(e)
      setError('Error cargando habitaciones')
    } finally { setLoading(false) }
  }

  useEffect(()=>{ fetchData() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!form.numero || !form.tipo || !form.precio_base){ alert('Completa todos los campos'); return }
    try {
      if(editId){
        await actualizarHabitacion(editId, { ...form })
        setEditId(null)
      } else {
        await crearHabitacion({ ...form })
      }
      setForm({ numero:'', tipo:'', precio_base:'' })
      fetchData()
    } catch (err){
      console.error(err)
      alert('Error guardando habitación')
    }
  }

  const onEdit = (h) => {
    setEditId(h.id)
    setForm({ numero: h.numero, tipo: h.tipo, precio_base: h.precio_base })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if(!confirm('Eliminar habitación?')) return
    try { await eliminarHabitacion(id); fetchData() } catch(e){ alert('Error eliminando') }
  }

  return (
    <>
      <h3>Habitaciones</h3>
      <div className="card mb-4">
        <div className="card-header">{editId ? 'Editar Habitación' : 'Nueva Habitación'}</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-2">
              <div className="col-md-3">
                <input className="form-control" placeholder="Número" value={form.numero} onChange={e=>setForm({...form, numero:e.target.value})}/>
              </div>
              <div className="col-md-3">
                <select className="form-select" value={form.tipo} onChange={e=>setForm({...form, tipo:e.target.value})}>
                  <option value="">Tipo...</option>
                  <option value="simple">Simple</option>
                  <option value="doble">Doble</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div className="col-md-3">
                <input type="number" step="0.01" className="form-control" placeholder="Precio base" value={form.precio_base} onChange={e=>setForm({...form, precio_base:e.target.value})}/>
              </div>
              <div className="col-md-3">
                <button className="btn btn-success w-100" type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading && <Loading />}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr><th>ID</th><th>Número</th><th>Tipo</th><th>Precio</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id}>
                  <td>{h.id}</td>
                  <td>{h.numero}</td>
                  <td>{h.tipo}</td>
                  <td>{h.precio_base}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={()=>onEdit(h)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>onDelete(h.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
