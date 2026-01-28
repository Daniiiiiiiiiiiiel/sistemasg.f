// ========================================
// CONFIGURACIÓN DE LA API
// ========================================
const API_CONFIG = {
    // URL del Backend (Python)
    // Cambia esto a la IP de tu servidor si pruebas en móvil
    baseURL: 'http://localhost:5000/api'
};

// ========================================
// FUNCIONES DE AUTENTICACIÓN
// ========================================

/**
 * Verifica si el usuario está autenticado y tiene el rol correcto
 * @param {string} requiredRole - Rol requerido ('cliente' o 'admin')
 */
function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
}

/**
 * Verifica si el usuario está autenticado y tiene el rol correcto
 * @param {string} requiredRole - Rol requerido ('cliente' o 'admin')
 */
function checkAuth(requiredRole) {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('rol');
    const basePath = getBasePath();

    // Si no hay token, redirigir a login
    if (!token) {
        window.location.href = basePath + 'index.html';
        return;
    }

    // Si el rol no coincide, redirigir a la página correcta
    if (requiredRole && rol !== requiredRole) {
        if (rol === 'admin') {
            window.location.href = basePath + 'pages/admin.html';
        } else {
            window.location.href = basePath + 'pages/cliente.html';
        }
        return;
    }
}

/**
 * Cierra sesión del usuario
 */
function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('username');
        window.location.href = getBasePath() + 'index.html';
    }
}

// ========================================
// FUNCIONES DE API
// ========================================

/**
 * Realiza una petición fetch con el token de autenticación
 * @param {string} url - URL del endpoint
 * @param {object} options - Opciones de fetch
 * @returns {Promise<Response>}
 */
async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    // Combinar opciones
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };

    try {
        const response = await fetch(url, finalOptions);

        // Si el token expiró o es inválido, redirigir a login
        if (response.status === 401 || response.status === 403) {
            localStorage.clear();
            window.location.href = getBasePath() + 'index.html';
            throw new Error('Sesión expirada');
        }

        return response;

    } catch (error) {
        console.error('Error en petición:', error);
        throw error;
    }
}

// ========================================
// FUNCIONES DE UTILIDAD
// ========================================

/**
 * Formatea un número como moneda
 * @param {number} amount - Monto a formatear
 * @returns {string}
 */
function formatMoney(amount) {
    return new Intl.NumberFormat('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Formatea una fecha al formato local
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string}
 */
function formatDate(dateString) {
    if (!dateString) return '-';

    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Formatea una fecha y hora al formato local
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string}
 */
function formatDateTime(dateString) {
    if (!dateString) return '-';

    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

/**
 * Muestra un mensaje de confirmación
 * @param {string} message - Mensaje a mostrar
 * @returns {boolean}
 */
function confirm(message) {
    return window.confirm(message);
}

/**
 * Muestra un mensaje de alerta
 * @param {string} message - Mensaje a mostrar
 */
function alert(message) {
    window.alert(message);
}

/**
 * Valida que una fecha sea válida y no esté en el pasado
 * @param {string} dateString - Fecha a validar
 * @returns {boolean}
 */
function isValidFutureDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date >= today;
}

/**
 * Obtiene el mensaje de error apropiado para un código de estado HTTP
 * @param {number} status - Código de estado HTTP
 * @returns {string}
 */
function getErrorMessage(status) {
    const errorMessages = {
        400: 'Solicitud inválida',
        401: 'No autorizado',
        403: 'Acceso denegado',
        404: 'No encontrado',
        500: 'Error del servidor',
        503: 'Servicio no disponible'
    };

    return errorMessages[status] || 'Error desconocido';
}

// ========================================
// MANEJADORES DE EVENTOS GLOBALES
// ========================================

// Prevenir que la página se recargue si pierde conexión
window.addEventListener('online', () => {
    console.log('Conexión restaurada');
});

window.addEventListener('offline', () => {
    console.log('Sin conexión a internet');
});

// Detectar cuando la app se instala como PWA
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('PWA lista para instalar');
    // Puedes guardar el evento para mostrarlo más tarde
    window.deferredPrompt = e;
});

window.addEventListener('appinstalled', () => {
    console.log('PWA instalada exitosamente');
});

// ========================================
// INICIALIZACIÓN
// ========================================

// Verificar si estamos en la página de login
const isLoginPage = window.location.pathname.includes('index.html') ||
    window.location.pathname === '/';

// Si no es la página de login y no hay token, redirigir
if (!isLoginPage) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
}

// Logs de desarrollo (puedes comentar en producción)
console.log('🚀 Sistema de Adelantos inicializado');
console.log('📱 PWA:', 'serviceWorker' in navigator ? 'Soportado' : 'No soportado');
console.log('🌐 API:', API_CONFIG.baseURL);
