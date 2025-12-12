const express = require('express');
const cors = require('cors');

const habitacionRutas = require('./rutas/habitacionRutas.js');
const clienteRutas = require('./rutas/clienteRutas.js');
const reservaRutas = require('./rutas/reservaRutas.js');
const reporteRutas = require('./rutas/reporteRutas.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/habitaciones', habitacionRutas);
app.use('/clientes', clienteRutas);
app.use('/reservas', reservaRutas);
app.use('/reportes', reporteRutas);

const puerto = 3001;
app.listen(puerto, () => {
    console.log(`Servidor en http://localhost:${puerto}`);
});
