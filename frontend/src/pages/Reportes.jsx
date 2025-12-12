import React, { useEffect, useState } from 'react';
import { getReporteUsoDiario, getReporteIngresosDia, getReporteIngresosMes } from '../api/api';
import Loading from '../components/Loading';

export default function Reportes() {
  const [tab, setTab] = useState('uso'); // 'uso', 'dia', 'mes'
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fechas opcionales para reportes diarios
  const [inicio, setInicio] = useState('');
  const [fin, setFin] = useState('');

  const fetchReportes = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if(tab === 'uso') res = await getReporteUsoDiario(inicio, fin);
      else if(tab === 'dia') res = await getReporteIngresosDia(inicio, fin);
      else res = await getReporteIngresosMes();

      setReportes(res.data);
    } catch (err) {
      console.error(err);
      setError('Error cargando reportes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportes();
  }, [tab, inicio, fin]);

  return (
    <>
      <h3 className="mb-3 text-primary">📊 Reportes del Hotel</h3>

      {/* Selector de pestañas */}
      <div className="mb-3 d-flex gap-2">
        <button className={`btn ${tab==='uso'?'btn-info':'btn-outline-info'}`} onClick={()=>setTab('uso')}>Uso Diario</button>
        <button className={`btn ${tab==='dia'?'btn-success':'btn-outline-success'}`} onClick={()=>setTab('dia')}>Ingresos Día</button>
        <button className={`btn ${tab==='mes'?'btn-warning':'btn-outline-warning'}`} onClick={()=>setTab('mes')}>Ingresos Mes</button>
      </div>

      {/* Selector de fechas para diarios */}
      {(tab==='uso' || tab==='dia') && (
        <div className="mb-3 d-flex gap-2 align-items-center">
          <label className="fw-bold">Inicio:</label>
          <input type="date" className="form-control w-auto" value={inicio} onChange={e=>setInicio(e.target.value)} />
          <label className="fw-bold">Fin:</label>
          <input type="date" className="form-control w-auto" value={fin} onChange={e=>setFin(e.target.value)} />
          <button className="btn btn-primary" onClick={fetchReportes}>Actualizar</button>
        </div>
      )}

      {loading && <Loading />}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Tabla de reportes */}
      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                {tab==='uso' && <>
                  <th>Fecha</th>
                  <th>Tipo Habitación</th>
                  <th>Ocupadas</th>
                  <th>Total</th>
                </>}
                {tab==='dia' && <>
                  <th>Fecha</th>
                  <th>Ingresos</th>
                </>}
                {tab==='mes' && <>
                  <th>Mes</th>
                  <th>Ingresos</th>
                </>}
              </tr>
            </thead>
            <tbody>
              {reportes.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-muted">No hay datos disponibles</td>
                </tr>
              ) : reportes.map((r, idx) => (
                <tr key={idx}>
                  {tab==='uso' && (
                    <>
                      <td>{r.dia}</td>
                      <td>{r.tipo}</td>
                      <td>{r.ocupadas}</td>
                      <td>{r.total}</td>
                    </>
                  )}
                  {tab==='dia' && (
                    <>
                      <td>{r.dia}</td>
                      <td className="text-success fw-bold">${r.ingresos}</td>
                    </>
                  )}
                  {tab==='mes' && (
                    <>
                      <td>{r.mes}</td>
                      <td className="text-warning fw-bold">${r.ingresos}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
