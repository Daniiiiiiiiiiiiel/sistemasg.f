// ========================================
// ADMIN PANEL UI - DASHBOARD STATS
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // Solo ejecutar en panel admin
    if (!document.getElementById('adminTotalSolicitudes')) return;

    // Función para actualizar estadísticas del admin
    // Función para actualizar estadísticas del admin
    async function updateAdminStats() {
        try {
            // Nota: El backend debería tener un endpoint específico para stats de admin
            // o devolver todas las solicitudes si eres admin.
            const response = await fetchWithAuth('/solicitudes');

            if (response.ok) {
                const allSolicitudes = await response.json();

                // Calcular estadísticas
                const total = allSolicitudes.length;
                const pendientes = allSolicitudes.filter(s => s.estado === 'pendiente').length;
                const aprobadas = allSolicitudes.filter(s => s.estado === 'aprobado').length;
                const pagadas = allSolicitudes.filter(s => s.estado === 'pagado').length;

                // Actualizar UI
                const totalEl = document.getElementById('adminTotalSolicitudes');
                const pendientesEl = document.getElementById('adminPendientes');
                const aprobadasEl = document.getElementById('adminAprobadas');
                const pagadasEl = document.getElementById('adminPagadas');

                if (totalEl) totalEl.textContent = total;
                if (pendientesEl) pendientesEl.textContent = pendientes;
                if (aprobadasEl) aprobadasEl.textContent = aprobadas;
                if (pagadasEl) pagadasEl.textContent = pagadas;
            }
        } catch (error) {
            console.error('Error al cargar estadísticas de admin:', error);
        }
    }

    // Actualizar stats al cargar
    updateAdminStats();

    // Actualizar periódicamente
    setInterval(updateAdminStats, 30000);

    console.log('📊 Admin dashboard stats loaded');
});
