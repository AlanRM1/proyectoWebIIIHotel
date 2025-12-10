import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 8000
});

export const getHabitaciones = () => API.get('/habitaciones');
export const crearHabitacion = (data) => API.post('/habitaciones/adi', data);
export const actualizarHabitacion = (id, data) => API.put(`/habitaciones/${id}`, data);
export const eliminarHabitacion = (id) => API.delete(`/habitaciones/${id}`);

export const getClientes = () => API.get('/clientes');
export const crearCliente = (data) => API.post('/clientes/adi', data);
export const actualizarCliente = (id, data) => API.put(`/clientes/${id}`, data);
export const eliminarCliente = (id) => API.delete(`/clientes/${id}`);

export const getReservas = () => API.get('/reservas');
export const crearReserva = (data) => API.post('/reservas/adi', data);
export const eliminarReserva = (id) => API.delete(`/reservas/${id}`);

export default API;
