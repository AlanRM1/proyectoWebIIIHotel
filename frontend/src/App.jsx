import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Habitaciones from './pages/Habitaciones';
import Clientes from './pages/Clientes';
import Reservas from './pages/Reservas';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  const [route, setRoute] = useState('habitaciones');
  const [user, setUser] = useState(null); // Usuario logueado

  const handleLogin = async (data) => {
    // Aquí llamarías a tu API y devolverías el usuario
    // Ejemplo simulado:
    setUser({ nombre: 'Admin', rol: 'admin' });
    setRoute('habitaciones');
  };

  const handleRegister = async (data) => {
    // Llamada a API de registro
    setUser({ nombre: data.nombre, rol: 'cliente' });
    setRoute('habitaciones');
  };

  const handleLogout = () => {
    setUser(null);
    setRoute('login');
  };

  return (
    <>
      <Navbar onChangeRoute={setRoute} active={route} user={user} logout={handleLogout} />
      <div className="container mt-4">
        {route === 'habitaciones' && <Habitaciones />}
        {route === 'clientes' && <Clientes />}
        {route === 'reservas' && <Reservas />}
        {route === 'login' && <Login onLogin={handleLogin} />}
        {route === 'register' && <Register onRegister={handleRegister} />}
      </div>
    </>
  );
}
