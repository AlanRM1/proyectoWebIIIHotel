import express from 'express';
import {
    muestraHabitaciones,
    muestraHabitacion,
    creaHabitacion,
    editaHabitacion,
    borraHabitacion
} from '../controladores/habitacionControlador.js';

const rutas = express.Router();

rutas.get('/', muestraHabitaciones);
rutas.get('/:id', muestraHabitacion);
rutas.post('/adi', creaHabitacion);
rutas.put('/:id', editaHabitacion);
rutas.delete('/:id', borraHabitacion);

export default rutas;
