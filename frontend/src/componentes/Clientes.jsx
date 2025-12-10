import { useState, useEffect } from "react";
import { api } from "../api.js";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    telefono: ""
  });

  async function consulta() {
    const resultado = await api.get("/clientes");
    setClientes(resultado.data);
  }

  useEffect(() => {
    consulta();
  }, []);

  function leeCliente(e) {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });
  }

  async function insertaCliente(e) {
    e.preventDefault();
    await api.post("/clientes/adi", cliente);
    consulta();
  }

  async function eliminaCliente(id) {
    await api.delete(`/clientes/${id}`);
    consulta();
  }

  return (
    <>
      <h2>Lista de Clientes</h2>
      <form onSubmit={insertaCliente}>
        <input type="text" name="nombre" placeholder="Nombre" onChange={leeCliente} />
        <input type="email" name="email" placeholder="Email" onChange={leeCliente} />
        <input type="text" name="contrasena" placeholder="Contraseña" onChange={leeCliente} />
        <input type="text" name="telefono" placeholder="Teléfono" onChange={leeCliente} />
        <button type="submit">Registrar Cliente</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.nombre}</td>
              <td>{c.email}</td>
              <td>{c.telefono}</td>
              <td>
                <button onClick={() => eliminaCliente(c.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Clientes;