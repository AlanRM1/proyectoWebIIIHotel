import React from 'react';
import { FaBed, FaUser, FaCalendarAlt, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar({ onChangeRoute, active, user, logout }) {
  // Definimos las pestañas visibles según el rol
  const navItems = [
    { name: 'habitaciones', label: 'Habitaciones', icon: <FaBed /> },
    { name: 'clientes', label: 'Clientes', icon: <FaUser />, adminOnly: true },
    { name: 'reservas', label: 'Reservas', icon: <FaCalendarAlt /> },
    { name: 'reportes', label: 'Reportes', icon: <FaChartBar />, adminOnly: true },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ background: 'linear-gradient(to right, #4e54c8, #8f94fb)' }}
    >
      <div className="container">
        <a
          className="navbar-brand text-white fw-bold"
          href="#"
          onClick={() => onChangeRoute('habitaciones')}
          style={{ fontSize: '1.5rem', letterSpacing: '1px' }}
        >
          Hotel Manager
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Menú principal */}
            {navItems.map(item => {
              // Solo mostrar si no es adminOnly o si el usuario es admin
              if (item.adminOnly && (!user || user.rol !== 'admin')) return null;
              return (
                <li className="nav-item" key={item.name}>
                  <button
                    className={`nav-link btn btn-link d-flex align-items-center fw-semibold ${
                      active === item.name ? 'text-warning' : 'text-white'
                    }`}
                    onClick={() => onChangeRoute(item.name)}
                    style={{ transition: 'all 0.3s ease', fontSize: '1rem', marginRight: '0.5rem' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <span className="me-1">{item.icon}</span> {item.label}
                  </button>
                </li>
              );
            })}

            {/* Mostrar Login/Register si no hay usuario */}
            {!user && (
              <>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-white fw-bold ${
                      active === 'login' ? 'text-warning' : ''
                    }`}
                    onClick={() => onChangeRoute('login')}
                    style={{ transition: 'all 0.3s ease', fontSize: '1rem', marginRight: '0.5rem' }}
                  >
                    Iniciar sesión
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link btn btn-link text-white fw-bold ${
                      active === 'register' ? 'text-warning' : ''
                    }`}
                    onClick={() => onChangeRoute('register')}
                    style={{ transition: 'all 0.3s ease', fontSize: '1rem' }}
                  >
                    Registrarse
                  </button>
                </li>
              </>
            )}

            {/* Mostrar Cerrar sesión si hay usuario */}
            {user && (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-danger d-flex align-items-center fw-bold"
                  onClick={logout}
                  style={{ transition: 'all 0.3s ease', fontSize: '1rem' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <FaSignOutAlt className="me-1" /> Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
