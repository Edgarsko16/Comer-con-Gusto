# Sesiones online con Google Meet

Estado a 20/11/2026: prototipo local con una **reunión reutilizable real configurada**. No está publicado en Netlify ni se ha usado con pacientes.

Las fuentes son los centros de ayuda oficiales de Google, consultados en esa fecha. Esta información es orientativa y no sustituye a un profesional en protección de datos.

> Este documento es interno y **no se publica**: ver «Despliegue y archivos internos».

## Reunión configurada

- `sesiones-online/config.js` contiene `urlSala: "https://meet.google.com/ekv-uxom-cbb"`.
- La reunión se creó con «Crear una reunión para más tarde», desde la cuenta de Google con la que Rebeca hace de organizadora.
- Es la **sala habitual para todas las consultas**: no se crea una reunión distinta por paciente.
- El botón «Entrar a mi consulta» abre exactamente ese enlace en la misma pestaña. Está comprobado en local, sin entrar en la reunión.
- La videollamada no tiene que estar abierta siempre. El enlace está siempre disponible en la web, y Rebeca entra cuando tiene una cita.
- **Caducidad:** según las condiciones actuales de Google, un código creado con «Crear una reunión para más tarde» caduca **365 días después de su último uso** (support.google.com/meet/answer/10710509). Mientras se use, se mantiene. Si caduca o se sustituye, hay que actualizar `urlSala`.

## Qué controla la web y qué controla Google Meet

**La web de Comer con Gusto no controla quién entra.** Solo muestra un botón con el enlace. Admitir, denegar, expulsar o terminar la reunión son funciones de Google Meet, que dependen de la cuenta de Rebeca y de cómo esté configurada la reunión.

## Cómo entran los pacientes

1. Entran en Comer con Gusto y pulsan «Sesiones online».
2. Pulsan «Entrar a mi consulta» y se abre Google Meet.
3. Dan permiso a la cámara y al micrófono, escriben su nombre y pulsan «Solicitar unirse», si Meet lo permite.
4. Esperan a que Rebeca los admita.

No hay formularios, cuentas ni contraseñas en la web. Si Meet pide una cuenta de Google, la página indica que **no creen ninguna** y que llamen a Rebeca. El teléfono y el WhatsApp siguen visibles.

## Cómo accede Rebeca como organizadora

1. Inicia sesión en Google, en Chrome, con **la misma cuenta con la que creó la reunión**. Solo la creadora puede admitir a los pacientes en reuniones de cuentas personales (answer/9302870).
2. Unos minutos antes de la cita, abre `https://meet.google.com/ekv-uxom-cbb` y entra. Tiene que estar dentro para ver y aprobar las solicitudes (answer/9303164).
3. Cuando aparezca la solicitud, comprueba que el nombre corresponde al paciente citado y pulsa **Admitir**. Si no corresponde, pulsa **Denegar**.
4. Si llega otra solicitud durante la sesión, la **deniega**.
5. Al terminar, usa **«Finalizar la llamada para todos»** si aparece. Si no, expulsa a quien quede y cuelga.
6. **Nunca** invita a pacientes a este enlace desde Google Calendar, ni desde dentro de la reunión con «Añadir personas».

## Controles de admisión que deben revisarse manualmente en Meet

Estas comprobaciones no se han podido hacer desde la web: hay que hacerlas en la cuenta de Rebeca.

| Control | Qué comprobar | Estado según la documentación |
|---|---|---|
| Acceso a la reunión | En «Controles del organizador» → «Acceso a la reunión», que **no** esté en «Abierto». Debe estar en «De confianza» | Las cuentas personales están en «De confianza» por defecto. «Restringido» no existe en cuentas personales. Que el panel aparezca igual en la cuenta gratuita está **sin confirmar** |
| Solicitar unirse | Que un dispositivo de prueba sin invitación tenga que pedir acceso | En «De confianza», «el resto debe solicitar unirse» (answer/9302870) |
| Admitir y Denegar | Que aparezcan a Rebeca | Confirmado: solo puede admitir la creadora |
| Quitar participante | Que Rebeca pueda expulsar a alguien | Documentado, sobre todo para Workspace; **comprobar** en la cuenta personal |
| Finalizar para todos | Que aparezca la opción | Requiere la gestión del organizador. **Sin confirmar** en cuentas personales |
| El organizador debe entrar primero | Si existe la opción, activarla | **Sin confirmar** en cuentas personales |
| Grabación y notas automáticas | Que no se usen | No están disponibles en Gmail gratuito, salvo con Google One de 2 TB o un plan de IA |

## Límites de la protección: lo que Meet gratuito **no** garantiza

**Google Meet gratuito no puede garantizar que todas las personas tengan que pedir autorización en cada visita.**

- **Invitados por Calendar o desde la reunión.** En el modo «De confianza», entran sin pedir permiso las personas invitadas por Calendar y, según la definición de Google de 2023, también las invitadas desde dentro de la reunión. Pueden hacerlo incluso antes que Rebeca («guests can join before you»).
- **Volver a entrar.** Google no documenta si alguien que ya fue admitido puede volver a entrar sin pedir acceso, ni en la misma sesión ni en otra posterior. Además, la ayuda indica que, al reanudar una reunión terminada, «pueden unirse todos los participantes anteriores», sin aclarar si deben solicitarlo.
- **Bloqueo.** Bloquear a un participante solo dura mientras dura la reunión en curso. No es permanente.
- **Opciones de pago.** La cuenta personal no tiene acceso «Restringido» ni sala de espera, y no hay ninguna opción confirmada para rechazar solicitudes automáticamente. Todo eso existe en Google Workspace de pago: la sala de espera, por ejemplo, desde Business Standard.
- **Usuarios anónimos.** Una página de ayuda indica que los anónimos que solicitan unirse pueden ser **rechazados automáticamente**. No está claro si se aplica a reuniones de cuentas personales. **Hay que probarlo.**

## Riesgos de compartir el mismo enlace entre pacientes

1. Cualquier paciente anterior, o quien reciba el enlace, puede pedir acceso durante la consulta de otra persona. Rebeca tiene que denegarlo y, si insiste, bloquearlo en esa reunión.
2. Si alguien quedara como persona de confianza, por una invitación o, quizá, por una admisión anterior, podría entrar sin pedir permiso. Para reducir el riesgo: no invitar nunca a nadie, terminar la reunión para todos y revisar quién está dentro al empezar cada sesión.
3. Medidas más seguras, si la prueba muestra reentradas sin permiso:
   - crear un enlace por cita (se pierde el botón fijo), o
   - pasar a Workspace de pago, con acceso «Restringido», sala de espera y DPA.
4. El enlace es público en la web. Por eso la protección depende **por completo** de la admisión que haga Rebeca en Meet.

## Condiciones generales de Google Meet gratuito

| Tema | Situación | Fuente |
|---|---|---|
| Duración 1:1 | Hasta 24 h. Una sesión de 60 min cabe sin problema | answer/7317473 |
| Duración con 3 o más | 60 min, con aviso a los 50. **Si un familiar se conecta desde otro aparato, se aplica este límite** | ídem |
| Sin cuenta de Google | La ayuda describe la entrada pidiendo acceso, también en el móvil, pero hay indicios de rechazo automático de anónimos. **No está comprobado con dispositivos reales** | answer/9303069, answer/9302870 |
| Sala de espera dedicada | **No existe en cuentas gratuitas.** Solo hay el aviso de «Admitir/Denegar» | workspaceupdates 10/2025 |
| Grabación | No disponible en Gmail gratuito | answer/9308681 |
| Subtítulos en español | Disponibles para todos | answer/15077804 |

## Despliegue y archivos internos

- `netlify.toml` publica solo `dist/`. Esta carpeta se genera copiando una **lista cerrada** de archivos: `index.html`, `style.css`, `script.js`, `images/`, `sesiones-online/` y `_redirects`.
- `docs-internos/` y `.claude/` no se suben, aunque se conservan en local.
- `_redirects` (404 forzado) queda como segunda barrera.
- `.gitignore` excluye `dist/`.
- Al añadir un archivo público nuevo en la raíz, hay que añadirlo a la lista de `netlify.toml`.
- **Pendiente:** comprobar en Netlify que el sitio se despliega desde GitHub y, en la primera vista previa de despliegue, que `/docs-internos/` devuelve 404.

## Archivos

| Archivo | Estado |
|---|---|
| `sesiones-online/config.js` | `urlSala` con la reunión real |
| `sesiones-online/sesiones.js` | Solo acepta enlaces `https://meet.google.com/xxx-xxxx-xxx`. Se abre en la misma pestaña |
| `sesiones-online/index.html` | Textos para Meet. No promete ni el acceso sin cuenta ni una admisión garantizada |
| `sesiones-online/sesiones.css` | Estilos de la página |
| `index.html`, `style.css`, `script.js` | Enlace «Sesiones online» en el menú y en el pie. Menú móvil por debajo de 1200 px |
| `netlify.toml`, `.gitignore`, `_redirects` | Exclusión de los archivos internos |
| `.claude/launch.json`, `.claude/servidor-local.js` | Vista previa local con recarga automática |

## Probar en local

La vista previa «comer-con-gusto» de Claude Desktop arranca `node .claude/servidor-local.js 8082`. La página se abre en `http://127.0.0.1:8082/sesiones-online/`.

## Pendiente antes de atender pacientes reales

**1. Prueba simulada con dos dispositivos**, con datos ficticios y sin pacientes:
- **Dispositivo A:** la cuenta de Rebeca, dentro de la reunión.
- **Dispositivo B:** sin sesión de Google, entrando desde la web por el botón.
- Comprobar:
  - si B puede pedir acceso o lo rechazan automáticamente;
  - que A ve la solicitud y puede admitir y denegar;
  - expulsar;
  - finalizar para todos;
  - que B, **tras haber sido admitido**, vuelve a tener que pedir acceso al salir y entrar, y también en una sesión posterior;
  - qué ve B si intenta entrar cuando Rebeca no está.
- Repetir B con un Android, un iPhone y un ordenador.
- Confirmar los rótulos en español.

**2. Configuración de Rebeca:**
- Revisar la tabla de controles anterior.
- No usar invitaciones.
- Validar los textos de la página, en especial «La sesión no se graba».

**3. Protección de datos (bloqueante):**
- Gmail gratuito no tiene contrato de encargo del tratamiento (DPA), y Google actúa como responsable.
- Una persona asesora debe decidir entre Workspace de pago con el DPA aceptado u otra herramienta.
- Hay que preparar el registro de tratamientos, la información y el consentimiento para la teleconsulta, la evaluación de impacto si procede y la política de privacidad.
- **No atender pacientes reales hasta resolverlo.**

**4. Despliegue:** ver «Despliegue y archivos internos».
