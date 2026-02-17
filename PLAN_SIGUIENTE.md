# Plan de Desarrollo - GH Consulting Backend

> Creado: 17 Feb 2026
> Para: Guillermo

---

## ✅ COMPLETADO HOY

### Infraestructura
- [x] Google Workspace conectado (Gmail, Calendar, Drive, Sheets, Docs)
- [x] Fathom webhook configurado → transcripts automáticos a Sheet
- [x] Cal.com webhook configurado → bookings automáticos a Sheet
- [x] Apps Script centralizado recibiendo todos los webhooks
- [x] URLs del hub arregladas (estaban en path incorrecto)

### Hub y Dashboards
- [x] Index principal actualizado con navegación completa
- [x] Sección de clientes en el dashboard principal
- [x] Panel de sistema completo con estado de todas las conexiones
- [x] Formulario de tracking de métricas (clientes actualizan semanales)
- [x] Template de propuesta/dossier post-llamada (editable)
- [x] 6 dashboards de clientes funcionando

### Datos Reales
- [x] Dashboard Pablo con datos del diagnóstico (€500k, pricing, avatar)
- [x] Dashboard Alejandro con datos del diagnóstico (3 fases, finanzas familiares)
- [x] NEGOCIO.md actualizado con toda la info

---

## 📍 URLS FUNCIONANDO

| Página | URL |
|--------|-----|
| Hub Principal | guillermoai.github.io/juan-contenido/ |
| Clientes | guillermoai.github.io/juan-contenido/clientes/ |
| Sistema | guillermoai.github.io/juan-contenido/sistema/ |
| Onboarding | guillermoai.github.io/juan-contenido/onboarding/ |
| Tracking | guillermoai.github.io/juan-contenido/tracking/ |
| Propuesta | guillermoai.github.io/juan-contenido/propuesta/ |

---

## 🎯 PRÓXIMOS PASOS (Prioridad)

### Semana 1: Completar Backend Core

**1. Datos de clientes restantes**
- [ ] Obtener diagnósticos de Néstor, Nel, Alex, Marcos
- [ ] Actualizar sus dashboards con datos reales
- [ ] O: pedirle a Guillermo los datos clave de cada uno

**2. Apps Script - añadir tracking**
```javascript
// Falta añadir handleTracking para las métricas semanales
function handleTracking(data) { ... }
```

**3. Emails automáticos**
- [ ] Secuencia de onboarding (Brevo o Gmail API)
  - Día 0: Bienvenida + accesos
  - Día 3: Check-in
  - Día 7: Recordatorio primera call

**4. Contrato digital**
- [ ] Template en Docs
- [ ] Opción de firma (DocuSign o alternativa gratis)

### Semana 2: Automatizaciones

**5. Flujo "Luz Verde"**
- [ ] Pago recibido → trigger automático
- [ ] Crear carpeta Drive automáticamente
- [ ] Enviar email de bienvenida
- [ ] Crear entrada en Sheet de clientes
- [ ] Notificar a Guillermo

**6. Análisis de calls**
- [ ] Cuando llega transcript de Fathom:
  - Extraer problemas mencionados
  - Extraer métricas discutidas
  - Generar action items
  - Actualizar dashboard del cliente

**7. Alertas**
- [ ] Cliente no actualiza métricas en 7 días → alerta
- [ ] Call próxima en 24h → recordatorio
- [ ] Nuevo booking → notificación

### Semana 3: Escala

**8. Base de datos para LLMs**
- [ ] Documento master con todo el contexto
- [ ] Actualización automática
- [ ] Fácil de copiar/pegar

**9. Más contenido en Podia**
- [ ] Módulo de oferta (expandir)
- [ ] Módulo de pricing
- [ ] Módulo de contenido
- [ ] Módulo de funnel

**10. Sistema de careers** (cuando escale)
- [ ] Página de ofertas de trabajo
- [ ] Formulario de aplicación
- [ ] Filtrado automático

---

## 🔧 MEJORAS TÉCNICAS PENDIENTES

1. **YouTube OAuth** - para métricas en vivo del canal
2. **Instagram API** - cuando tenga Business account
3. **Stripe** - cuando termine la LLC
4. **Calculadora de pricing** - mini-app interactiva
5. **Generador de oferta** - basado en diagnóstico

---

## 💡 IDEAS PARA DIFERENCIACIÓN

Del video de Raúl (Europe):
- Dashboard de resultados visible para cliente
- Reportes automáticos semanales
- Onboarding que tarda 1 hora vs 5-10 horas
- Profesionalismo que cierra ventas en la call

Extras que podemos añadir:
- Análisis IA de cada call (ya tenemos Fathom)
- Comparativa con competencia
- Predicciones basadas en métricas
- Gamificación del progreso

---

## 📊 MÉTRICAS DE ÉXITO

**Para el sistema:**
- Tiempo de onboarding: <1 hora (vs 5-10 actual)
- % de tareas automatizadas: >70%
- Clientes con dashboard activa: 100%
- Transcripts procesados automáticamente: 100%

**Para el negocio:**
- Tasa de cierre: 85%+ (con dossier post-llamada)
- Retención de clientes: >80%
- Referidos: tracking

---

## 🚨 RECORDATORIOS IMPORTANTES

1. **Stripe**: En cuanto tengas la LLC, conectamos y automatizamos pagos
2. **Diagnósticos**: Necesito los de Néstor, Nel, Alex, Marcos para completar dashboards
3. **YouTube OAuth**: Si quieres métricas en vivo, necesito el código de auth
4. **Apps Script**: Recuerda hacer "New Version" después de cada cambio

---

*Este plan se actualiza conforme avanzamos. Revísalo cuando tengas dudas de qué sigue.*
