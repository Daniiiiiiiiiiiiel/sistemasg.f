// MOCK DATA STORAGE
const MOCK_SOLICITUDES = [
    { id: 1, monto: 500, motivo: "Emergencia médica", estado: "pendiente" },
    { id: 2, monto: 1200, motivo: "Reparación auto", estado: "aprobado" },
    { id: 3, monto: 300, motivo: "Compras super", estado: "rechazado" }
];

// SW REGISTRATION
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
        .then(() => console.log("Service Worker registrado"))
        .catch(err => console.error("Fallo registro SW:", err));
}

// ---------- AUTH ----------
function checkAuth(rolReq) {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");
    if (!token) location.href = "../index.html";
    if (rolReq && rol !== rolReq) location.href = "../index.html";
}

function logout() {
    localStorage.clear();
    location.href = "../index.html";
}

async function login(username, password) {
    // --- MOCK AUTH ---
    if (username === "admin" && password === "123") {
        localStorage.setItem("token", "mock-token-admin");
        localStorage.setItem("rol", "admin");
        location.href = "pages/admin.html";
        return;
    }
    if (username === "cliente" && password === "123") {
        localStorage.setItem("token", "mock-token-cliente");
        localStorage.setItem("rol", "cliente");
        location.href = "pages/cliente.html";
        return;
    }

    alert("Usuario o contraseña incorrectos (Intenta admin/123 o cliente/123)");
}

// ---------- CLIENTE (MOCK) ----------
async function crearSolicitud(monto, motivo) {
    console.log("Creando solicitud:", { monto, motivo });
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));

    MOCK_SOLICITUDES.unshift({
        id: Date.now(),
        monto: monto,
        motivo: motivo,
        estado: "pendiente"
    });

    alert("Solicitud creada con éxito (Simulación)");
}

async function obtenerMisSolicitudes() {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    return MOCK_SOLICITUDES;
}

// ---------- ADMIN (MOCK) ----------
async function obtenerTodasLasSolicitudes() {
    // Simulate network delay
    await new Promise(r => setTimeout(r, 500));
    return MOCK_SOLICITUDES;
}

async function actualizarEstadoSolicitud(id, estado) {
    console.log(`Actualizando solicitud ${id} a ${estado}`);
    await new Promise(r => setTimeout(r, 300));

    const solicitud = MOCK_SOLICITUDES.find(s => s.id === id);
    if (solicitud) solicitud.estado = estado;

    alert(`Estado actualizado a: ${estado} (Simulación)`);
    // Reload to show changes (in a real app we'd update state)
    location.reload();
}

async function crearUsuario(username, password, nombre, rol) {
    console.log("Creando usuario:", { username, password, nombre, rol });
    await new Promise(r => setTimeout(r, 500));
    alert("Usuario creado correctamente (Simulación)");
}

function descargarPDF() {
    alert("Descargando PDF simulado...");
}
