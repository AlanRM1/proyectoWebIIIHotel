import React, { useEffect, useState } from 'react';
import { getHabitaciones, crearHabitacion, actualizarHabitacion, eliminarHabitacion } from '../api/api';
import Loading from '../components/Loading';

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ numero: '', tipo: '', precio_base: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const res = await getHabitaciones();
      setHabitaciones(res.data);
    } catch (e) {
      console.error(e);
      setError('Error cargando habitaciones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.numero || !form.tipo || !form.precio_base) { alert('Completa todos los campos'); return; }
    try {
      if (editId) await actualizarHabitacion(editId, { ...form });
      else await crearHabitacion({ ...form });
      setForm({ numero:'', tipo:'', precio_base:'' });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error guardando habitación');
    }
  };

  const onEdit = (h) => {
    setEditId(h.id);
    setForm({ numero: h.numero, tipo: h.tipo, precio_base: h.precio_base });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if(!confirm('Eliminar habitación?')) return;
    try { await eliminarHabitacion(id); fetchData(); } 
    catch(e){ alert('Error eliminando'); }
  };

  const TipoBadge = ({ tipo }) => {
    const colors = { simple: '#1abc9c', doble: '#3498db', suite: '#9b59b6' };
    return <span className="badge text-white fw-bold" style={{ backgroundColor: colors[tipo] || '#7f8c8d' }}>{tipo.toUpperCase()}</span>;
  };

  return (
    <>
      <h3 className="mb-4 text-gradient" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Habitaciones
      </h3>

      <div className="card shadow-lg rounded-4 mb-4 border-primary">
        <div className="card-header bg-primary text-white fw-bold fs-5">{editId ? 'Editar Habitación' : 'Nueva Habitación'}</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <input className="form-control shadow-sm" placeholder="Número" value={form.numero} onChange={e=>setForm({...form, numero:e.target.value})}/>
              </div>
              <div className="col-md-3">
                <select className="form-select shadow-sm" value={form.tipo} onChange={e=>setForm({...form, tipo:e.target.value})}>
                  <option value="">Tipo...</option>
                  <option value="simple">Simple</option>
                  <option value="doble">Doble</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
              <div className="col-md-3">
                <input type="number" step="0.01" className="form-control shadow-sm" placeholder="Precio base" value={form.precio_base} onChange={e=>setForm({...form, precio_base:e.target.value})}/>
              </div>
              <div className="col-md-3">
                <button className="btn btn-gradient w-100 shadow-lg" style={{ background: 'linear-gradient(45deg, #1abc9c, #16a085)', color: 'white', transition:'transform 0.2s' }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.05)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                >{editId ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading && <Loading />}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-lg rounded-4 border-info">
        <div className="card-body p-0">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr><th>ID</th><th>Número</th><th>Tipo</th><th>Precio</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {habitaciones.map(h => (
                <tr key={h.id} style={{ transition:'all 0.2s' }} 
                    onMouseEnter={e=>e.currentTarget.style.backgroundColor='#f0f8ff'}
                    onMouseLeave={e=>e.currentTarget.style.backgroundColor=''}>
                  <td>{h.id}</td>
                  <td>{h.numero}</td>
                  <td><TipoBadge tipo={h.tipo} /></td>
                  <td>{h.precio_base}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2 shadow-sm" onClick={()=>onEdit(h)}>Editar</button>
                    <button className="btn btn-sm btn-danger shadow-sm" onClick={()=>onDelete(h.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
