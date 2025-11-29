import {
    obtHabitaciones,
    insertaHabitacion,
    actualizaHabitacion,
    eliminaHabitacion
} from '../modelos/habitacionModelo.js';

export const muestraHabitaciones = async (req, res) => {
    const resultado = await obtHabitaciones();
    res.json(resultado);
};

export const creaHabitacion = async (req, res) => {
    const resultado = await insertaHabitacion(req.body);
    res.json(resultado);
};

export const editaHabitacion = async (req, res) => {
    const resultado = await actualizaHabitacion(req.params.id, req.body);
    res.json(resultado);
};

export const borraHabitacion = async (req, res) => {
    const resultado = await eliminaHabitacion(req.params.id);
    res.json({ eliminado: resultado });
};
