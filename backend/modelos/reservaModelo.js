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
  const { cliente_id, habitacion_id, fecha_inicio, fecha_fin } = reserva;

  const [conflictos] = await db.query(`
    SELECT id FROM reservas
    WHERE habitacion_id = ?
    AND NOT (fecha_fin <= ? OR fecha_inicio >= ?)
  `, [habitacion_id, fecha_inicio, fecha_fin]);

  if (conflictos.length > 0) {
    throw new Error('La habitación ya está reservada en ese rango de fechas');
  }

  const [habitacionData] = await db.query(`SELECT precio_base FROM habitaciones WHERE id = ?`, [habitacion_id]);
  if (habitacionData.length === 0) {
    throw new Error('Habitación no encontrada o inactiva');
  }

  const precio_base = habitacionData[0].precio_base;
  const noches = Math.ceil((new Date(fecha_fin) - new Date(fecha_inicio)) / (1000*60*60*24));
  const monto_total = noches * precio_base;

  const [resultado] = await db.query(`
    INSERT INTO reservas(habitacion_id, cliente_id, fecha_inicio, fecha_fin, monto_total)
    VALUES (?,?,?,?,?)
  `, [habitacion_id, cliente_id, fecha_inicio, fecha_fin, monto_total]);

  return { id: resultado.insertId, habitacion_id, cliente_id, fecha_inicio, fecha_fin, monto_total };
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