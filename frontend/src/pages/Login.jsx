import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí llamas tu API de login
    onLogin({ email, password });
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '400px' }}>
      <div className="card-body">
        <h4 className="card-title mb-3">Iniciar Sesión</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
