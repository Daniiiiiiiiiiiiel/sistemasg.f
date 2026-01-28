// ========================================
// CONFIGURACIÓN GLOBAL
// ========================================

const API_CONFIG = {
    // ⚠️ ESTA ES LA ÚNICA URL QUE IMPORTA
    baseURL: "https://web-production-f1ddf.up.railway.app/api"
};

// ========================================
// UTILIDADES DE RUTA
// ========================================

function getBasePath() {
    return window.location.pathname.includes("/pages/") ? "../" : "";
}

// ========================================
// AUTENTICACIÓN
// ========================================

function checkAuth(requiredRole = null) {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    const basePath = getBasePath();

    if (!token) {
        window.location.href = basePath + "index.html";
        return;
    }

    if (requiredRole && rol !== requiredRole) {
        window.location.href =
            rol === "admin"
                ? basePath + "pages/admin.html"
                : basePath + "pages/cliente.html";
    }
}

function logout() {
    localStorage.clear();
    window.location.href = getBasePath() + "index.html";
}

// ========================================
// FETCH CON TOKEN
// ========================================

async function fetchWithAuth(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        window.location.href = getBasePath() + "index.html";
        throw new Error("Sesión expirada");
    }

    return response;
}

// ========================================
// LOGIN
// ========================================

async function login(username, password) {
    const res = await fetch(`${API_CONFIG.baseURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
        alert("Usuario o contraseña incorrectos");
        return;
    }

    const data = await res.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.rol);
    localStorage.setItem("nombre", data.nombre);

    window.location.href =
        data.rol === "admin"
            ? "pages/admin.html"
            : "pages/cliente.html";
}

// ========================================
// SOLICITUDES (CLIENTE)
// ========================================

async function crearSolicitud(monto, motivo, fecha) {
    await fetchWithAuth("/solicitudes", {
        method: "POST",
        body: JSON.stringify({ monto, motivo, fecha })
    });

    alert("Solicitud enviada correctamente");
}

async function obtenerMisSolicitudes() {
    const res = await fetchWithAuth("/solicitudes");
    return await res.json();
}

// ========================================
// ADMIN
// ========================================

async function obtenerTodasLasSolicitudes() {
    const res = await fetchWithAuth("/solicitudes");
    return await res.json();
}

async function actualizarEstadoSolicitud(id, estado) {
    await fetchWithAuth(`/solicitudes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ estado })
    });
}

async function crearUsuario(username, password, nombre, rol) {
    await fetchWithAuth("/admin/usuarios", {
        method: "POST",
        body: JSON.stringify({ username, password, nombre, rol })
    });

    alert("Usuario creado correctamente");
}

function descargarPDF() {
    window.open(`${API_CONFIG.baseURL}/reportes/pdf`, "_blank");
}

// ========================================
// FORMATO
// ========================================

function formatMoney(amount) {
    return new Intl.NumberFormat("es-CR", {
        style: "currency",
        currency: "CRC"
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat("es-CR").format(new Date(date));
}

// ========================================
// PWA
// ========================================

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    console.log("PWA lista para instalar");
});

// ========================================
// INIT
// ========================================

console.log("✅ App conectada a:", API_CONFIG.baseURL);
