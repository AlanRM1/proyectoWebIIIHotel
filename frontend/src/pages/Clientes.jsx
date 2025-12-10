import React, { useEffect, useState } from 'react'
import { getClientes, crearCliente, actualizarCliente, eliminarCliente } from '../api/api'
import Loading from '../components/Loading'

export default function Clientes(){
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({ nombre:'', email:'', contrasena:'', telefono:'' })
  const [editId, setEditId] = useState(null)

  const fetchData = async () => {
    setLoading(true); setError(null)
    try { const res = await getClientes(); setClientes(res.data) }
    catch(e){ console.error(e); setError('Error cargando clientes') }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ fetchData() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    if(!form.nombre || !form.email || !form.contrasena){ alert('Completa los campos obligatorios'); return }
    try {
      if(editId) await actualizarCliente(editId, form)
      else await crearCliente(form)
      setForm({ nombre:'', email:'', contrasena:'', telefono:'' })
      setEditId(null)
      fetchData()
    } catch(err){ console.error(err); alert('Error guardando cliente') }
  }

  const onEdit = (c) => {
    setEditId(c.id)
    setForm({ nombre:c.nombre, email:c.email, contrasena:c.contrasena, telefono:c.telefono || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const onDelete = async (id) => {
    if(!confirm('Eliminar cliente?')) return
    try{ await eliminarCliente(id); fetchData() } catch(e){ alert('Error eliminando') }
  }

  return (
    <>
      <h3>Clientes</h3>
      <div className="card mb-4">
        <div className="card-header">{editId ? 'Editar Cliente' : 'Nuevo Cliente'}</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-2">
              <div className="col-md-3"><input className="form-control" placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} /></div>
              <div className="col-md-3"><input className="form-control" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
              <div className="col-md-3"><input className="form-control" placeholder="Contraseña" type="password" value={form.contrasena} onChange={e=>setForm({...form, contrasena:e.target.value})} /></div>
              <div className="col-md-3"><input className="form-control" placeholder="Teléfono" value={form.telefono} onChange={e=>setForm({...form, telefono:e.target.value})} /></div>
            </div>
            <div className="mt-2"><button className="btn btn-success">{editId ? 'Actualizar' : 'Guardar'}</button></div>
          </form>
        </div>
      </div>

      {loading && <Loading/>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <div className="card-body">
          <table className="table">
            <thead><tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr></thead>
            <tbody>
              {clientes.map(c=>(
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.nombre}</td>
                  <td>{c.email}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={()=>onEdit(c)}>Editar</button>
                    <button className="btn btn-sm btn-danger" onClick={()=>onDelete(c.id)}>Eliminar</button>
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
