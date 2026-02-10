# Flujo del MVP – iUpi (Waitlist + Tracking)

## Objetivo del flujo

Este documento describe el flujo funcional del MVP de iUpi enfocado en
adquisición y conversión de usuarios a través de una lista de espera (waitlist).

El objetivo del MVP no es simular inversiones reales, sino validar:
- Interés del usuario
- Claridad del mensaje
- Confianza suficiente para dejar su email
- Canales de adquisición que mejor convierten


## Alcance del MVP

El flujo incluye únicamente:

- Landing page informativa
- Formulario de registro a la waitlist
- Captura de email
- Registro del canal de origen
- Almacenamiento en base de datos
- Confirmación visual al usuario

No incluye:
- Login
- Perfil de usuario
- Simulación financiera real
- Pagos
- Notificaciones automáticas

El MVP está diseñado para ser simple, rápido y medible.


## Flujo del usuario (paso a paso)

1. El usuario descubre iUpi desde un canal (Instagram, LinkedIn, Web, etc.)
2. Ingresa a la landing page de iUpi
3. Lee la propuesta de valor:
   - Aprender a invertir sin usar dinero real
4. Interactúa con el contenido (texto, mockup, mensaje humano)
5. Decide dejar su email en el formulario de waitlist
6. El sistema guarda:
   - Email
   - Canal de origen
   - Fecha de registro
7. El usuario recibe una confirmación visual clara
8. El email queda disponible para análisis y futuras comunicaciones


## Representación visual del flujo

El flujo se representa de forma lineal y clara:

Usuario  
↓  
Landing iUpi  
↓  
Formulario de Waitlist  
↓  
API de Registro  
↓  
Base de Datos (SQLite)  
↓  
Confirmación al Usuario  

Este flujo está pensado desde la experiencia del usuario, no desde la complejidad técnica.


## Principios del diseño del flujo

- Mobile first
- Cero fricción
- Lenguaje simple
- Acción clara
- Un solo objetivo: dejar el email
