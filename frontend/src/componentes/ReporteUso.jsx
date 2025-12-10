import { useState, useEffect } from "react";
import { api } from "../api.js";
import NuevoHabitacion from "./NuevoHabitacion.jsx";
import EditarHabitacion from "./EditarHabitacion.jsx";

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [id, setId] = useState(null);
  const [editar, setEditar] = useState(false);
  const [nuevo, setNuevo] = useState(false);

  async function consulta() {
    const resultado = await api.get("/habitaciones");
    setHabitaciones(resultado.data);
  }

  useEffect(() => {
    consulta();
  }, []);

  async function eliminaHabitacion(id) {
    await api.delete(`/habitaciones/${id}`);
    consulta();
  }

  if (editar) return <EditarHabitacion id={id} />;
  if (nuevo) return <NuevoHabitacion />;

  return (
    <>
      <h2>Lista de Habitaciones</h2>
      <button onClick={() => setNuevo(true)}>Nueva Habitación</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Número</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.numero}</td>
              <td>{h.tipo}</td>
              <td>Bs. {h.precio_base}</td>
              <td>
                <button onClick={() => { setEditar(true); setId(h.id); }}>Editar</button>
                <button onClick={() => eliminaHabitacion(h.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Habitaciones;
