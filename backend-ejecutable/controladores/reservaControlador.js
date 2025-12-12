const {
    obtReservas,
    insertaReserva,
    actualizaReserva,
    eliminaReserva
} = require('../modelos/reservaModelo.js');

exports.muestraReservas = async (req, res) => {
    const resultado = await obtReservas();
    res.json(resultado);
};

exports.creaReserva = async (req, res) => {
    try {
        const resultado = await insertaReserva(req.body);
        res.json(resultado);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.editaReserva = async (req, res) => {
    const resultado = await actualizaReserva(req.params.id, req.body);
    res.json(resultado);
};

exports.borraReserva = async (req, res) => {
    const resultado = await eliminaReserva(req.params.id);
    res.json({ eliminado: resultado });
};
