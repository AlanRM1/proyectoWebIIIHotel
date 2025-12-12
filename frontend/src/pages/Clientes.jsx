import React, { useEffect, useState } from 'react';
import { getClientes, crearCliente, actualizarCliente, eliminarCliente } from '../api/api';
import Loading from '../components/Loading';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({ nombre: '', email: '', contrasena: '', telefono: '' });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    setLoading(true); setError(null);
    try {
      const res = await getClientes();
      setClientes(res.data);
    } catch (e) {
      console.error(e);
      setError('Error cargando clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.contrasena) {
      alert('Completa los campos obligatorios'); 
      return;
    }
    try {
      if (editId) await actualizarCliente(editId, form);
      else await crearCliente(form);
      setForm({ nombre: '', email: '', contrasena: '', telefono: '' });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error guardando cliente');
    }
  };

  const onEdit = (c) => {
    setEditId(c.id);
    setForm({ nombre: c.nombre, email: c.email, contrasena: c.contrasena, telefono: c.telefono || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onDelete = async (id) => {
    if (!confirm('Eliminar cliente?')) return;
    try { await eliminarCliente(id); fetchData(); } 
    catch (e) { alert('Error eliminando'); }
  };

  // Genera avatar con colores aleatorios por cliente
  const Avatar = ({ nombre }) => {
    const colors = ['#e74c3c', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6', '#e67e22'];
    const color = colors[nombre.charCodeAt(0) % colors.length]; // siempre mismo color por inicial
    return (
      <div className="d-flex align-items-center">
        <div 
          className="rounded-circle text-white d-flex justify-content-center align-items-center me-2 shadow" 
          style={{
            backgroundColor: color,
            width: '40px',
            height: '40px',
            fontWeight: 'bold',
            transition: 'transform 0.3s'
          }}
        >
          {nombre ? nombre.charAt(0).toUpperCase() : '?'}
        </div>
        <span className="fw-semibold">{nombre}</span>
      </div>
    );
  };

  return (
    <>
      <h3 className="mb-4 text-gradient" style={{ background: 'linear-gradient(to right, #ff7e5f, #feb47b)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Clientes
      </h3>

      <div className="card shadow-lg rounded-4 mb-4 border-primary">
        <div className="card-header bg-primary text-white fw-bold fs-5"> {editId ? 'Editar Cliente' : 'Nuevo Cliente'} </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <input 
                  className="form-control shadow-sm" 
                  placeholder="Nombre" 
                  value={form.nombre} 
                  onChange={e => setForm({...form, nombre: e.target.value})} 
                />
              </div>
              <div className="col-md-3">
                <input 
                  className="form-control shadow-sm" 
                  placeholder="Email" 
                  value={form.email} 
                  onChange={e => setForm({...form, email: e.target.value})} 
                />
              </div>
              <div className="col-md-3">
                <input 
                  className="form-control shadow-sm" 
                  placeholder="Contraseña" 
                  type="password" 
                  value={form.contrasena} 
                  onChange={e => setForm({...form, contrasena: e.target.value})} 
                />
              </div>
              <div className="col-md-3">
                <input 
                  className="form-control shadow-sm" 
                  placeholder="Teléfono" 
                  value={form.telefono} 
                  onChange={e => setForm({...form, telefono: e.target.value})} 
                />
              </div>
            </div>
            <div className="mt-3">
              <button className="btn btn-gradient btn-lg shadow" style={{
                background: 'linear-gradient(45deg, #1abc9c, #16a085)',
                color: 'white',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {editId ? 'Actualizar' : 'Guardar'}
              </button>
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
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id} className="align-middle" style={{ transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f8ff'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = ''}>
                  <td>{c.id}</td>
                  <td><Avatar nombre={c.nombre} /></td>
                  <td>{c.email}</td>
                  <td>{c.telefono}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2 shadow-sm" onClick={() => onEdit(c)}>Editar</button>
                    <button className="btn btn-sm btn-danger shadow-sm" onClick={() => onDelete(c.id)}>Eliminar</button>
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
