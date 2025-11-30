import express from 'express';
import {
    muestraClientes,
    muestraCliente,
    creaCliente,
    editaCliente,
    borraCliente
} from '../controladores/clienteControlador.js';

const rutas = express.Router();

rutas.get('/', muestraClientes);
rutas.get('/:id', muestraCliente);
rutas.post('/adi', creaCliente);
rutas.put('/:id', editaCliente);
rutas.delete('/:id', borraCliente);

export default rutas;
