import { db } from './firebase-config.js';
import { collection, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Instancias globales de Chart.js.
 * Se declaran fuera para poder controlar su ciclo de vida y destruirlas antes de redibujar.
 * Esto evita el error común de "Canvas is already in use" o superposición de gráficos.
 */
let barChartInstance = null;
let doughnutChartInstance = null;

const THEME_COLORS = { 
    primary: '#0071b3', 
    accent: '#00C853', 
    secondary: '#FC8F7F', 
    light: '#9DA5A9' 
};

/**
 * Función principal: Orchestrator de datos.
 * 1. Obtiene datos crudos de Firebase.
 * 2. Calcula métricas de negocio (KPIs).
 * 3. Transforma estructuras de datos para Chart.js.
 * 4. Actualiza el DOM.
 */
window.cargarDatos = async function() {
    const refreshIcon = document.querySelector('.refresh-btn i');
    
    // Feedback visual de carga (UX)
    if (refreshIcon) refreshIcon.classList.add('fa-spin');

    try {
        const leadsRef = collection(db, "leads");
        // Ordenamos por fecha descendente en el query para optimizar la lectura,
        // especialmente útil si a futuro limitamos la cantidad de documentos (limit(100)).
        const q = query(leadsRef, orderBy("fecha", "desc"));
        const snapshot = await getDocs(q);

        // Mapeo directo de documentos Firestore a objetos JS limpios
        const leads = snapshot.docs.map(doc => doc.data());
        const totalLeads = leads.length;

        // --- Actualización de KPIs en UI ---
        document.getElementById('totalDisplay').innerText = totalLeads;

        // KPI: Cálculo de Tendencia vs Periodo Anterior
        // TODO: Conectar con datos históricos reales. Actualmente hardcodeado a 0 para el MVP.
        const previousPeriodTotal = 0; 
        const delta = totalLeads - previousPeriodTotal;
        const trendEl = document.getElementById('trendDisplay');
        
        if (trendEl) {
            if (delta > 0) {
                trendEl.innerHTML = `<i class="fa-solid fa-arrow-trend-up"></i> +${delta} vs Inicio`;
                // Aplicamos estilos inline dinámicos según el estado (positivo/negativo)
                Object.assign(trendEl.style, { background: "#ecfdf5", color: "#10b981" });
            } else {
                trendEl.innerHTML = `<i class="fa-solid fa-minus"></i> Sin cambios`;
            }
        }

        // --- Procesamiento de Datos: Agregación por Fuente ---
        // Utilizamos reduce para transformar [Lead, Lead] -> { 'INSTAGRAM': 5, 'LINKEDIN': 2 }
        // Normalizamos a mayúsculas para evitar duplicados por inconsistencia de datos (ej: "Ig" vs "ig").
        const sourceMap = leads.reduce((acc, lead) => {
            const sourceKey = (lead.source || "DESCONOCIDO").toUpperCase();
            acc[sourceKey] = (acc[sourceKey] || 0) + 1;
            return acc;
        }, {});

        // Separamos llaves y valores para alimentar los ejes X e Y de los gráficos
        const labels = Object.keys(sourceMap); 
        const dataValues = Object.values(sourceMap); 

        // KPI: Canal con mayor conversión
        if (labels.length > 0) {
            const maxCount = Math.max(...dataValues);
            // Buscamos la key asociada al valor máximo
            const topKey = labels.find(key => sourceMap[key] === maxCount);
            document.getElementById('topChannelDisplay').innerText = topKey;
        } else {
            document.getElementById('topChannelDisplay').innerText = "N/A";
        }

        // --- Renderizado de Gráficos ---
        renderBarChart(labels, dataValues);
        renderDoughnutChart(labels, dataValues);

    } catch (error) {
        console.error("[Dashboard Error] Fallo al procesar leads de Firebase:", error);
        alert("Error de conexión. Verifique la consola para detalles de depuración.");
    } finally {
        // Aseguramos quitar el spinner incluso si hubo error (Cleanup)
        if (refreshIcon) setTimeout(() => refreshIcon.classList.remove('fa-spin'), 500);
    }
};

/**
 * Renderiza el gráfico de barras (Adquisición).
 * Maneja la destrucción de instancias previas para evitar memory leaks.
 */
function renderBarChart(labels, data) {
    const ctx = document.getElementById('barChart');
    if (!ctx) return; // Guard clause si el elemento no existe en el DOM
    
    if (barChartInstance) {
        barChartInstance.destroy();
    }
    
    barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: { 
            labels: labels, 
            datasets: [{ 
                label: 'Usuarios', 
                data: data, 
                backgroundColor: [THEME_COLORS.primary, THEME_COLORS.accent, THEME_COLORS.secondary], 
                borderRadius: 6,
                barThickness: 30
            }] 
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false, // Crítico para que funcione el wrapper CSS responsive
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
                x: { grid: { display: false } }
            }
        }
    });
}

/**
 * Renderiza el gráfico de dona (Distribución).
 */
function renderDoughnutChart(labels, data) {
    const ctx = document.getElementById('doughnutChart');
    if (!ctx) return;
    
    if (doughnutChartInstance) {
        doughnutChartInstance.destroy();
    }
    
    doughnutChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: { 
            labels: labels, 
            datasets: [{ 
                data: data, 
                backgroundColor: Object.values(THEME_COLORS), 
                borderWidth: 0,
                hoverOffset: 4
            }] 
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { 
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 20 } } 
            },
            cutout: '70%' // Estilo visual más moderno (Dona delgada)
        }
    });
}

// Control de UI: Sidebar Toggle
window.toggleSidebar = function() {
    // Optional chaining (?.) por seguridad si el elemento no ha cargado
    document.getElementById('sidebar')?.classList.toggle('collapsed');
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    window.cargarDatos();
});