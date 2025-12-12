const { db } = require('../config/db.js');

const obtHabitaciones = async () => {
    const [resultado] = await db.query('SELECT * FROM habitaciones');
    return resultado;
};

const obtHabitacion = async (id) => {
    const [resultado] = await db.query('SELECT * FROM habitaciones WHERE id = ?', [id]);
    return resultado[0];
};

const insertaHabitacion = async (datos) => {
    const { numero, tipo, precio_base, estado } = datos;
    const [resultado] = await db.query(
        'INSERT INTO habitaciones(numero, tipo, precio_base, estado) VALUES (?, ?, ?, ?)',
        [numero, tipo, precio_base, estado]
    );
    return { id: resultado.insertId, ...datos };
};

const actualizaHabitacion = async (id, datos) => {
    const { numero, tipo, precio_base, estado } = datos;
    await db.query(
        'UPDATE habitaciones SET numero = ?, tipo = ?, precio_base = ?, estado = ? WHERE id = ?',
        [numero, tipo, precio_base, estado, id]
    );
    return { id, ...datos };
};

const eliminaHabitacion = async (id) => {
    await db.query('DELETE FROM habitaciones WHERE id = ?', [id]);
    return id;
};

module.exports = {
    obtHabitaciones,
    obtHabitacion,
    insertaHabitacion,
    actualizaHabitacion,
    eliminaHabitacion
};
