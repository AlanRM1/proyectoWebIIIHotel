const express = require('express');
const {
    muestraHabitaciones,
    muestraHabitacion,
    creaHabitacion,
    editaHabitacion,
    borraHabitacion
} = require('../controladores/habitacionControlador.js');

const rutas = express.Router();

rutas.get('/', muestraHabitaciones);
rutas.get('/:id', muestraHabitacion);
rutas.post('/adi', creaHabitacion);
rutas.put('/:id', editaHabitacion);
rutas.delete('/:id', borraHabitacion);

module.exports = rutas;
