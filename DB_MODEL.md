# Modelo de datos – Sistema de Reservas de Hotel

Este documento describe la estructura de la base de datos utilizada por la aplicación
de reservas. Incluye:

* Definición de tablas y sus atributos.  
* Relaciones entre las entidades.  
* Diagrama entidad‑relación (ER) generado con **Mermaid**.  

---

## 1️⃣ Tablas y atributos

| Tabla | Campo            | Tipo                              | Comentario |
|------|------------------|-----------------------------------|------------|
| **clientes** | `id`               | `INT AUTO_INCREMENT`               | **PK** |
| | `nombre`          | `VARCHAR(100)`                     | |
| | `email`           | `VARCHAR(150)`                     | Único |
| | `contraseña`      | `VARCHAR(255)`                     | Hash de la contraseña |
| | `telefono`        | `VARCHAR(20)`                      | Opcional |
| | `fecha_registro`  | `DATETIME`                         | Valor por defecto `CURRENT_TIMESTAMP` |
| **habitaciones** | `id`               | `INT AUTO_INCREMENT`               | **PK** |
| | `numero`          | `VARCHAR(10)`                      | Número de habitación |
| | `tipo`            | `ENUM('simple','doble','suite')`   | |
| | `precio_base`     | `DECIMAL(10,2)`                    | Precio por noche |
| | `estado`          | `ENUM('libre','ocupada','mantenimiento')` | Estado actual |
| **reservas** | `id`               | `INT AUTO_INCREMENT`               | **PK** |
| | `habitacion_id`   | `INT`                              | **FK → habitaciones.id** |
| | `cliente_id`      | `INT`                              | **FK → clientes.id** |
| | `fecha_inicio`    | `DATE`                             | |
| | `fecha_fin`       | `DATE`                             | |
| | `monto_total`     | `DECIMAL(10,2)`                    | |
| | `creado_en`       | `TIMESTAMP`                        | Valor por defecto `CURRENT_TIMESTAMP` |

---

## 2️⃣ Relaciones

| Entidad origen | Cardinalidad | Entidad destino | Comentario |
|----------------|--------------|-----------------|------------|
| **clientes**   | 1            | N **reservas**  | Un cliente puede tener muchas reservas. |
| **habitaciones**| 1           | N **reservas**  | Una habitación puede estar reservada en distintas fechas. |

---

## 3️⃣ Diagrama ER (Mermaid)

```mermaid
erDiagram
    CLIENTES {
        INT id PK
        VARCHAR nombre
        VARCHAR email
        VARCHAR contraseña
        VARCHAR telefono
        DATETIME fecha_registro
    }
    HABITACIONES {
        INT id PK
        VARCHAR numero
        ENUM tipo
        DECIMAL precio_base
        ENUM estado
    }
    RESERVAS {
        INT id PK
        INT habitacion_id FK
        INT cliente_id FK
        DATE fecha_inicio
        DATE fecha_fin
        DECIMAL monto_total
        TIMESTAMP creado_en
    }

    CLIENTES ||--o{ RESERVAS : "hace"
    HABITACIONES ||--o{ RESERVAS : "alojada en"