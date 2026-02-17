# Sistema Automatizado GH Consulting

## La Visión: "Luz Verde"

Cuando cierras un cliente y recibe el pago → **todo se activa automáticamente**:
- Dashboard personalizada creada
- Accesos enviados
- Grupo de comunicación listo
- Métricas ya configuradas
- Tú solo te enfocas en las calls

---

## Flujo Completo

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FLUJO DEL CLIENTE                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  1. CAPTACIÓN                                                       │
│     ├── YouTube/Instagram → Lead                                    │
│     └── DM/Email → Call de descubrimiento                          │
│                                                                     │
│  2. CALL DE VENTA                                                   │
│     ├── Diagnóstico rápido                                         │
│     ├── Mostrar sistemas (profesionalismo)                         │
│     └── Enviar DOSSIER post-llamada (auto)                         │
│                                                                     │
│  3. CIERRE                                                          │
│     ├── Cliente acepta                                              │
│     ├── Link de pago (Stripe)                                       │
│     └── 💥 PAGO RECIBIDO = LUZ VERDE                               │
│                                                                     │
│  4. ONBOARDING AUTOMÁTICO (0 intervención tuya)                    │
│     ├── Email de bienvenida con accesos                            │
│     ├── Formulario de setup (cliente rellena)                      │
│     ├── Contrato digital enviado                                   │
│     ├── Dashboard creada automáticamente                           │
│     ├── Carpeta Drive creada                                       │
│     ├── Acceso a Podia activado                                    │
│     └── Grupo WhatsApp/Telegram con templates                      │
│                                                                     │
│  5. DELIVERY                                                        │
│     ├── Calls semanales (Fathom → análisis auto)                   │
│     ├── Dashboard se actualiza con métricas                        │
│     ├── Check-ins automáticos por email                            │
│     └── Reportes de progreso generados                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Componentes a Construir

### 1. FORMULARIO DE SETUP (El cliente rellena esto y todo se genera)

**URL:** `/onboarding/setup`

**Campos:**
```
DATOS BÁSICOS
- Nombre completo
- Email
- WhatsApp
- País/Timezone

REDES SOCIALES
- Instagram @
- YouTube @
- TikTok @
- Twitter/X @
- LinkedIn URL

NEGOCIO
- Nicho/industria
- Producto actual (descripción)
- Precio del producto
- Plataforma de venta (Skool, Whop, Hotmart, etc.)
- Facturación mensual actual
- Objetivo de facturación

CONTENIDO
- ¿Cuántos videos/reels publicas por semana?
- ¿Tienes editor?
- ¿Grabas con móvil o cámara?
- Link a tu mejor video

PROBLEMAS
- ¿Cuál es tu mayor bloqueo ahora mismo?
- ¿Qué has intentado que no funcionó?
- ¿Qué esperas de la consultoría?
```

### 2. AUTOMATIZACIONES (Cuando el formulario se envía)

```javascript
// Trigger: Formulario completado + Pago confirmado

1. CREAR DASHBOARD
   → Generar página /clientes/{nombre}.html
   → Poblar con datos del formulario
   → Conectar APIs de sus redes (si dan acceso)

2. CREAR CARPETA DRIVE
   → Folder: "GH Consulting - {Nombre}"
   → Subfolders: Recursos, Entregables, Grabaciones
   → Compartir con su email

3. ENVIAR EMAILS
   → Email 1: Bienvenida + accesos
   → Email 2 (día 3): Check-in
   → Email 3 (día 7): Recordatorio primera call

4. GENERAR CONTRATO
   → Template con datos del cliente
   → Enviar para firma digital

5. CREAR TRACKING
   → Fila en Google Sheet "Clientes"
   → Configurar alertas si no actualiza métricas

6. NOTIFICAR A JUAN
   → "Nuevo cliente onboarded: {Nombre}"
   → Resumen de su situación
```

### 3. DASHBOARD DEL CLIENTE (Auto-generada)

**Secciones:**
- Progreso en el roadmap (visual)
- Métricas de su negocio (editables por él)
- Action items de cada call
- Recursos asignados
- Calendario de próximas calls
- Chat/notas

**El cliente puede:**
- Ver su progreso
- Actualizar sus métricas semanalmente
- Descargar recursos
- Ver grabaciones de calls

### 4. DOSSIER POST-LLAMADA (Auto-generado)

**Template:**
```
┌────────────────────────────────────────┐
│      GH CONSULTING - PROPUESTA         │
│         Para: {Nombre}                 │
├────────────────────────────────────────┤
│                                        │
│  TU SITUACIÓN ACTUAL                   │
│  • {datos del diagnóstico}             │
│                                        │
│  EL PROBLEMA                           │
│  • {identificado en la call}           │
│                                        │
│  LA SOLUCIÓN                           │
│  • {servicios propuestos}              │
│                                        │
│  EL PROCESO                            │
│  • Fase 1: ...                         │
│  • Fase 2: ...                         │
│  • Fase 3: ...                         │
│  • Fase 4: ...                         │
│                                        │
│  INVERSIÓN                             │
│  • {precio acordado}                   │
│  • {forma de pago}                     │
│                                        │
│  BONUS INCLUIDOS                       │
│  • Dashboard personalizada             │
│  • Acceso a clases en Podia            │
│  • Grupo de soporte directo            │
│  • Análisis de calls con IA            │
│                                        │
│  SIGUIENTE PASO                        │
│  → [LINK DE PAGO]                      │
│                                        │
└────────────────────────────────────────┘
```

### 5. INTEGRACIONES REQUERIDAS

| Sistema | Estado | Función |
|---------|--------|---------|
| Google Sheets | ✅ Listo | Base de datos clientes |
| Google Drive | ✅ Listo | Carpetas por cliente |
| Gmail | ✅ Listo | Emails automáticos |
| Stripe | ⏳ Pendiente | Pagos + trigger onboarding |
| Fathom | ⏳ Webhook pendiente | Transcripts → análisis |
| GitHub Pages | ✅ Listo | Dashboards |
| Calendly/Cal | ⏳ Pendiente | Booking calls |

---

## Orden de Implementación

### SEMANA 1: Fundamentos
1. ✅ Dashboards de clientes (estructura base)
2. ⏳ Formulario de setup (Google Forms → Sheet)
3. ⏳ Sheet maestra de clientes
4. ⏳ Template de dossier post-llamada
5. ⏳ Webhook Fathom funcionando

### SEMANA 2: Automatizaciones
1. Secuencia de emails (bienvenida, check-ins)
2. Generación automática de carpetas Drive
3. Script para crear dashboards desde formulario
4. Integración Stripe (cuando lo actives)

### SEMANA 3: Pulido
1. Contrato digital
2. Sistema de alertas
3. Reportes automáticos
4. Testing con cliente real

---

## Lo Que Tú Haces vs Lo Que Se Automatiza

| ANTES (Manual) | AHORA (Automático) |
|----------------|-------------------|
| Crear carpeta Drive | ✅ Auto |
| Enviar email bienvenida | ✅ Auto |
| Crear dashboard | ✅ Auto |
| Enviar contrato | ✅ Auto |
| Recordar check-ins | ✅ Auto |
| Analizar calls | ✅ Auto (Fathom+IA) |
| Actualizar progreso | ⚡ Cliente lo hace |
| **Las calls 1-1** | 👤 Tú (tu valor) |
| **Estrategia** | 👤 Tú (tu valor) |

**Resultado:** De 5-10 horas por cliente → menos de 1 hora

---

## Para Empezar AHORA

Necesito que hagas:

1. **Configura el webhook de Fathom** (instrucciones arriba)
2. **Dime tu link de Stripe** (o si aún no lo tienes activo)
3. **¿Usas Calendly, Cal.com, o algo para agendar?**

Yo mientras creo:
- El formulario de setup
- La sheet maestra de clientes
- El template de dossier
- La automatización de emails
