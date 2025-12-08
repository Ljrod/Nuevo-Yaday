-- Script SQL para crear la tabla de reservas en Vercel Postgres
-- Ejecutar este script en el Query tab de Vercel Postgres Dashboard

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    servicio VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    hora VARCHAR(10) NOT NULL,
    mensaje TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento de búsquedas
CREATE INDEX IF NOT EXISTS idx_bookings_fecha ON bookings(fecha);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);

-- Comentarios para documentación
COMMENT ON TABLE bookings IS 'Tabla de reservas de citas para YaDay Nail Designer';
COMMENT ON COLUMN bookings.id IS 'ID único autoincremental';
COMMENT ON COLUMN bookings.nombre IS 'Nombre completo del cliente';
COMMENT ON COLUMN bookings.email IS 'Email del cliente';
COMMENT ON COLUMN bookings.telefono IS 'Teléfono de contacto';
COMMENT ON COLUMN bookings.servicio IS 'Servicio seleccionado';
COMMENT ON COLUMN bookings.fecha IS 'Fecha de la cita';
COMMENT ON COLUMN bookings.hora IS 'Hora de la cita';
COMMENT ON COLUMN bookings.mensaje IS 'Mensaje o notas adicionales';
COMMENT ON COLUMN bookings.created_at IS 'Fecha y hora de creación del registro';
