const API = "https://web-production-f78f05.up.railway.app";

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
    const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!res.ok) return alert("Login incorrecto");

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.rol);

    location.href = data.rol === "admin"
        ? "pages/admin.html"
        : "pages/cliente.html";
}

// ---------- FETCH ----------
async function authFetch(url, options = {}) {
    return fetch(API + url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    });
}

// ---------- CLIENTE ----------
async function crearSolicitud(monto, motivo) {
    await authFetch("/api/solicitudes", {
        method: "POST",
        body: JSON.stringify({ monto, motivo })
    });
}

async function obtenerMisSolicitudes() {
    const r = await authFetch("/api/solicitudes");
    return r.json();
}

// ---------- ADMIN ----------
async function obtenerTodasLasSolicitudes() {
    const r = await authFetch("/api/solicitudes");
    return r.json();
}

async function actualizarEstadoSolicitud(id, estado) {
    await authFetch(`/api/solicitudes/${id}`, {
        method: "PUT",
        body: JSON.stringify({ estado })
    });
}

async function crearUsuario(username, password, nombre, rol) {
    await authFetch("/api/admin/usuarios", {
        method: "POST",
        body: JSON.stringify({ username, password, nombre, rol })
    });
}

function descargarPDF() {
    window.open(`${API}/api/reportes/pdf`);
}
