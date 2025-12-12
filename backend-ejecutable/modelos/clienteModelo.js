const { db } = require('../config/db.js');

const obtClientes = async () => {
    const [resultado] = await db.query('SELECT * FROM clientes');
    return resultado;
};

const obtCliente = async (id) => {
    const [resultado] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return resultado[0];
};

const insertaCliente = async (cliente) => {
    const { nombre, email, contrasena, telefono } = cliente;
    const [resultado] = await db.query(
        'INSERT INTO clientes(nombre, email, contrasena, telefono) VALUES (?,?,?,?)',
        [nombre, email, contrasena, telefono]
    );
    return { id: resultado.insertId, ...cliente };
};

const actualizaCliente = async (id, cliente) => {
    const { nombre, email, contrasena, telefono } = cliente;
    await db.query(
        'UPDATE clientes SET nombre = ?, email = ?, contrasena = ?, telefono = ? WHERE id = ?',
        [nombre, email, contrasena, telefono, id]
    );
    return { id, ...cliente };
};

const eliminaCliente = async (id) => {
    await db.query('DELETE FROM clientes WHERE id = ?', [id]);
    return id;
};

module.exports = {
    obtClientes,
    obtCliente,
    insertaCliente,
    actualizaCliente,
    eliminaCliente
};
