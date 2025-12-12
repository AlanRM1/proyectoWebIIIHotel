const {
    obtHabitaciones,
    obtHabitacion,
    insertaHabitacion,
    actualizaHabitacion,
    eliminaHabitacion
} = require('../modelos/habitacionModelo.js');

exports.muestraHabitaciones = async (req, res) => {
    const resultado = await obtHabitaciones();
    res.json(resultado);
};

exports.muestraHabitacion = async (req, res) => {
    const fila = await obtHabitacion(req.params.id);
    if (!fila) return res.status(404).json({ mensaje: 'Habitación no encontrada' });
    res.json(fila);
};

exports.creaHabitacion = async (req, res) => {
    const resultado = await insertaHabitacion(req.body);
    res.json(resultado);
};

exports.editaHabitacion = async (req, res) => {
    const resultado = await actualizaHabitacion(req.params.id, req.body);
    res.json(resultado);
};

exports.borraHabitacion = async (req, res) => {
    const resultado = await eliminaHabitacion(req.params.id);
    res.json({ eliminado: resultado });
};
