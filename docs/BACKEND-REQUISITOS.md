# 🐍 Requisitos del Backend (Python)

Para que tu PWA funcione correctamente con la lógica que hemos preparado, tu backend en Python debe cumplir con las siguientes especificaciones:

## 🌐 Configuración del Servidor
- **URL Base:** `http://localhost:5000/api` (o la IP de tu servidor)
- **CORS:** Debe estar habilitado para permitir peticiones desde el origen de tu PWA.

## 🔐 Autenticación

### 1. Login
- **Endpoint:** `POST /api/login`
- **Recibe:**
  ```json
  {
    "username": "cliente",
    "password": "123"
  }
  ```
- **Responde (Éxito 200):**
  ```json
  {
    "token": "jwt_token_string",
    "rol": "cliente",  // o "admin"
    "nombre": "Juan Pérez"
  }
  ```
- **Responde (Error 401):**
  ```json
  { "message": "Usuario o contraseña incorrectos" }
  ```

---

## 📋 Solicitudes (Adelantos)

### 2. Obtener Solicitudes
- **Endpoint:** `GET /api/solicitudes`
- **Headers:** `Authorization: Bearer <token>`
- **Lógica:**
  - Si el usuario es **admin**, debe devolver **todas** las solicitudes.
  - Si el usuario es **empleado**, debería devolver solo **sus** solicitudes (aunque el frontend actual también tiene un filtro de seguridad).
- **Responde (Array JSON):**
  ```json
  [
    {
      "id": 1,
      "empleado_nombre": "Juan Pérez",
      "monto": 5000,
      "motivo": "Gastos médicos",
      "fecha": "2026-02-15",        // Fecha solicitada para el adelanto
      "fecha_creacion": "2026-01-20", // Fecha en que se creó la solicitud
      "estado": "pendiente"         // "pendiente", "aprobado", "rechazado", "pagado"
    }
  ]
  ```

### 3. Crear Nueva Solicitud
- **Endpoint:** `POST /api/solicitudes`
- **Headers:** `Authorization: Bearer <token>`
- **Recibe:**
  ```json
  {
    "monto": 2500,
    "fecha": "2026-02-28",
    "motivo": "Reparación de auto"
  }
  ```
- **Lógica:** El backend debe asignar el `id`, `fecha_creacion`, `estado: pendiente` y asociarlo al usuario del token.

### 4. Actualizar Estado (Aprobar/Rechazar/Pagar)
- **Endpoint:** `PUT /api/solicitudes/<id>`
- **Headers:** `Authorization: Bearer <token>`
- **Recibe:**
  ```json
  {
    "estado": "aprobado" // o "rechazado", "pagado"
  }
  ```

---

## 📄 Reportes (Admin)

### 5. Generar PDF
- **Endpoint:** `GET /api/reportes/pdf`
- **Headers:** `Authorization: Bearer <token>`
- **Responde:** Archivo binario con Content-Type `application/pdf`.

---

## 🗄️ Base de Datos Sugerida (Esquema simplificado)

### Tabla: Usuarios
- `id` (PK)
- `username` (Unique)
- `password` (Hash!)
- `nombre`
- `rol` ('admin', 'cliente')

### Tabla: Solicitudes
- `id` (PK)
- `usuario_id` (FK -> Usuarios.id)
- `monto` (Decimal/Float)
- `motivo` (Text)
- `fecha_solicitada` (Date)
- `fecha_creacion` (Date/Timestamp)
- `estado` (String: 'pendiente', 'aprobado', 'rechazado', 'pagado')
