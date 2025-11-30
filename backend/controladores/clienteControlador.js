import {
    obtClientes,
    obtCliente,
    insertaCliente,
    actualizaCliente,
    eliminaCliente
} from '../modelos/clienteModelo.js';

export const muestraClientes = async (req, res) => {
    const resultado = await obtClientes();
    res.json(resultado);
};

export const muestraCliente = async (req, res) => {
    const resultado = await obtCliente(req.params.id);
    if (!resultado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(resultado);
};

export const creaCliente = async (req, res) => {
    const resultado = await insertaCliente(req.body);
    res.json(resultado);
};

export const editaCliente = async (req, res) => {
    const resultado = await actualizaCliente(req.params.id, req.body);
    res.json(resultado);
};

export const borraCliente = async (req, res) => {
    const resultado = await eliminaCliente(req.params.id);
    res.json({ eliminado: resultado });
};
