import React from 'react'
export default function Loading({ text = "Cargando..." }) {
  return (
    <div className="d-flex justify-content-center align-items-center py-4">
      <div className="spinner-border" role="status" aria-hidden="true"></div>
      <div className="ms-2">{text}</div>
    </div>
  )
}
