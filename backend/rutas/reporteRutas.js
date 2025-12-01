import express from 'express';
import {
    reporteUsoDiario,
    reporteIngresosDia,
    reporteIngresosMes
} from '../controladores/reporteControlador.js';

const rutas = express.Router();

rutas.get('/uso-diario', reporteUsoDiario);
rutas.get('/ingresos-dia', reporteIngresosDia);
rutas.get('/ingresos-mes', reporteIngresosMes);

export default rutas;
