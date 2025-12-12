const { db } = require('../config/db.js');

const usoDiario = async (inicio, fin) => {
    const [resultado] = await db.query(`
        SELECT d.dia,
               h.tipo,
               COUNT(DISTINCT r.habitacion_id) AS ocupadas,
               (SELECT COUNT(*) FROM habitaciones WHERE tipo = h.tipo AND estado = 'activa') AS total
        FROM (
            SELECT DATE(?) + INTERVAL seq DAY AS dia
            FROM seq_0_to_1000
            WHERE DATE(?) + INTERVAL seq DAY <= DATE(?)
        ) d
        JOIN habitaciones h
        LEFT JOIN reservas r
          ON r.habitacion_id = h.id
         AND r.fecha_inicio <= d.dia
         AND r.fecha_fin >= d.dia
        GROUP BY d.dia, h.tipo
        ORDER BY d.dia, h.tipo
    `, [inicio, inicio, fin]);
    return resultado;
};

const ingresosPorDia = async (inicio, fin) => {
    const [resultado] = await db.query(`
        SELECT DATE(creado_en) AS dia, SUM(monto_total) AS ingresos
        FROM reservas
        WHERE creado_en BETWEEN ? AND ?
        GROUP BY dia
        ORDER BY dia
    `, [inicio, fin]);
    return resultado;
};

const ingresosPorMes = async () => {
    const [resultado] = await db.query(`
        SELECT DATE_FORMAT(creado_en, '%Y-%m') AS mes, SUM(monto_total) AS ingresos
        FROM reservas
        GROUP BY mes
        ORDER BY mes
    `);
    return resultado;
};

module.exports = {
    usoDiario,
    ingresosPorDia,
    ingresosPorMes
};
