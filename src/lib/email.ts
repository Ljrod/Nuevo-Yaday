import nodemailer from 'nodemailer';

interface EmailBookingData {
    nombre: string;
    email: string;
    telefono: string;
    servicio: string;
    fecha: string;
    hora: string;
    mensaje?: string;
}

// Configuración del transportador de email
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

/**
 * Genera un archivo iCalendar (.ics) para agregar al calendario
 */
function generateICalendar(bookingData: EmailBookingData): string {
    const { nombre, servicio, fecha, hora } = bookingData;

    // Parsear fecha y hora
    const [year, month, day] = fecha.split('-').map(Number);
    const [hours, minutes] = hora.split(':').map(Number);

    // Crear fecha de inicio
    const startDate = new Date(year, month - 1, day, hours, minutes);

    // Duración: 1.5 horas
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    endDate.setMinutes(endDate.getMinutes() + 30);

    // Formatear fechas para iCalendar (formato: YYYYMMDDTHHmmss)
    const formatICalDate = (date: Date) => {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
    };

    const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//YaDay Nail Designer//ES',
        'CALSCALE:GREGORIAN',
        'METHOD:REQUEST',
        'BEGIN:VEVENT',
        `DTSTART:${formatICalDate(startDate)}`,
        `DTEND:${formatICalDate(endDate)}`,
        `DTSTAMP:${formatICalDate(new Date())}`,
        `SUMMARY:💅 ${servicio} - YaDay Nail Designer`,
        `DESCRIPTION:Cita para ${servicio}\\nCliente: ${nombre}`,
        'LOCATION:YaDay Nail Designer',
        'STATUS:CONFIRMED',
        'SEQUENCE:0',
        'BEGIN:VALARM',
        'TRIGGER:-PT1H',
        'DESCRIPTION:Recordatorio de cita',
        'ACTION:DISPLAY',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    return icsContent;
}

/**
 * Envía un email de notificación cuando se crea una nueva reserva
 */
export async function sendBookingEmail(bookingData: EmailBookingData): Promise<void> {
    const { nombre, email, telefono, servicio, fecha, hora, mensaje } = bookingData;

    // Generar archivo iCalendar
    const icsContent = generateICalendar(bookingData);

    // Email para la empresaria (tú recibes la notificación)
    const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #991142 0%, #FF92C6 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                }
                .booking-details {
                    background-color: #FFE0E9;
                    border-left: 4px solid #991142;
                    padding: 20px;
                    margin: 20px 0;
                    border-radius: 8px;
                }
                .detail-row {
                    margin: 12px 0;
                    display: flex;
                    align-items: flex-start;
                }
                .detail-label {
                    font-weight: bold;
                    color: #991142;
                    min-width: 120px;
                }
                .detail-value {
                    color: #333;
                }
                .footer {
                    background-color: #f5f5f5;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
                .emoji {
                    font-size: 24px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <span class="emoji">✨</span>
                    <h1>Nueva Reserva - YaDay Nail Designer</h1>
                </div>
                <div class="content">
                    <p>¡Hola! Has recibido una nueva solicitud de cita:</p>
                    
                    <div class="booking-details">
                        <div class="detail-row">
                            <span class="detail-label">👤 Cliente:</span>
                            <span class="detail-value">${nombre}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">📧 Email:</span>
                            <span class="detail-value">${email}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">📱 Teléfono:</span>
                            <span class="detail-value">${telefono}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">💅 Servicio:</span>
                            <span class="detail-value"><strong>${servicio}</strong></span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">📅 Fecha:</span>
                            <span class="detail-value">${fecha}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">🕒 Hora:</span>
                            <span class="detail-value">${hora}</span>
                        </div>
                        ${mensaje ? `
                        <div class="detail-row">
                            <span class="detail-label">💬 Mensaje:</span>
                            <span class="detail-value">${mensaje}</span>
                        </div>
                        ` : ''}
                    </div>

                    <p style="color: #666; font-size: 14px;">
                        💡 <strong>Próximos pasos:</strong> Contacta a ${nombre} para confirmar la cita.
                    </p>
                </div>
                <div class="footer">
                    <p>Este email fue generado automáticamente por tu sistema de reservas.</p>
                    <p>YaDay Nail Designer © ${new Date().getFullYear()}</p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Email para la clienta (confirmación)
    const clientEmailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background: linear-gradient(135deg, #991142 0%, #FF92C6 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 30px;
                }
                .booking-summary {
                    background-color: #FFE0E9;
                    border-radius: 8px;
                    padding: 20px;
                    margin: 20px 0;
                }
                .summary-item {
                    margin: 12px 0;
                    padding: 10px;
                    background-color: white;
                    border-radius: 6px;
                }
                .footer {
                    background-color: #f5f5f5;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>✨ ¡Solicitud Recibida!</h1>
                </div>
                <div class="content">
                    <p>Hola <strong>${nombre}</strong>,</p>
                    
                    <p>Hemos recibido tu solicitud de cita. Aquí están los detalles:</p>
                    
                    <div class="booking-summary">
                        <div class="summary-item">
                            <strong>💅 Servicio:</strong> ${servicio}
                        </div>
                        <div class="summary-item">
                            <strong>📅 Fecha:</strong> ${fecha}
                        </div>
                        <div class="summary-item">
                            <strong>🕒 Hora:</strong> ${hora}
                        </div>
                    </div>

                    <p style="background-color: #FFF3E0; padding: 15px; border-radius: 8px; border-left: 4px solid #FF9800;">
                        <strong>⏳ Pendiente de confirmación</strong><br>
                        Te contactaremos pronto para confirmar tu cita. ¡Gracias por tu preferencia!
                    </p>

                    <div style="text-align: center; margin-top: 30px;">
                        <p style="margin-bottom: 15px; font-weight: bold; color: #991142;">
                            📅 Agrega esta cita a tu calendario
                        </p>
                        <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                            Haz clic en el archivo adjunto <strong>"cita-yaday-${fecha}.ics"</strong> para agregar esta cita a tu calendario de Google, Outlook o Apple.
                        </p>
                    </div>

                    <p style="text-align: center; margin-top: 30px; color: #666;">
                        ¿Tienes preguntas? No dudes en contactarnos.
                    </p>
                </div>
                <div class="footer">
                    <p><strong>YaDay Nail Designer</strong></p>
                    <p>Tu belleza, nuestra pasión ✨</p>
                </div>
            </div>
        </body>
        </html>
    `;

    try {
        // Enviar email al administrador (empresaria) con archivo .ics adjunto
        await transporter.sendMail({
            from: `"YaDay Nail Designer" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO, // Email de la empresaria
            subject: `✨ Nueva Reserva: ${servicio} - ${fecha} ${hora}`,
            html: adminEmailHtml,
            attachments: [
                {
                    filename: `cita-${nombre.replace(/\s+/g, '-')}-${fecha}.ics`,
                    content: icsContent,
                    contentType: 'text/calendar; charset=utf-8; method=REQUEST',
                },
            ],
        });

        // Enviar email de confirmación a la clienta con archivo .ics adjunto
        await transporter.sendMail({
            from: `"YaDay Nail Designer" <${process.env.EMAIL_FROM}>`,
            to: email, // Email de la clienta
            subject: `✨ Solicitud de Cita Recibida - YaDay Nail Designer`,
            html: clientEmailHtml,
            attachments: [
                {
                    filename: `cita-yaday-${fecha}.ics`,
                    content: icsContent,
                    contentType: 'text/calendar; charset=utf-8; method=REQUEST',
                },
            ],
        });

        console.log('✅ Emails enviados exitosamente');
    } catch (error) {
        console.error('❌ Error al enviar emails:', error);
        throw error;
    }
}
