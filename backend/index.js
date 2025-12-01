import express from 'express';
import cors from 'cors';
import habitacionRutas from './rutas/habitacionRutas.js';
import clienteRutas from './rutas/clienteRutas.js';
import reservaRutas from './rutas/reservaRutas.js';
import reporteRutas from './rutas/reporteRutas.js';

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