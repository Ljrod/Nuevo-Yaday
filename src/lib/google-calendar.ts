import { google } from 'googleapis';

interface CalendarEventData {
    nombre: string;
    email: string;
    telefono: string;
    servicio: string;
    fecha: string; // formato: YYYY-MM-DD
    hora: string;  // formato: HH:MM
    mensaje?: string;
}

/**
 * Crea un evento en Google Calendar para una nueva reserva
 */
export async function createCalendarEvent(eventData: CalendarEventData): Promise<void> {
    const { nombre, email, telefono, servicio, fecha, hora, mensaje } = eventData;

    try {
        // Configurar autenticación con cuenta de servicio
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });

        const calendar = google.calendar({ version: 'v3', auth });

        // Parsear fecha y hora
        const [year, month, day] = fecha.split('-').map(Number);
        const [hours, minutes] = hora.split(':').map(Number);

        // Crear fecha de inicio (fecha + hora)
        const startDateTime = new Date(year, month - 1, day, hours, minutes);

        // Duración estimada: 1.5 horas (ajusta según tus necesidades)
        const endDateTime = new Date(startDateTime);
        endDateTime.setHours(endDateTime.getHours() + 1);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30);

        // Crear descripción del evento
        const description = `
📱 Cliente: ${nombre}
📧 Email: ${email}
☎️ Teléfono: ${telefono}
${mensaje ? `\n💬 Mensaje: ${mensaje}` : ''}

---
🔔 Recordatorio: Confirmar cita con la clienta
        `.trim();

        // Crear evento en Google Calendar
        const event = {
            summary: `💅 ${servicio} - ${nombre}`,
            description: description,
            start: {
                dateTime: startDateTime.toISOString(),
                timeZone: 'Europe/Madrid', // Ajusta según tu zona horaria
            },
            end: {
                dateTime: endDateTime.toISOString(),
                timeZone: 'Europe/Madrid',
            },
            attendees: [
                { email: email, displayName: nombre },
            ],
            reminders: {
                useDefault: false,
                overrides: [
                    { method: 'email', minutes: 24 * 60 }, // 1 día antes
                    { method: 'popup', minutes: 60 },      // 1 hora antes
                ],
            },
            colorId: '11', // Rojo (puedes cambiar: 1-11 para diferentes colores)
        };

        const response = await calendar.events.insert({
            calendarId: process.env.GOOGLE_CALENDAR_ID,
            requestBody: event,
            sendUpdates: 'all', // Envía notificación a los asistentes
        });

        console.log('✅ Evento creado en Google Calendar:', response.data.htmlLink);
    } catch (error) {
        console.error('❌ Error al crear evento en Google Calendar:', error);
        throw error;
    }
}

/**
 * Verifica que las credenciales de Google Calendar estén configuradas
 */
export function isGoogleCalendarConfigured(): boolean {
    return !!(
        process.env.GOOGLE_CALENDAR_ID &&
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
        process.env.GOOGLE_PRIVATE_KEY
    );
}
