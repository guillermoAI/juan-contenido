# Secuencia de Emails - Onboarding GH Consulting

> Para implementar en Brevo cuando esté listo

---

## Email 1: Bienvenida (Día 0 - Inmediato)

**Asunto:** Bienvenido a GH Consulting, {nombre} 🚀

**Cuerpo:**
```
Hola {nombre},

Bienvenido a GH Consulting.

Acabo de recibir tu información y estoy revisándola. En las próximas horas te contactaré para agendar nuestra primera llamada.

Mientras tanto, quiero que sepas algo importante:

No trabajo con todo el mundo. Solo con personas que realmente están comprometidas con transformar su negocio. Por eso selecciono a mis clientes con cuidado.

El hecho de que estés aquí ya dice mucho de ti.

Próximos pasos:
1. Reviso tu diagnóstico
2. Preparo un plan inicial personalizado
3. Nos vemos en la primera call

Si aún no has agendado tu primera llamada, hazlo aquí:
[Agendar Call] → cal.com/guillermohernandez

Nos vemos pronto.

Guillermo
GH Consulting
```

---

## Email 2: Recursos (Día 1)

**Asunto:** Tus accesos a GH Consulting

**Cuerpo:**
```
Hola {nombre},

Aquí tienes todos los recursos que necesitas:

📊 TU DASHBOARD PERSONAL
[Ver mi dashboard] → guillermoai.github.io/juan-contenido/clientes/{cliente}.html

Aquí podrás ver:
- Tu progreso en el roadmap
- Próximos action items
- Métricas importantes

📝 ACTUALIZAR MÉTRICAS
Cada semana, actualiza tus números aquí:
[Formulario de tracking] → guillermoai.github.io/juan-contenido/tracking/

📅 AGENDAR CALLS
¿Necesitas una sesión extra? Agenda aquí:
[Cal.com] → cal.com/guillermohernandez

💬 SOPORTE DIRECTO
Para dudas entre calls, escríbeme por WhatsApp:
[WhatsApp] → wa.me/XXXXXXXXXX

---

Recuerda: el éxito de este proceso depende de tu ejecución. Yo te doy el mapa, tú caminas.

Nos vemos en la call.

Guillermo
```

---

## Email 3: Check-in (Día 3)

**Asunto:** ¿Todo bien, {nombre}?

**Cuerpo:**
```
Hola {nombre},

Solo quería hacer un check-in rápido.

¿Has tenido oportunidad de revisar los recursos que te envié?

Si tienes alguna duda antes de nuestra primera call, no dudes en responder a este email.

Y si aún no has agendado la call, hazlo ahora:
[Agendar] → cal.com/guillermohernandez

A tope.

Guillermo
```

---

## Email 4: Recordatorio call (1 día antes)

**Asunto:** Mañana a las {hora}: nuestra call

**Cuerpo:**
```
Hola {nombre},

Solo un recordatorio de que mañana tenemos nuestra call a las {hora}.

Para que sea lo más productiva posible, prepara:

1. ✅ Tus objetivos claros para los próximos 3-6 meses
2. ✅ Las métricas actuales de tu negocio
3. ✅ Las 2-3 preguntas más importantes que tienes

Nos vemos mañana.

Guillermo

PD: Si por algún motivo no puedes asistir, por favor avísame con antelación aquí: [Reagendar]
```

---

## Email 5: Post-call (Después de la primera sesión)

**Asunto:** Resumen de nuestra call + próximos pasos

**Cuerpo:**
```
Hola {nombre},

Gracias por la call de hoy. Aquí tienes el resumen:

📋 LO QUE DISCUTIMOS:
{resumen_call}

✅ TUS ACTION ITEMS:
{action_items}

📅 PRÓXIMA CALL:
{fecha_proxima_call}

---

Tu dashboard ya está actualizada con estos action items.
[Ver mi progreso] → guillermoai.github.io/juan-contenido/clientes/{cliente}.html

Ejecuta los action items antes de nuestra próxima sesión. Así avanzamos rápido.

A trabajar.

Guillermo
```

---

## Configuración Brevo

### Triggers
1. **Email 1:** Inmediato al recibir onboarding
2. **Email 2:** 24h después de Email 1
3. **Email 3:** 72h después de Email 1
4. **Email 4:** Manual o via Cal.com integration
5. **Email 5:** Manual post-call

### Variables
- `{nombre}` - Nombre del cliente
- `{cliente}` - Slug para URL (minúsculas, sin espacios)
- `{hora}` - Hora de la call
- `{resumen_call}` - Resumen de Fathom
- `{action_items}` - Action items de Fathom

---

*Estos emails se automatizan cuando tengamos Stripe activo para el trigger de pago.*
