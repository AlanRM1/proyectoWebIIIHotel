--Para crear base de datos

CREATE DATABASE hotel;

USE hotel;

-- Tabla de clientes
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,   -- se recomienda guardar hash (ej: bcrypt)
    telefono VARCHAR(20),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de habitaciones
CREATE TABLE habitaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(10) NOT NULL UNIQUE,   -- Ej: "101", "202"
    tipo ENUM('simple','doble','suite') NOT NULL,
    precio_base DECIMAL(10,2) NOT NULL,
    estado ENUM('activa','inactiva') DEFAULT 'activa'
);

-- Tabla de reservas
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    habitacion_id INT NOT NULL,
    cliente_id INT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    monto_total DECIMAL(10,2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reserva_habitacion
        FOREIGN KEY (habitacion_id) REFERENCES habitaciones(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_reserva_cliente
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
        ON DELETE CASCADE
);


-----------------------------------------------------------------
--Ejemplo para las habitaciones
-----------------------------------------------------------------
INSERT INTO habitaciones (numero, tipo, precio_base) 
VALUES 
('101', 'simple', 100.00),
('102', 'simple', 100.00),
('103', 'simple', 100.00),
('104', 'simple', 100.00),
('105', 'simple', 100.00),
('201', 'doble', 200.00),
('202', 'doble', 200.00),
('203', 'doble', 200.00),
('204', 'doble', 200.00),
('205', 'doble', 200.00),
('301', 'suite', 300.00),
('302', 'suite', 300.00),
('303', 'suite', 300.00),
('304', 'suite', 300.00),
('305', 'suite', 300.00);


