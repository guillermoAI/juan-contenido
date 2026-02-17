# Scripts y Automatizaciones

> Documentación de las automatizaciones del sistema GH Consulting

---

## Apps Script (Google)

### Ubicación
- **URL del endpoint:** `https://script.google.com/macros/s/AKfycbxrjDXn2_cov_0ylX8ipqyfkL-249qBjz2EpHTzl5TNKgNurM33rARJkd7wuqrnjmlm/exec`
- **Código fuente:** `/scripts/apps-script-v2.js`

### Funcionalidades

| Función | Trigger | Acción |
|---------|---------|--------|
| `handleFathom` | Webhook Fathom (call_id) | Guarda transcript en Sheet |
| `handleCalCom` | Webhook Cal.com (triggerEvent) | Registra booking en Sheet |
| `handleOnboarding` | POST type='onboarding' | Guarda datos de nuevo cliente |
| `handleTracking` | POST type='tracking' | Guarda métricas semanales |

### Cómo Actualizar

1. Abre https://script.google.com
2. Selecciona el proyecto
3. Pega el código de `apps-script-v2.js`
4. Deploy → Manage deployments → New deployment
5. Copia la nueva URL si cambió

---

## Webhooks Configurados

### Fathom
- **Destino:** Apps Script endpoint
- **Eventos:** Nueva call transcrita
- **Sheet destino:** `1DQL-x67xjo8QZntbW3D9lA2qwEYl2ZoOH2NwvrfvBt0`

### Cal.com
- **Destino:** Apps Script endpoint
- **Eventos:** BOOKING_CREATED, BOOKING_RESCHEDULED, BOOKING_CANCELLED
- **Sheet destino:** `1HgGc_W_NLLON0a49GbhlsAQKf8w9qbTnMqCuwWRCHNY` (pestaña Bookings)

---

## Formularios

### Onboarding
- **URL:** `https://guillermoai.github.io/juan-contenido/onboarding/`
- **Envía a:** Apps Script → Sheet Clientes Master

### Tracking
- **URL:** `https://guillermoai.github.io/juan-contenido/tracking/`
- **Envía a:** Apps Script → Sheet Clientes Master (pestaña Tracking)

---

## Google Sheets

| Sheet | ID | Pestañas |
|-------|-----|----------|
| Clientes Master | `1HgGc_W_NLLON0a49GbhlsAQKf8w9qbTnMqCuwWRCHNY` | Clientes, Bookings, Onboarding, Tracking |
| Fathom Data | `1DQL-x67xjo8QZntbW3D9lA2qwEYl2ZoOH2NwvrfvBt0` | Calls |
| Roadmap | `1fBbHXbsj9BgceP7wmoPzZmeoG2RsvbfmT6_hxQVC7nw` | Roadmap del programa |

---

## Automatizaciones Pendientes

### 1. Emails Automáticos (Brevo)
**Necesita:** API Key de Brevo
**Hará:** 
- Email de bienvenida al registrar onboarding
- Secuencia de 5 emails de onboarding
- Recordatorio pre-call

### 2. Stripe Webhooks
**Necesita:** API Key de Stripe + LLC activa
**Hará:**
- Detectar pago recibido
- Activar flujo "Luz Verde"
- Notificar a Guillermo

### 3. Alertas de Juan (Heartbeat)
**Status:** Configurado en HEARTBEAT.md
**Hará:**
- Alertar si cliente no actualiza métricas en 7 días
- Monitorear nuevos videos de referentes
- Preparar briefing pre-call

---

## Cómo Probar

### Test Fathom Webhook
```bash
curl -X POST "https://script.google.com/.../exec" \
  -H "Content-Type: application/json" \
  -d '{"call_id": "test123", "title": "Test Call"}'
```

### Test Onboarding
```bash
curl -X POST "https://script.google.com/.../exec" \
  -H "Content-Type: application/json" \
  -d '{"type": "onboarding", "data": {"nombre": "Test", "email": "test@test.com"}}'
```

### Test Tracking
```bash
curl -X POST "https://script.google.com/.../exec" \
  -H "Content-Type: application/json" \
  -d '{"type": "tracking", "data": {"cliente": "Test", "seguidores_ig": "1000"}}'
```

---

## Troubleshooting

### El webhook no funciona
1. Verificar que el endpoint está deployado como "Anyone"
2. Revisar logs en Apps Script (View → Executions)
3. Verificar que el JSON tiene el formato correcto

### Los datos no aparecen en Sheet
1. Verificar que la pestaña existe
2. Revisar permisos del Sheet
3. Verificar ID del Sheet en el código

---

*Última actualización: 17 Feb 2026*
