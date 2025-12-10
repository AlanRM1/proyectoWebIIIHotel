import { useState, useEffect } from "react";
import { api } from "../api.js";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [reserva, setReserva] = useState({
    cliente_id: "",
    tipo: "simple",
    fecha_inicio: "",
    fecha_fin: ""
  });

  async function consulta() {
    const resultado = await api.get("/reservas");
    setReservas(resultado.data);
  }

  useEffect(() => {
    consulta();
  }, []);

  function leeReserva(e) {
    setReserva({
      ...reserva,
      [e.target.name]: e.target.value
    });
  }

  async function insertaReserva(e) {
    e.preventDefault();
    await api.post("/reservas/adi", reserva);
    consulta();
  }

  async function eliminaReserva(id) {
    await api.delete(`/reservas/${id}`);
    consulta();
  }

  return (
    <>
      <h2>Reservas</h2>
      <form onSubmit={insertaReserva}>
        <input type="number" name="cliente_id" placeholder="ID Cliente" onChange={leeReserva} />
        <select name="tipo" onChange={leeReserva}>
          <option value="simple">Simple</option>
          <option value="doble">Doble</option>
          <option value="suite">Suite</option>
        </select>
        <input type="date" name="fecha_inicio" onChange={leeReserva} />
        <input type="date" name="fecha_fin" onChange={leeReserva} />
        <button type="submit">Reservar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Habitación</th>
            <th>Tipo</th>
            <th>Inicio</th>
            <th>Fin</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.cliente}</td>
              <td>{r.habitacion}</td>
              <td>{r.tipo}</td>
              <td>{r.fecha_inicio}</td>
              <td>{r.fecha_fin}</td>
              <td>Bs. {r.monto_total}</td>
              <td>
                <button onClick={() => eliminaReserva(r.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Reservas;