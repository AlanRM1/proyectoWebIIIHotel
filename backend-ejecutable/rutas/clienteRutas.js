const express = require('express');
const {
    muestraClientes,
    muestraCliente,
    creaCliente,
    editaCliente,
    borraCliente
} = require('../controladores/clienteControlador.js');

const rutas = express.Router();

rutas.get('/', muestraClientes);
rutas.get('/:id', muestraCliente);
rutas.post('/', creaCliente);
rutas.put('/:id', editaCliente);
rutas.delete('/:id', borraCliente);

module.exports = rutas;
