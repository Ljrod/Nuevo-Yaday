import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const fecha = searchParams.get('fecha');

        if (!fecha) {
            return NextResponse.json(
                { error: 'Parámetro "fecha" es requerido (formato: YYYY-MM-DD)' },
                { status: 400 }
            );
        }

        // Validar formato de fecha
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(fecha)) {
            return NextResponse.json(
                { error: 'Formato de fecha inválido. Use YYYY-MM-DD' },
                { status: 400 }
            );
        }

        // Consultar horas ocupadas para la fecha específica
        const result = await sql`
            SELECT hora 
            FROM bookings 
            WHERE fecha = ${fecha}
            ORDER BY hora
        `;

        const horasOcupadas = result.rows.map(row => row.hora);

        return NextResponse.json({
            fecha,
            horasOcupadas,
            total: horasOcupadas.length,
        });
    } catch (error) {
        console.error('Error al consultar disponibilidad:', error);
        return NextResponse.json(
            {
                error: 'Error al consultar disponibilidad',
                details: error instanceof Error ? error.message : 'Error desconocido',
            },
            { status: 500 }
        );
    }
}
