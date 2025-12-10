import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Habitaciones from './pages/Habitaciones'
import Clientes from './pages/Clientes'
import Reservas from './pages/Reservas'

export default function App(){
  const [route, setRoute] = useState('habitaciones')

  return (
    <>
      <Navbar onChangeRoute={setRoute} active={route} />
      <div className="container mt-4">
        {route === 'habitaciones' && <Habitaciones />}
        {route === 'clientes' && <Clientes />}
        {route === 'reservas' && <Reservas />}
      </div>
    </>
  )
}
