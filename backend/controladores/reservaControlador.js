import {
    obtReservas,
    insertaReserva,
    actualizaReserva,
    eliminaReserva
} from '../modelos/reservaModelo.js';

export const muestraReservas = async (req, res) => {
    const resultado = await obtReservas();
    res.json(resultado);
};

export const creaReserva = async (req, res) => {
    try {
        const resultado = await insertaReserva(req.body);
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const editaReserva = async (req, res) => {
    const resultado = await actualizaReserva(req.params.id, req.body);
    res.json(resultado);
};

export const borraReserva = async (req, res) => {
    const resultado = await eliminaReserva(req.params.id);
    res.json({ eliminado: resultado });
};