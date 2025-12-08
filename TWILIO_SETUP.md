# Configuración de Twilio WhatsApp - Guía Paso a Paso

Esta guía te ayudará a configurar notificaciones de WhatsApp usando Twilio para recibir alertas automáticas cuando un cliente agenda una cita.

---

## 📱 Paso 1: Crear Cuenta de Twilio

1. Ve a: https://www.twilio.com/try-twilio
2. Click en **"Sign up"** (Registrarse)
3. Completa el formulario:
   - Email
   - Contraseña
   - Nombre
4. **Verifica tu email**
5. **Verifica tu número de teléfono**: +34 722 22 43 79

> [!NOTE]
> Recibirás **$15 USD de crédito gratuito** (suficiente para 500-1000 mensajes)

---

## 📋 Paso 2: Activar WhatsApp Sandbox

1. En Twilio Console, ve a: **Messaging** → **Try it out** → **Send a WhatsApp message**
2. O accede directamente: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
3. Verás un mensaje que dice **"Join your sandbox"**
4. **Desde tu WhatsApp personal** (+34 722 22 43 79):
   - Envía un mensaje al número que te indica Twilio
   - El mensaje será algo como: `join <código>` 
   - Ejemplo: `join yellow-tiger`
5. Recibirás confirmación de que estás conectado al sandbox

---

## 🔑 Paso 3: Obtener Credenciales

### Account SID y Auth Token:

1. En Twilio Console, ve a: https://console.twilio.com
2. En el **Dashboard**, encontrarás:
   - **Account SID**: Algo como `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **Auth Token**: Click en "Show" para revelarlo

### Número de WhatsApp:

1. Ve a: **Messaging** → **Try it out** → **Send a WhatsApp message**
2. Encuentra **"Sandbox Phone Number"**
3. Será algo como: `+1 415 523 8886`

---

## ⚙️ Paso 4: Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona proyecto **"yaday"**
3. Ve a **Settings** → **Environment Variables**
4. Agrega las siguientes variables (una por una):

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `TWILIO_ACCOUNT_SID` | Tu Account SID | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_AUTH_TOKEN` | Tu Auth Token | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TWILIO_WHATSAPP_FROM` | Número de Twilio | `whatsapp:+14155238886` |
| `TWILIO_WHATSAPP_TO` | Tu número verificado | `whatsapp:+34722224379` |

> [!IMPORTANT]
> - Los números DEBEN incluir el prefijo `whatsapp:`
> - Los números DEBEN estar en formato internacional: `+34722224379`
> - NO uses espacios ni guiones en los números

---

## 🚀 Paso 5: Redesplegar

```bash
git add .
git commit -m "Add Twilio WhatsApp notifications"
git push
```

Vercel desplegará automáticamente con las nuevas variables de entorno.

---

## ✅ Paso 6: Probar

1. Ve a tu sitio web desplegado
2. Llena el formulario de reservas
3. Envía la reserva
4. **Deberías recibir un WhatsApp instantáneamente** con:
   ```
   🎉 Nueva Reserva YaDay!
   
   👤 Nombre: María García
   📧 Email: maria@gmail.com
   📞 Teléfono: +34 611 22 33 44
   💅 Servicio: Manicura Gel
   📅 Fecha: 2025-12-15
   🕐 Hora: 10:00 AM
   ```

---

## 🔧 Verificar Configuración

### Ver logs en Vercel:

1. Vercel Dashboard → tu proyecto → **Deployments**
2. Click en el último deployment
3. Ve a **Functions** → Click en `/api/bookings` → **Logs**
4. Busca mensajes como:
   - `WhatsApp notification sent successfully` ✅
   - O errores de Twilio ❌

### Ver mensajes enviados en Twilio:

1. Twilio Console: https://console.twilio.com/us1/monitor/logs/sms
2. Verás todos los mensajes enviados

---

## ❓ Troubleshooting

### Error: "The from phone number is not a valid, message-capable Twilio phone number"

**Solución**: Verifica que `TWILIO_WHATSAPP_FROM` tenga formato correcto:
- ✅ Correcto: `whatsapp:+14155238886`
- ❌ Incorrecto: `+14155238886` (falta prefijo)

### No llegan mensajes:

1. **Verifica sandbox**: Asegúrate de haber enviado el mensaje `join` desde tu WhatsApp
2. **Verifica número**: Tu número debe estar verificado en Twilio
3. **Verifica variables**: Revisa que todas las variables estén en Vercel

### Cliente reporta error al reservar:

- ✅ **Normal**: La reserva se guarda AUNQUE falle WhatsApp
- El sistema NO bloquea reservas si Twilio falla
- Verifica logs para ver el error específico

---

## 💰 Costos

### Plan Gratuito:
- ✅ $15 USD de crédito inicial
- ✅ ~0.005 USD por mensaje WhatsApp
- ✅ Aproximadamente 3000 mensajes gratis

### Después del crédito:
- Puedes agregar crédito cuando lo necesites
- Twilio te avisará cuando se agote

---

## 🎯 Próximos Pasos (Opcional)

1. **Número dedicado**: Solicitar número de WhatsApp Business (sin sandbox)
2. **Templates aprobados**: Crear plantillas de mensajes aprobadas por WhatsApp
3. **Respuestas automáticas**: Configurar respuestas para clientes

---

## 📞 Soporte

- Twilio Docs: https://www.twilio.com/docs/whatsapp
- Twilio Support: https://support.twilio.com

¡Listo! Ahora recibirás notificación instantánea de cada reserva. 🎉
