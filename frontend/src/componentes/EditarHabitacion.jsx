import { useState, useEffect } from "react";
import { api } from "../api.js";

function EditarHabitacion({ id }) {
  const [habitacion, setHabitacion] = useState({
    numero: "",
    tipo: "simple",
    precio_base: 0,
    estado: "activa"
  });
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function consultaHabitacion() {
      try {
        const { data } = await api.get(`/habitaciones/${id}`);
        setHabitacion(data);
      } catch (err) {
        setError("No se pudo cargar la habitación. Verifica el endpoint /habitaciones/:id.");
      } finally {
        setCargando(false);
      }
    }
    if (id) consultaHabitacion();
  }, [id]);

  function leeHabitacion(e) {
    setHabitacion({ ...habitacion, [e.target.name]: e.target.value });
  }

  async function actualizaHabitacion(e) {
    e.preventDefault();
    await api.put(`/habitaciones/${id}`, habitacion);
    window.location.reload();
  }

  function cancelar() {
    window.location.reload();
  }

  if (cargando) return <p>Cargando datos de la habitación...</p>;
  if (error) return (
    <>
      <p style={{ color: 'red' }}>{error}</p>
      <button type="button" onClick={cancelar}>Volver</button>
    </>
  );

  return (
    <>
      <h2>Editar Habitación</h2>
      <form onSubmit={actualizaHabitacion}>
        <div>
          <label>Número:</label>
          <input type="text" name="numero" value={habitacion.numero} onChange={leeHabitacion} />
        </div>

        <div>
          <label>Tipo:</label>
          <select name="tipo" value={habitacion.tipo} onChange={leeHabitacion}>
            <option value="simple">Simple</option>
            <option value="doble">Doble</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        <div>
          <label>Precio base:</label>
          <input type="number" name="precio_base" value={habitacion.precio_base} onChange={leeHabitacion} />
        </div>

        <div>
          <label>Estado:</label>
          <select name="estado" value={habitacion.estado} onChange={leeHabitacion}>
            <option value="activa">Activa</option>
            <option value="inactiva">Inactiva</option>
          </select>
        </div>

        <button type="submit">Guardar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    </>
  );
}

export default EditarHabitacion;
