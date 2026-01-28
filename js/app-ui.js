// ========================================
// UI INTERACTIONS - NAVEGACIÓN Y FAB
// ========================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // NAVEGACIÓN INFERIOR
    // ========================================
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section[data-section]');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSection = this.getAttribute('data-nav');

            // Actualizar navegación activa
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // Mostrar sección correspondiente
            sections.forEach(section => {
                if (section.getAttribute('data-section') === targetSection) {
                    section.classList.remove('hidden');
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // ========================================
    // FAB (Floating Action Button)
    // ========================================
    const fab = document.getElementById('fabNewRequest');

    if (fab) {
        fab.addEventListener('click', function () {
            // Ir a la sección de inicio (formulario)
            const inicioNav = document.querySelector('.nav-item[data-nav="inicio"]');
            if (inicioNav) {
                inicioNav.click();
            }

            // Scroll al formulario después de mostrar la sección
            setTimeout(() => {
                const form = document.getElementById('solicitudForm');
                if (form) {
                    form.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Focus en el primer input
                    const firstInput = form.querySelector('input');
                    if (firstInput) {
                        setTimeout(() => firstInput.focus(), 300);
                    }
                }
            }, 300);
        });
    }

    // ========================================
    // ACTUALIZAR NOMBRE EN PERFIL Y BIENVENIDA
    // ========================================
    // ========================================
    // ACTUALIZAR PERFIL DE USUARIO
    // ========================================
    function updateProfileInfo() {
        const userName = localStorage.getItem('username') || '-';
        const userEmail = localStorage.getItem('email') || '-';
        const userDepto = localStorage.getItem('depto') || '-';
        const userPuesto = localStorage.getItem('puesto') || '-';
        const userFecha = localStorage.getItem('fechaIngreso') || '-';
        const userRol = localStorage.getItem('rol') || '-';

        // Header y Mensajes de Bienvenida
        const profileName = document.getElementById('profileName');
        const welcomeName = document.getElementById('welcomeName');

        if (profileName) profileName.textContent = userName;
        if (welcomeName) welcomeName.textContent = userName;

        // Sección de Perfil Completo
        const profileNameFull = document.getElementById('profileNameFull');
        const profileEmail = document.getElementById('profileEmail');
        const profileDepto = document.getElementById('profileDepto');
        const profilePuesto = document.getElementById('profilePuesto');
        const profileFecha = document.getElementById('profileFecha');
        const profileRol = document.getElementById('profileRol');

        if (profileNameFull) profileNameFull.textContent = userName;
        if (profileEmail) profileEmail.textContent = userEmail;
        if (profileDepto) profileDepto.textContent = userDepto;
        if (profilePuesto) profilePuesto.textContent = userPuesto;
        if (profileFecha) profileFecha.textContent = userFecha;
        if (profileRol) {
            profileRol.textContent = userRol.charAt(0).toUpperCase() + userRol.slice(1);
        }
    }

    // Ejecutar carga de perfil
    updateProfileInfo();

    // ========================================
    // ACTUALIZAR ESTADÍSTICAS DEL DASHBOARD
    // ========================================
    // ========================================
    // ACTUALIZAR ESTADÍSTICAS DEL DASHBOARD
    // ========================================
    async function updateDashboardStats() {
        try {
            const username = localStorage.getItem('username');
            const response = await fetchWithAuth('/solicitudes');

            if (response.ok) {
                const allSolicitudes = await response.json();

                // Filtrar solicitudes del usuario actual (si el backend no lo hace ya)
                // Nota: Idealmente el endpoint /solicitudes ya debería filtrar por usuario
                // pero lo mantenemos aquí por seguridad si el backend devuelve todo.
                const misSolicitudes = allSolicitudes.filter(s => s.empleado_nombre === username);

                // Calcular estadísticas
                const total = misSolicitudes.length;
                const pendientes = misSolicitudes.filter(s => s.estado === 'pendiente').length;
                const aprobadas = misSolicitudes.filter(s => s.estado === 'aprobado' || s.estado === 'pagado').length;

                // Actualizar UI
                const totalEl = document.getElementById('totalSolicitudes');
                const pendientesEl = document.getElementById('pendientesSolicitudes');
                const aprobadasEl = document.getElementById('aprobadasSolicitudes');
                const activityTotalEl = document.getElementById('activityTotal');

                if (totalEl) totalEl.textContent = total;
                if (pendientesEl) pendientesEl.textContent = pendientes;
                if (aprobadasEl) aprobadasEl.textContent = aprobadas;
                if (activityTotalEl) activityTotalEl.textContent = total;
            }
        } catch (error) {
            console.error('Error al actualizar estadísticas:', error);
        }
    }

    // Actualizar stats al cargar
    updateDashboardStats();

    // Actualizar stats periódicamente (cada 30s) en lugar de MutationObserver
    // ya que ahora dependemos del servidor
    setInterval(updateDashboardStats, 30000);

    // ========================================
    // MICROINTERACCIONES
    // ========================================

    // Efecto de ripple en botones (opcional)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Animación de entrada para las cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slide-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar las cards cuando se carguen
    setTimeout(() => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => observer.observe(card));
    }, 100);
});

// Agregar estilos para el ripple effect
const style = document.createElement('style');
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log('🎨 UI interactions loaded');
