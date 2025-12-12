const express = require('express');
const {
    reporteUsoDiario,
    reporteIngresosDia,
    reporteIngresosMes
} = require('../controladores/reporteControlador.js');

const rutas = express.Router();

rutas.get('/uso-diario', reporteUsoDiario);
rutas.get('/ingresos-dia', reporteIngresosDia);
rutas.get('/ingresos-mes', reporteIngresosMes);

module.exports = rutas;
