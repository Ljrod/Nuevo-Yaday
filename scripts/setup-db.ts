// Script para verificar y crear la tabla bookings si no existe
import { config } from 'dotenv';
import { resolve } from 'path';
import { sql } from '@vercel/postgres';

// Cargar variables de entorno desde .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function setupDatabase() {
    try {
        console.log('🔍 Verificando conexión a la base de datos...');

        // Crear tabla si no existe
        await sql`
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
        `;

        console.log('✅ Tabla bookings verificada/creada');

        // Crear índices si no existen
        await sql`CREATE INDEX IF NOT EXISTS idx_bookings_fecha ON bookings(fecha);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);`;
        await sql`CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);`;

        console.log('✅ Índices creados');

        // Verificar que la tabla existe y mostrar estructura
        const result = await sql`
            SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'bookings'
            ORDER BY ordinal_position;
        `;

        console.log('\n📋 Estructura de la tabla bookings:');
        console.table(result.rows);

        // Contar registros existentes
        const count = await sql`SELECT COUNT(*) as total FROM bookings;`;
        console.log(`\n📊 Registros existentes: ${count.rows[0].total}`);

        console.log('\n✅ Base de datos configurada correctamente');

    } catch (error) {
        console.error('❌ Error al configurar la base de datos:', error);
        process.exit(1);
    }
}

setupDatabase();
