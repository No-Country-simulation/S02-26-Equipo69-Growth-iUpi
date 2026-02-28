# 🧩 Arquitectura Técnica del MVP

El MVP de iUpi fue desarrollado utilizando una arquitectura serverless enfocada en velocidad de validación y escalabilidad.

---

## 🖥️ Frontend

Tecnologías utilizadas:

- HTML5
- CSS3
- JavaScript (ES Modules)
- Chart.js para visualización de métricas

El frontend está dividido en:

- Landing pública (captura de leads)
- Dashboard administrativo (visualización de métricas)

---

## ☁️ Backend (Serverless)

Se utilizó:

- Firebase
- Cloud Firestore (NoSQL Database)

No se implementó servidor propio.
Se utilizó Backend-as-a-Service para reducir complejidad y acelerar validación.

---

## 📥 Registro de Leads

Cada registro guarda:

- email (usado como ID único del documento)
- source (capturado desde URL query param)
- fecha (serverTimestamp de Firestore)
- dispositivo (navigator.userAgent)

Estrategia clave:

El email se utiliza como ID del documento en Firestore,
lo que evita duplicados automáticamente sin necesidad de validación adicional.

---

## 📊 Dashboard Admin

El dashboard consume directamente Firestore y:

- Calcula total de leads.
- Agrupa por canal utilizando reduce().
- Identifica canal top.
- Renderiza gráficos dinámicos con Chart.js.
- Destruye instancias previas para evitar errores de canvas.

Incluye:

- KPI de crecimiento.
- Distribución por fuente.
- Estado de API (Firestore).

---

## 🚀 Optimización Implementada

- Uso de getCountFromServer() para reducir costos de lectura.
- Ordenamiento por fecha en queries.
- UI optimista (incremento inmediato del contador).
- Normalización de source en mayúsculas.
- Prevención de duplicados por diseño estructural.

---

## 🎯 Enfoque Estratégico

Se priorizó:

- Validación rápida.
- Medición de adquisición real.
- Infraestructura escalable sin DevOps.
- Arquitectura limpia antes de complejidad técnica.