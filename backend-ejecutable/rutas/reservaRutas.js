const express = require('express');
const {
    muestraReservas,
    creaReserva,
    editaReserva,
    borraReserva
} = require('../controladores/reservaControlador.js');

const rutas = express.Router();

rutas.get('/', muestraReservas);
rutas.post('/adi', creaReserva);
rutas.put('/:id', editaReserva);
rutas.delete('/:id', borraReserva);

module.exports = rutas;
