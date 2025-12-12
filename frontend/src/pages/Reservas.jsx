import React, { useEffect, useState } from 'react';
import { getReservas, crearReserva, getHabitaciones, getClientes } from '../api/api';
import Loading from '../components/Loading';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ habitacion_id:'', cliente_id:'', fecha_inicio:'', fecha_fin:'', monto_total:'' });

  const fetchAll = async () => {
    setLoading(true); setError(null);
    try {
      const [rRes, hRes, cRes] = await Promise.all([getReservas(), getHabitaciones(), getClientes()]);
      setReservas(rRes.data); setHabitaciones(hRes.data); setClientes(cRes.data);
    } catch(e){ console.error(e); setError('Error cargando reservas/datos'); } 
    finally{ setLoading(false); }
  };

  useEffect(()=>{ fetchAll(); }, []);

  const calcularMonto = () => {
    const habit = habitaciones.find(h => String(h.id) === String(form.habitacion_id));
    if(!habit || !form.fecha_inicio || !form.fecha_fin) return '';
    const dias = Math.max(1, Math.round((new Date(form.fecha_fin)-new Date(form.fecha_inicio))/(1000*60*60*24)));
    return (dias * Number(habit.precio_base)).toFixed(2);
  };

  useEffect(()=> { setForm(f=>({...f, monto_total: calcularMonto()})); }, [form.habitacion_id, form.fecha_inicio, form.fecha_fin, habitaciones]);

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
    if (!confirm('Eliminar reserva?')) return
    try {
      const res = await fetch(`http://localhost:3001/reservas/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Error en el servidor')
      }
      console.log('Reserva eliminada:', data)
      fetchAll()
    } catch (e) {
      console.error(e)
      alert('Error eliminando reserva')
    }
  }

  const Avatar = ({ nombre }) => {
    const colors = ['#e74c3c','#3498db','#f1c40f','#2ecc71','#9b59b6','#e67e22'];
    const color = colors[nombre.charCodeAt(0) % colors.length];
    return <div className="rounded-circle text-white d-flex justify-content-center align-items-center me-2 shadow" style={{ backgroundColor: color, width: '35px', height: '35px', fontWeight:'bold'}}>{nombre.charAt(0)}</div>;
  };

  return (
    <>
      <h3 className="mb-4 text-gradient" style={{background:'linear-gradient(to right,#ff7e5f,#feb47b)',WebkitBackgroundClip:'text',color:'transparent'}}>Reservas</h3>

      <div className="card shadow-lg rounded-4 mb-4 border-primary">
        <div className="card-header bg-primary text-white fw-bold fs-5">Nueva Reserva</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-2">
              <div className="col-md-3">
                <select className="form-select shadow-sm" value={form.habitacion_id} onChange={e=>setForm({...form, habitacion_id:e.target.value})}>
                  <option value="">Habitación...</option>
                  {habitaciones.map(h=><option key={h.id} value={h.id}>{h.numero} - {h.tipo} - {h.precio_base}</option>)}
                </select>
              </div>
              <div className="col-md-3">
                <select className="form-select shadow-sm" value={form.cliente_id} onChange={e=>setForm({...form, cliente_id:e.target.value})}>
                  <option value="">Cliente...</option>
                  {clientes.map(c=><option key={c.id} value={c.id}>{c.nombre} ({c.email})</option>)}
                </select>
              </div>
              <div className="col-md-2">
                <input type="date" className="form-control shadow-sm" value={form.fecha_inicio} onChange={e=>setForm({...form, fecha_inicio:e.target.value})}/>
              </div>
              <div className="col-md-2">
                <input type="date" className="form-control shadow-sm" value={form.fecha_fin} onChange={e=>setForm({...form, fecha_fin:e.target.value})}/>
              </div>
              <div className="col-md-2">
                <input className="form-control shadow-sm" placeholder="Monto total" value={form.monto_total} readOnly />
              </div>
            </div>
            <div className="mt-2">
              <button className="btn btn-gradient w-100 shadow-lg" style={{background:'linear-gradient(45deg,#1abc9c,#16a085)', color:'white', transition:'transform 0.2s'}}
                onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
              >Reservar</button>
            </div>
          </form>
        </div>
      </div>

      {loading && <Loading/>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-lg rounded-4 border-info">
        <div className="card-body p-0">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr><th>ID</th><th>Cliente</th><th>Habitación</th><th>Inicio</th><th>Fin</th><th>Monto</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {reservas.map(r=>{
                const habit = habitaciones.find(h=>String(h.id)===String(r.habitacion_id)) || {};
                const client = clientes.find(c=>String(c.id)===String(r.cliente_id)) || {};
                return (
                  <tr key={r.id} style={{transition:'all 0.2s'}} onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f0f8ff'} onMouseLeave={e=>e.currentTarget.style.backgroundColor=''}>
                    <td>{r.id}</td>
                    <td className="d-flex align-items-center"><Avatar nombre={client.nombre || r.cliente} />{client.nombre || r.cliente}</td>
                    <td>{r.habitacion} - {r.tipo}</td>
                    <td>{new Date(r.fecha_inicio).toLocaleDateString()}</td>
                    <td>{new Date(r.fecha_fin).toLocaleDateString()}</td>
                    <td>{r.monto_total}</td>
                    <td>
                      <button className="btn btn-sm btn-danger shadow-sm" onClick={()=>onDelete(r.id)}>Eliminar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
