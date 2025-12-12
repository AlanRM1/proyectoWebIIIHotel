const {
    obtClientes,
    obtCliente,
    insertaCliente,
    actualizaCliente,
    eliminaCliente
} = require('../modelos/clienteModelo.js');

exports.muestraClientes = async (req, res) => {
    const resultado = await obtClientes();
    res.json(resultado);
};

exports.muestraCliente = async (req, res) => {
    const resultado = await obtCliente(req.params.id);
    if (!resultado) return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    res.json(resultado);
};

exports.creaCliente = async (req, res) => {
    const resultado = await insertaCliente(req.body);
    res.json(resultado);
};

exports.editaCliente = async (req, res) => {
    const resultado = await actualizaCliente(req.params.id, req.body);
    res.json(resultado);
};

exports.borraCliente = async (req, res) => {
    const resultado = await eliminaCliente(req.params.id);
    res.json({ eliminado: resultado });
};
