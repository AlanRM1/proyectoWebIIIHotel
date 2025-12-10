import { useState } from "react";
import { api } from "../api.js";

function NuevoHabitacion() {
  const [habitacion, setHabitacion] = useState({
    numero: "",
    tipo: "simple",
    precio_base: 0,
    estado: "activa"
  });

  function leeHabitacion(e) {
    setHabitacion({
      ...habitacion,
      [e.target.name]: e.target.value
    });
  }

  async function insertaHabitacion(e) {
    e.preventDefault();
    await api.post("/habitaciones/adi", habitacion);
    window.location.reload(); // vuelve a la lista
  }

  function cancelar() {
    window.location.reload(); // vuelve a la lista
  }

  return (
    <>
      <h2>Nueva Habitación</h2>
      <form onSubmit={insertaHabitacion}>
        <input type="text" name="numero" placeholder="Número" onChange={leeHabitacion} />
        <select name="tipo" onChange={leeHabitacion}>
          <option value="simple">Simple</option>
          <option value="doble">Doble</option>
          <option value="suite">Suite</option>
        </select>
        <input type="number" name="precio_base" placeholder="Precio" onChange={leeHabitacion} />
        <select name="estado" onChange={leeHabitacion}>
          <option value="activa">Activa</option>
          <option value="inactiva">Inactiva</option>
        </select>
        <button type="submit">Guardar</button>
        <button type="button" onClick={cancelar}>Cancelar</button>
      </form>
    </>
  );
}

export default NuevoHabitacion;
