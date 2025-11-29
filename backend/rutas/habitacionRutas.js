import express from 'express';
import {
    muestraHabitaciones,
    creaHabitacion,
    editaHabitacion,
    borraHabitacion
} from '../controladores/habitacionControlador.js';

const rutas = express.Router();

rutas.get('/', muestraHabitaciones);
rutas.post('/adi', creaHabitacion);
rutas.put('/:id', editaHabitacion);
rutas.delete('/:id', borraHabitacion);

export default rutas;
