import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { sendBookingNotification } from '@/lib/twilio';
import { sendBookingEmail } from '@/lib/email';
import { createCalendarEvent, isGoogleCalendarConfigured } from '@/lib/google-calendar';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { nombre, email, telefono, servicio, fecha, hora, mensaje } = body;

        // Validación de campos requeridos
        if (!nombre || !email || !servicio || !fecha || !hora) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Email inválido' },
                { status: 400 }
            );
        }

        // Insertar en la base de datos
        const result = await sql`
            INSERT INTO bookings (nombre, email, telefono, servicio, fecha, hora, mensaje)
            VALUES (${nombre}, ${email}, ${telefono || null}, ${servicio}, ${fecha}, ${hora}, ${mensaje || null})
            RETURNING *
        `;

        const booking = result.rows[0];

        const bookingData = {
            nombre,
            email,
            telefono: telefono || 'No proporcionado',
            servicio,
            fecha,
            hora,
            mensaje: mensaje || '',
        };

        // Enviar notificación de WhatsApp (sin bloquear la respuesta)
        sendBookingNotification(bookingData).catch((error) => {
            console.error('❌ Error sending WhatsApp notification:', error);
        });

        // Enviar emails de notificación (sin bloquear la respuesta)
        sendBookingEmail(bookingData).catch((error) => {
            console.error('❌ Error sending email notification:', error);
        });

        // Crear evento en Google Calendar (sin bloquear la respuesta)
        if (isGoogleCalendarConfigured()) {
            createCalendarEvent(bookingData).catch((error) => {
                console.error('❌ Error creating Google Calendar event:', error);
            });
        } else {
            console.warn('⚠️ Google Calendar no está configurado. Saltando creación de evento.');
        }

        return NextResponse.json(
            {
                success: true,
                message: '¡Reserva creada exitosamente!',
                booking,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error al crear reserva:', error);
        return NextResponse.json(
            {
                error: 'Error al procesar la reserva',
                details: error instanceof Error ? error.message : 'Error desconocido',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        // Obtener todas las reservas ordenadas por fecha descendente
        const result = await sql`
            SELECT * FROM bookings
            ORDER BY created_at DESC
            LIMIT 100
        `;

        return NextResponse.json({
            success: true,
            bookings: result.rows,
            count: result.rowCount,
        });
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        return NextResponse.json(
            {
                error: 'Error al obtener las reservas',
                details: error instanceof Error ? error.message : 'Error desconocido',
            },
            { status: 500 }
        );
    }
}
