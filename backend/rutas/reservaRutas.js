import express from 'express';
import {
    muestraReservas,
    creaReserva,
    editaReserva,
    borraReserva
} from '../controladores/reservaControlador.js';

const rutas = express.Router();

rutas.get('/', muestraReservas);
rutas.post('/adi', creaReserva);
rutas.put('/:id', editaReserva);
rutas.delete('/:id', borraReserva);

export default rutas;