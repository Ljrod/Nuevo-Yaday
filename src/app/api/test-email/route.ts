import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

/**
 * Endpoint de diagnóstico para verificar la configuración de email
 * GET /api/test-email
 * 
 * Este endpoint verifica que las variables de entorno estén configuradas
 * y opcionalmente envía un email de prueba.
 */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const sendTest = url.searchParams.get('send') === 'true';

    // Verificar variables de entorno
    const config = {
        EMAIL_HOST: process.env.EMAIL_HOST || '❌ NO CONFIGURADO',
        EMAIL_PORT: process.env.EMAIL_PORT || '❌ NO CONFIGURADO',
        EMAIL_USER: process.env.EMAIL_USER || '❌ NO CONFIGURADO',
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? '✅ Configurado (oculto)' : '❌ NO CONFIGURADO',
        EMAIL_FROM: process.env.EMAIL_FROM || '❌ NO CONFIGURADO',
        EMAIL_TO: process.env.EMAIL_TO || '❌ NO CONFIGURADO',
    };

    const allConfigured =
        process.env.EMAIL_HOST &&
        process.env.EMAIL_PORT &&
        process.env.EMAIL_USER &&
        process.env.EMAIL_PASSWORD &&
        process.env.EMAIL_FROM &&
        process.env.EMAIL_TO;

    // Si no se solicita enviar email de prueba, solo mostrar configuración
    if (!sendTest) {
        return NextResponse.json({
            status: allConfigured ? '✅ Variables de entorno configuradas' : '❌ Faltan variables de entorno',
            config,
            instructions: 'Para enviar un email de prueba, agrega ?send=true a la URL',
            testUrl: '/api/test-email?send=true',
        });
    }

    // Intentar enviar email de prueba
    if (!allConfigured) {
        return NextResponse.json({
            status: '❌ No se puede enviar email de prueba',
            error: 'Faltan variables de entorno',
            config,
        }, { status: 400 });
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Verificar conexión SMTP
        await transporter.verify();

        // Enviar email de prueba
        const info = await transporter.sendMail({
            from: `"YaDay Test" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            subject: `🧪 Email de Prueba - ${new Date().toLocaleString('es-ES')}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: 0 auto;">
                    <h1 style="color: #991142;">✅ Email de Prueba Exitoso</h1>
                    <p>Este es un email de prueba enviado desde la API de YaDay Nail Designer.</p>
                    <p><strong>Fecha y hora:</strong> ${new Date().toLocaleString('es-ES')}</p>
                    <p style="color: #666;">Si recibes este email, la configuración está funcionando correctamente.</p>
                </div>
            `,
        });

        return NextResponse.json({
            status: '✅ Email de prueba enviado exitosamente',
            messageId: info.messageId,
            to: process.env.EMAIL_TO,
            config,
        });

    } catch (error) {
        console.error('❌ Error en test de email:', error);
        return NextResponse.json({
            status: '❌ Error al enviar email',
            error: error instanceof Error ? error.message : 'Error desconocido',
            errorDetails: error instanceof Error ? error.stack : undefined,
            config,
        }, { status: 500 });
    }
}
