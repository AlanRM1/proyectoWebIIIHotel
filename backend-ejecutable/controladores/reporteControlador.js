const { usoDiario, ingresosPorDia, ingresosPorMes } = require('../modelos/reporteModelo.js');

exports.reporteUsoDiario = async (req, res) => {
    const { inicio, fin } = req.query;
    const resultado = await usoDiario(inicio, fin);
    res.json(resultado);
};

exports.reporteIngresosDia = async (req, res) => {
    const { inicio, fin } = req.query;
    const resultado = await ingresosPorDia(inicio, fin);
    res.json(resultado);
};

exports.reporteIngresosMes = async (req, res) => {
    const resultado = await ingresosPorMes();
    res.json(resultado);
};
