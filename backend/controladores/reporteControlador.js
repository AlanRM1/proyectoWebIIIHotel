import { usoDiario, ingresosPorDia, ingresosPorMes } from '../modelos/reporteModelo.js';

export const reporteUsoDiario = async (req, res) => {
    const { inicio, fin } = req.query;
    const resultado = await usoDiario(inicio, fin);
    res.json(resultado);
};

export const reporteIngresosDia = async (req, res) => {
    const { inicio, fin } = req.query;
    const resultado = await ingresosPorDia(inicio, fin);
    res.json(resultado);
};

export const reporteIngresosMes = async (req, res) => {
    const resultado = await ingresosPorMes();
    res.json(resultado);
};