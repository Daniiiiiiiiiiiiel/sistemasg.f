# Sistema de Adelantos - PWA Frontend

[![PWA](https://img.shields.io/badge/PWA-Enabled-blue)](https://web.dev/progressive-web-apps/)
[![Made with HTML/CSS/JS](https://img.shields.io/badge/Made%20with-HTML%2FCSS%2FJS-orange)](/)

Sistema empresarial interno para gestión de adelantos de nómina. Aplicación web progresiva (PWA) instalable en Android, iPhone y computadora.

## 🚀 Características

- ✅ **PWA Completa**: Instalable en cualquier dispositivo
- 📱 **Responsive**: Diseño mobile-first
- 🔐 **Seguro**: Autenticación JWT
- 🌐 **Offline**: Funciona sin conexión (Service Worker)
- 🎨 **Moderno**: Diseño tipo tarjetas con animaciones
- ⚡ **Sin dependencias**: HTML, CSS y JavaScript puro

## 📁 Estructura de Archivos

```
sistemaSG/
├── index.html           # Página de login
├── cliente.html         # Panel de empleado
├── admin.html          # Panel de administrador
├── styles.css          # Estilos globales
├── app.js              # Lógica de la aplicación
├── manifest.json       # Configuración PWA
├── service-worker.js   # Service Worker para offline
├── icon-192.png        # Icono 192x192
├── icon-512.png        # Icono 512x512
└── README.md           # Este archivo
```

## 🔧 Configuración

### 1. Configurar URL del Backend

Edita el archivo `app.js` y actualiza la URL de tu API:

```javascript
const API_CONFIG = {
  baseURL: 'https://tu-api.com'  // ← Cambia esto
};
```

### 2. Endpoints del Backend

Tu backend debe implementar los siguientes endpoints:

#### Autenticación
```
POST /login
Body: { "username": "string", "password": "string" }
Response: { "token": "JWT", "rol": "cliente" | "admin" }
```

#### Solicitudes (Cliente)
```
POST /solicitudes
Headers: Authorization: Bearer {token}
Body: { "monto": number, "fecha": "YYYY-MM-DD", "motivo": "string" }

GET /solicitudes
Headers: Authorization: Bearer {token}
Response: Array de solicitudes del empleado
```

#### Solicitudes (Admin)
```
GET /solicitudes
Headers: Authorization: Bearer {token}
Response: Array de TODAS las solicitudes

PUT /solicitudes/{id}
Headers: Authorization: Bearer {token}
Body: { "estado": "aprobado" | "pagado" }
```

#### Reportes
```
GET /reportes/pdf
Headers: Authorization: Bearer {token}
Response: PDF file (application/pdf)
```

## 📦 Despliegue en Vercel

### Opción 1: Desde la CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Ir al directorio del proyecto
cd c:\Users\danir\OneDrive\Desktop\sistemaSG

# Desplegar
vercel
```

### Opción 2: Desde GitHub

1. Sube el código a un repositorio de GitHub
2. Conecta el repositorio en [vercel.com](https://vercel.com)
3. Configura el proyecto:
   - **Framework Preset**: Other
   - **Build Command**: (dejar vacío)
   - **Output Directory**: (dejar vacío o `.`)
4. Deploy

### Configuración de Vercel

Crea un archivo `vercel.json` (opcional):

```json
{
  "version": 2,
  "routes": [
    { "src": "/(.*)", "dest": "/$1" }
  ],
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

## 🎯 Uso de la Aplicación

### Login
1. Ingresa usuario y contraseña
2. El sistema redirige según el rol

### Panel Empleado
- Ver nombre de usuario
- Crear nuevas solicitudes de adelanto
- Ver historial de solicitudes propias
- Ver estado de cada solicitud

### Panel Administrador
- Ver TODAS las solicitudes
- Aprobar solicitudes pendientes
- Marcar solicitudes como pagadas
- Generar reportes en PDF

## 🔐 Seguridad

- **Token JWT**: Autenticación mediante token Bearer
- **Verificación de rutas**: Protección automática de páginas
- **Redirección inteligente**: Si no hay token → login
- **Validación de roles**: Cliente no puede acceder a admin

## 🎨 Personalización

### Colores

Edita las variables CSS en `styles.css`:

```css
:root {
  --primary: #1a2980;
  --primary-light: #26d0ce;
  --secondary: #6366f1;
  /* ... más colores */
}
```

### Logo

Reemplaza los archivos:
- `icon-192.png`
- `icon-512.png`

## 📱 Instalación como PWA

### Android
1. Abre la app en Chrome
2. Toca el menú (⋮)
3. Selecciona "Instalar aplicación"

### iPhone
1. Abre la app en Safari
2. Toca el botón compartir
3. Selecciona "Añadir a pantalla de inicio"

### Escritorio (Chrome/Edge)
1. Visita la app
2. Haz clic en el ícono de instalación en la barra de direcciones
3. Instalar

## 🐛 Solución de Problemas

### La app no se instala como PWA
- Verifica que esté servida por HTTPS
- Revisa que `manifest.json` sea válido
- Confirma que el service worker esté registrado

### Error al hacer login
- Verifica la URL del backend en `app.js`
- Revisa la consola del navegador (F12)
- Confirma que el backend esté funcionando

### Las solicitudes no se cargan
- Verifica que el token sea válido
- Revisa los headers de autenticación
- Confirma que el endpoint devuelva JSON

## 📄 Licencia

Uso interno empresarial

## 👨‍💻 Soporte

Para más información, consulta la documentación del backend o contacta al administrador del sistema.

---

**Hecho con ❤️ usando HTML, CSS y JavaScript puro**
