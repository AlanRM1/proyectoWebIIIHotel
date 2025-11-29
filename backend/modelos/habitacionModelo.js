import { db } from '../config/db.js';

export const obtHabitaciones = async () => {
    const [resultado] = await db.query('SELECT * FROM habitaciones');
    return resultado;
};

export const insertaHabitacion = async (datos) => {
    const { numero, tipo, precio_base, estado } = datos;
    const [resultado] = await db.query(
        'INSERT INTO habitaciones(numero, tipo, precio_base, estado) VALUES (?, ?, ?, ?)',
        [numero, tipo, precio_base, estado]
    );
    return { id: resultado.insertId, ...datos };
};

export const actualizaHabitacion = async (id, datos) => {
    const { numero, tipo, precio_base, estado } = datos;
    await db.query(
        'UPDATE habitaciones SET numero = ?, tipo = ?, precio_base = ?, estado = ? WHERE id = ?',
        [numero, tipo, precio_base, estado, id]
    );
    return { id, ...datos };
};

export const eliminaHabitacion = async (id) => {
    await db.query('DELETE FROM habitaciones WHERE id = ?', [id]);
    return id;
};
