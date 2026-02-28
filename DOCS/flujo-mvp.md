# Flujo del MVP – iUpi (Waitlist + Tracking)

---

# 🎯 Objetivo del Flujo

Este documento describe el flujo funcional del MVP de iUpi enfocado en adquisición y conversión de usuarios a través de una lista de espera (waitlist).

El objetivo del MVP no es simular inversiones reales, sino validar:

- Interés del usuario.
- Claridad del mensaje.
- Confianza suficiente para dejar su email.
- Canales de adquisición que mejor convierten.

Este MVP permite medir antes de escalar.

---

# 📦 Alcance del MVP

El flujo incluye:

- Landing page informativa optimizada.
- Propuesta de valor clara y visible above the fold.
- Formulario de registro a la waitlist.
- Captura de email.
- Registro automático del canal de origen (UTM).
- Almacenamiento en base de datos.
- Confirmación visual clara al usuario.

No incluye:

- Login.
- Perfil de usuario.
- Simulación financiera real.
- Pagos.
- Automatizaciones complejas.
- Email marketing avanzado.

El MVP está diseñado para ser simple, rápido y medible.

---

# 🔄 Flujo del Usuario (Paso a Paso)

1. El usuario descubre iUpi desde un canal (Instagram, LinkedIn, Web, etc.).
2. Ingresa a la landing page optimizada.
3. Visualiza la propuesta de valor:
   "Aprendé a invertir sin arriesgar tu dinero real."
4. Observa mockups del simulador y mensajes de validación.
5. Decide dejar su email en el formulario de waitlist.
6. El sistema registra automáticamente:
   - Email
   - Canal de origen (UTM)
   - Fecha y hora de registro
7. Se guarda la información en base de datos.
8. El usuario recibe una confirmación visual clara:
   "Estás en la lista. Te avisaremos cuando abramos acceso."

---

# 🧭 Representación Visual del Flujo

Usuario  
↓  
Canal (Instagram / LinkedIn / Web)  
↓  
Landing iUpi  
↓  
Formulario de Waitlist  
↓  
API de Registro  
↓  
Base de Datos (SQLite)  
↓  
Confirmación Visual  

Este flujo prioriza experiencia simple sobre arquitectura compleja.

---

# 🧠 Principios del Diseño del Flujo

- Mobile first.
- Cero fricción.
- Lenguaje simple y humano.
- Un solo objetivo por página.
- CTA claro y directo.
- Eliminación de distracciones.
- Tiempo de carga optimizado.
- Validación visual inmediata tras registro.

---

# 📊 Tracking y Medición

Cada canal utiliza parámetros UTM para identificar el origen del usuario.

Datos almacenados:

- Email
- Fuente (source)
- Medio (medium)
- Campaña (campaign)
- Fecha de registro

Métricas principales:

- Conversion Rate (visitas → registros).
- Registros por canal.
- Tasa de abandono del formulario.
- CTR desde redes sociales.

Esto permite identificar qué canal genera usuarios de mayor intención.

---

# 🧪 Validación del MVP

El MVP busca responder:

- ¿El mensaje es lo suficientemente claro?
- ¿La propuesta genera confianza?
- ¿Qué canal convierte mejor?
- ¿Cuál es el costo de adquisición estimado?

Antes de desarrollar funcionalidades complejas, se valida interés real.

---

# 🚀 Enfoque Estratégico

El MVP está diseñado bajo el principio:

Validar antes de escalar.

No se invierte en desarrollo complejo sin evidencia de interés y conversión.

La prioridad es:

- Aprender.
- Medir.
- Optimizar.
- Escalar con fundamento.

---