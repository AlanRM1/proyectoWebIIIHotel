import { db } from '../config/db.js';

export const obtReservas = async () => {
    const [resultado] = await db.query(`
        SELECT r.id, r.fecha_inicio, r.fecha_fin, r.monto_total,
               c.nombre AS cliente, h.numero AS habitacion, h.tipo
        FROM reservas r
        JOIN clientes c ON r.cliente_id = c.id
        JOIN habitaciones h ON r.habitacion_id = h.id
    `);
    return resultado;
};

export const insertaReserva = async (reserva) => {
    const { cliente_id, tipo, fecha_inicio, fecha_fin } = reserva;

    const [habitacionesLibres] = await db.query(`
        SELECT h.id, h.precio_base
        FROM habitaciones h
        WHERE h.tipo = ? AND h.estado = 'activa'
        AND h.id NOT IN (
            SELECT habitacion_id FROM reservas
            WHERE fecha_inicio <= ? AND fecha_fin >= ?
        )
        LIMIT 1
    `, [tipo, fecha_fin, fecha_inicio]);

    if (habitacionesLibres.length === 0) {
        throw new Error('No hay habitaciones disponibles en los días que escogiste');
    }

    const habitacion = habitacionesLibres[0];
    const noches = Math.ceil((new Date(fecha_fin) - new Date(fecha_inicio)) / (1000*60*60*24));
    const monto_total = noches * habitacion.precio_base;

    const [resultado] = await db.query(`
        INSERT INTO reservas(habitacion_id, cliente_id, fecha_inicio, fecha_fin, monto_total)
        VALUES (?,?,?,?,?)
    `, [habitacion.id, cliente_id, fecha_inicio, fecha_fin, monto_total]);

    return { id: resultado.insertId, habitacion_id: habitacion.id, cliente_id, fecha_inicio, fecha_fin, monto_total };
};

export const actualizaReserva = async (id, datos) => {
    const { fecha_inicio, fecha_fin } = datos;
    await db.query('UPDATE reservas SET fecha_inicio = ?, fecha_fin = ? WHERE id = ?', [fecha_inicio, fecha_fin, id]);
    return { id, ...datos };
};

export const eliminaReserva = async (id) => {
    await db.query('DELETE FROM reservas WHERE id = ?', [id]);
    return id;
};