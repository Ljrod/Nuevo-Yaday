# 💅 YaDay Nail Designer - Landing Page

> Una landing page de lujo para un estudio de diseño de uñas premium, construida con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Inicio Rápido

```bash
# Instalar dependencias (si aún no está hecho)
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🎨 Características

- ✨ **Diseño Premium** con paleta de colores de marca personalizada
- 🎭 **Animaciones Fluidas** con Framer Motion
- 📱 **Totalmente Responsive** - Mobile-first design
- 🎪 **Carrusel Interactivo** de servicios con Swiper.js
- 🔄 **Tarjetas con Flip 3D** para mostrar servicios
- 📅 **Formulario de Citas** completo con validación
- 🎯 **Navegación Smooth Scroll** entre secciones
- 🌐 **SEO Optimizado** con metadata apropiado

## 📋 Secciones

1. **Hero** - Título impactante "Arte en tus Manos"
2. **Servicios** - Carrusel con 5 servicios exclusivos
3. **Nosotros** - Filosofía y valores del estudio
4. **Agenda tu Cita** - Formulario completo de reservas
5. **Footer** - Contacto y redes sociales

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Animaciones:** Framer Motion
- **Carrusel:** Swiper.js
- **Calendario:** react-day-picker

## 📁 Estructura del Proyecto

```
src/
├── app/              # Pages y layouts de Next.js
├── components/       # Componentes React
│   ├── ui/          # Componentes shadcn/ui
│   └── ...          # Componentes de secciones
└── lib/             # Utilidades y datos
public/
└── images/          # Imágenes (agregar manualmente)
```

## 🖼️ Agregar Imágenes

Las imágenes deben agregarse manualmente en `public/images/`. Consulta la guía completa en:

📄 [public/images/README.md](./public/images/README.md)

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm start        # Servidor de producción
npm run lint     # Linting del código
```

## 🎨 Paleta de Colores

- **Primary:** `#7f0030` (Guinda/Magenta)
- **Accent:** `#ff93c7` (Rosado Vibrante)
- **Background:** `#ffecf1` (Rosado Pálido)

## 🔧 Personalización

### Modificar Servicios
Edita `src/lib/services.ts` para cambiar los servicios ofrecidos.

### Cambiar Información de Contacto
Actualiza `src/components/Footer.tsx` con tu información real.

### Ajustar Horarios
Modifica el array `availableTimes` en `src/lib/services.ts`.

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instala Vercel CLI
npm i -g vercel

# Despliega
vercel
```

### Otras plataformas

Este proyecto es compatible con cualquier plataforma que soporte Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📄 Licencia

Este proyecto fue creado para YaDay Nail Designer.

## 💬 Soporte

Para preguntas o soporte, contacta a través de los canales de comunicación del proyecto.

---

**Hecho con ❤️ para YaDay Nail Designer**
