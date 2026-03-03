import { db } from './firebase-config.js';
import { 
    doc,                
    getDoc,             
    setDoc,             
    collection, 
    serverTimestamp, 
    getCountFromServer 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/**
 * Extrae el parámetro 'source' de la URL para atribución de marketing.
 * Útil para saber si el usuario viene de Instagram, LinkedIn, etc.
 * Retorna 'directo' por defecto si no hay parámetro.
 */
function getSourceFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("source") || "directo"; 
}

/**
 * Obtiene el conteo real de leads desde Firestore para prueba social.
 * Se utiliza `getCountFromServer` (agregación) en lugar de leer todos los documentos
 * para reducir costos de lectura y mejorar el rendimiento.
 */
async function updateSocialProof() {
    const counterElement = document.getElementById('counter');
    if (!counterElement) return;

    try {
        const coll = collection(db, "leads"); 
        const snapshot = await getCountFromServer(coll);
        const realCount = snapshot.data().count;

        // Actualización directa con transición de opacidad para suavidad visual
        counterElement.innerText = realCount;
        counterElement.style.transition = "opacity 0.5s";
        counterElement.style.opacity = "0";
        setTimeout(() => counterElement.style.opacity = "1", 100);

    } catch (error) {
        console.warn("[SocialProof] Fallo al obtener conteo:", error);
        // Fallback: Mantiene el valor por defecto del HTML (ej: "50+") si falla la API
    }
}

// Lógica de Manejo del Formulario
const form = document.getElementById('waitlistForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Referencias UI
        const emailInput = document.getElementById('emailInput');
        const btn = document.getElementById('submitBtn');
        const msgBox = document.getElementById('mensaje');

        // Normalización de entrada: minúsculas y sin espacios laterales
        const email = emailInput.value.trim().toLowerCase();
        if (!email) return;

        // Estado UI: Cargando (Feedback inmediato al usuario)
        btn.disabled = true;
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Verificando...';
        
        // Resetear caja de mensajes
        msgBox.style.display = 'none';
        msgBox.className = 'message-box'; 

        try {
            // Estrategia de ID: Usamos el Email como ID del documento.
            // Esto garantiza unicidad a nivel de base de datos (evita duplicados automáticamente).
            const docRef = doc(db, "leads", email);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                // Caso: Usuario ya registrado
                msgBox.innerHTML = '<i class="fa-solid fa-heart"></i> Este email ya está en la lista.';
                msgBox.classList.add('success'); // Usamos estilo success (verde) para no frustrar al usuario
                msgBox.style.display = 'block';
                
                btn.innerHTML = '¡Ya estás dentro!';
                // Mantenemos el botón deshabilitado para evitar spam de clics
                
            } else {
                // Caso: Nuevo Registro
                btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Guardando...';

                // Escritura en Firestore
                await setDoc(docRef, {
                    email: email, 
                    source: getSourceFromUrl(), 
                    fecha: serverTimestamp(), // Marca de tiempo del servidor para consistencia
                    dispositivo: navigator.userAgent // Metadata útil para analítica (Móvil vs Desktop)
                });

                // Feedback de Éxito
                msgBox.innerHTML = '<i class="fa-regular fa-circle-check"></i> ¡Estás dentro! Te avisaremos al lanzar la Beta.';
                msgBox.classList.add('success');
                msgBox.style.display = 'block';
                
                form.reset();
                btn.innerHTML = '¡Listo!';
                
                // Actualización Optimista de UI: 
                // Incrementamos el contador visualmente sin hacer otra petición a la BD.
                const counterElement = document.getElementById('counter');
                if (counterElement) {
                    let currentVal = parseInt(counterElement.innerText) || 0;
                    counterElement.innerText = currentVal + 1;
                }
            }

        } catch (error) {
            console.error("[Form Error] Falló la transacción en Firestore:", error);
            
            // Feedback de Error
            msgBox.innerText = "Hubo un problema de conexión. Por favor intenta de nuevo.";
            msgBox.classList.add('error');
            msgBox.style.display = 'block';

            // Restaurar estado del botón para permitir reintento
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
        }
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateSocialProof();
});