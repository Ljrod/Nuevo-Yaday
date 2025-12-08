import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM; // e.g., 'whatsapp:+14155238886'
const whatsappTo = process.env.TWILIO_WHATSAPP_TO; // e.g., 'whatsapp:+34722224379'

let client: ReturnType<typeof twilio> | null = null;

// Only initialize if all credentials are present
if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
}

interface BookingData {
    nombre: string;
    email: string;
    telefono: string;
    servicio: string;
    fecha: string;
    hora: string;
    mensaje?: string;
}

export async function sendBookingNotification(booking: BookingData): Promise<boolean> {
    // Skip if Twilio is not configured
    if (!client || !whatsappFrom || !whatsappTo) {
        console.log('Twilio WhatsApp not configured, skipping notification');
        return false;
    }

    try {
        const message = `
🎉 *Nueva Reserva YaDay!*

👤 *Nombre:* ${booking.nombre}
📧 *Email:* ${booking.email}
📞 *Teléfono:* ${booking.telefono}
💅 *Servicio:* ${booking.servicio}
📅 *Fecha:* ${booking.fecha}
🕐 *Hora:* ${booking.hora}
${booking.mensaje ? `\n💬 *Mensaje:* ${booking.mensaje}` : ''}

---
_Notificación automática de YaDay Nail Designer_
`.trim();

        await client.messages.create({
            from: whatsappFrom,
            to: whatsappTo,
            body: message,
        });

        console.log('WhatsApp notification sent successfully');
        return true;
    } catch (error) {
        console.error('Error sending WhatsApp notification:', error);
        return false;
    }
}
