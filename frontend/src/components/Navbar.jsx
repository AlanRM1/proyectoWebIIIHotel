import React from 'react'

export default function Navbar({ onChangeRoute, active }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#" onClick={()=>onChangeRoute('habitaciones')}>Hotel Manager</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${active==='habitaciones'?'text-info':'text-light'}`} onClick={()=>onChangeRoute('habitaciones')}>Habitaciones</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${active==='clientes'?'text-info':'text-light'}`} onClick={()=>onChangeRoute('clientes')}>Clientes</button>
            </li>
            <li className="nav-item">
              <button className={`nav-link btn btn-link ${active==='reservas'?'text-info':'text-light'}`} onClick={()=>onChangeRoute('reservas')}>Reservas</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
