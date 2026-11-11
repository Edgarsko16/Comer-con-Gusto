const instagramLink = document.querySelector('a[href*="instagram.com"]');

if (instagramLink) {
  instagramLink.addEventListener("click", () => {
    console.log("Usuario visitó el Instagram");
  });
}

/* =====================================================
   MENÚ MÓVIL ACCESIBLE
   ===================================================== */

const cabecera = document.querySelector(".cabecera-principal");
const botonMenu = document.querySelector(".boton-menu");
const menuPrincipal = document.querySelector("#menu-principal");
const textoBotonMenu = document.querySelector(".texto-boton-menu");
const consultaMovil = window.matchMedia("(max-width: 1100px)");

function menuEstaAbierto() {
  return botonMenu?.getAttribute("aria-expanded") === "true";
}

function abrirMenu() {
  botonMenu.setAttribute("aria-expanded", "true");
  botonMenu.setAttribute("aria-label", "Cerrar menú");
  menuPrincipal.classList.add("abierta");

  /* Llevamos el foco al primer enlace del menú */
  const primerEnlace = menuPrincipal.querySelector("a");
  if (primerEnlace) {
    primerEnlace.focus();
  }
}

function cerrarMenu({ devolverFoco = false } = {}) {
  botonMenu.setAttribute("aria-expanded", "false");
  botonMenu.setAttribute("aria-label", "Abrir menú");
  menuPrincipal.classList.remove("abierta");

  if (devolverFoco) {
    botonMenu.focus();
  }
}

if (cabecera && botonMenu && menuPrincipal) {
  botonMenu.setAttribute("aria-label", "Abrir menú");

  botonMenu.addEventListener("click", () => {
    if (menuEstaAbierto()) {
      cerrarMenu({ devolverFoco: true });
    } else {
      abrirMenu();
    }
  });

  /* Escape cierra el menú y devuelve el foco al botón */
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && menuEstaAbierto()) {
      cerrarMenu({ devolverFoco: true });
    }
  });

  /* Al elegir una sección, se cierra el menú */
  menuPrincipal.addEventListener("click", (evento) => {
    if (evento.target.closest("a") && consultaMovil.matches) {
      cerrarMenu();
    }
  });

  /* Si el foco sale de la cabecera (tabulando), se cierra */
  cabecera.addEventListener("focusout", (evento) => {
    if (
      menuEstaAbierto() &&
      evento.relatedTarget &&
      !cabecera.contains(evento.relatedTarget)
    ) {
      cerrarMenu();
    }
  });

  /* Clic fuera de la cabecera */
  document.addEventListener("click", (evento) => {
    if (menuEstaAbierto() && !cabecera.contains(evento.target)) {
      cerrarMenu();
    }
  });

  /* Al pasar a escritorio, se restablece el estado */
  consultaMovil.addEventListener("change", (evento) => {
    if (!evento.matches && menuEstaAbierto()) {
      cerrarMenu();
    }
  });
}

/* =====================================================
   NAVEGACIÓN: SECCIÓN ACTIVA
   ===================================================== */

const enlacesSeccion = document.querySelectorAll(
  '.enlaces-navegacion a[href^="#"]',
);

if ("IntersectionObserver" in window && enlacesSeccion.length) {
  const mapaEnlaces = new Map();

  enlacesSeccion.forEach((enlace) => {
    const seccion = document.querySelector(enlace.getAttribute("href"));
    if (seccion) {
      mapaEnlaces.set(seccion, enlace);
    }
  });

  const marcarActivo = (enlaceActivo) => {
    enlacesSeccion.forEach((enlace) => {
      if (enlace === enlaceActivo) {
        enlace.setAttribute("aria-current", "true");
      } else {
        enlace.removeAttribute("aria-current");
      }
    });
  };

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          marcarActivo(mapaEnlaces.get(entrada.target));
        }
      });
    },
    /* Una franja estrecha en el tercio superior de la pantalla */
    { rootMargin: "-30% 0px -65% 0px" },
  );

  mapaEnlaces.forEach((_, seccion) => observador.observe(seccion));

  /* En la portada no se marca ninguna sección */
  const portada = document.querySelector("#inicio");
  if (portada) {
    new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          marcarActivo(null);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    ).observe(portada);
  }
}

/* =====================================================
   BLOG
   ===================================================== */

/*
 * Para publicar una entrada nueva:
 *
 * 1. Copia uno de estos objetos.
 * 2. Pégalo dentro del array.
 * 3. Cambia sus datos.
 *
 * Las notas se abren dentro de la web.
 * Los vídeos abren su enlace en otra pestaña.
 */
const publicacionesBlog = [
  {
    tipo: "nota",
    fecha: "2026-05-28",
    titulo: "Cinco señales de alerta durante las comidas",
    resumen:
      "Toser, tardar demasiado o cambiar la voz después de beber pueden indicar dificultades de deglución.",
    contenido: [
      "Observar cómo come una persona ayuda a detectar cambios importantes. La tos frecuente, los atragantamientos, una voz húmeda o el cansancio durante las comidas merecen atención.",
      "Ante estas señales, una valoración profesional permite conocer la causa y adaptar la alimentación de forma segura.",
    ],
    imagen: "images/web/comida2-800.webp", // original: images/comida2.jpg
  },
  {
    tipo: "video",
    fecha: "2026-05-14",
    titulo: "Cómo preparar una comida adaptada y apetecible",
    resumen:
      "Un recurso visual con ideas para cuidar la textura, la presentación y el disfrute al comer.",
    enlace: "https://www.instagram.com/p/DXj73BJIwM6/",
    imagen: "images/web/comida1-800.webp", // original: images/comida1.jpg
  },
  {
    tipo: "nota",
    fecha: "2026-04-30",
    titulo: "La postura también importa al tragar",
    resumen:
      "Pequeños ajustes antes y durante la comida pueden ayudar a comer con más comodidad y seguridad.",
    contenido: [
      "Siempre que sea posible, conviene comer sentado, con el tronco estable y los pies apoyados. La cabeza debe mantenerse alineada, evitando echarla hacia atrás.",
      "Cada persona necesita pautas adaptadas a su caso. Estas recomendaciones generales no sustituyen una valoración logopédica.",
    ],
    imagen: "images/comida3.jpg",
  },
];

const contenedorBlog = document.querySelector("#entradas-blog");
const filtrosBlog = document.querySelectorAll(".filtro-blog");

const formatoFecha = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/*
 * Recibe los datos de una publicación y crea el HTML
 * correspondiente a su tarjeta.
 */
function crearEntradaBlog(publicacion, indice) {
  const esVideo = publicacion.tipo === "video";

  /*
   * Los vídeos son enlaces externos (avisamos de la pestaña nueva).
   * Las notas son botones que despliegan el contenido en la página.
   */
  const etiquetaApertura = esVideo ? "a" : "button";

  const atributosEnlace = esVideo
    ? `href="${publicacion.enlace}" target="_blank" rel="noopener noreferrer"`
    : `type="button" data-abrir-nota="${indice}" aria-expanded="false" aria-controls="detalle-blog-${indice}"`;

  const avisoPestana = esVideo
    ? '<span class="solo-lectores"> (se abre en una pestaña nueva)</span>'
    : "";

  const detalle = esVideo
    ? ""
    : `
      <div
        class="detalle-entrada"
        id="detalle-blog-${indice}"
        hidden
      >
        ${publicacion.contenido
          .map((parrafo) => `<p>${parrafo}</p>`)
          .join("")}
      </div>
    `;

  return `
    <article class="entrada-blog">
      <img
        class="imagen-entrada"
        src="${publicacion.imagen}"
        alt=""
        width="800"
        height="500"
        loading="lazy"
        decoding="async"
      />

      <div class="contenido-entrada">
        <div class="metadatos-entrada">
          <span class="tipo-entrada">
            ${esVideo ? "Vídeo" : "Nota"}
          </span>

          <span aria-hidden="true">·</span>

          <time datetime="${publicacion.fecha}">
            ${formatoFecha.format(new Date(publicacion.fecha))}
          </time>
        </div>

        <h3>${publicacion.titulo}</h3>

        <p>${publicacion.resumen}</p>

        <${etiquetaApertura} class="enlace-entrada" ${atributosEnlace}>
          <span>${esVideo ? "Ver vídeo" : "Leer nota"}</span>${avisoPestana}

          <i
            class="fa-solid ${
              esVideo ? "fa-circle-play" : "fa-arrow-right"
            }"
            aria-hidden="true"
          ></i>
        </${etiquetaApertura}>

        ${detalle}
      </div>
    </article>
  `;
}

/*
 * Ordena las publicaciones por fecha y aplica el filtro
 * seleccionado: todos, nota o video.
 */
function mostrarPublicaciones(filtro = "todos") {
  if (!contenedorBlog) {
    return;
  }

  const publicacionesOrdenadas = publicacionesBlog
    .map((publicacion, indice) => ({
      ...publicacion,
      indice,
    }))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .filter(
      (publicacion) =>
        filtro === "todos" || publicacion.tipo === filtro,
    );

  contenedorBlog.innerHTML = publicacionesOrdenadas
    .map((publicacion) =>
      crearEntradaBlog(publicacion, publicacion.indice),
    )
    .join("");
}

/*
 * Escuchamos los clics en los botones del filtro.
 */
filtrosBlog.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtrosBlog.forEach((filtro) => {
      filtro.classList.remove("activo");
      filtro.setAttribute("aria-pressed", "false");
    });

    boton.classList.add("activo");
    boton.setAttribute("aria-pressed", "true");

    mostrarPublicaciones(boton.dataset.filtro);
  });
});

/*
 * Abrimos o cerramos el contenido de una nota.
 */
if (contenedorBlog) {
  contenedorBlog.addEventListener("click", (evento) => {
    const enlace = evento.target.closest("[data-abrir-nota]");

    if (!enlace) {
      return;
    }

    evento.preventDefault();

    const indiceNota = enlace.dataset.abrirNota;

    const detalle = document.querySelector(
      `#detalle-blog-${indiceNota}`,
    );

    if (!detalle) {
      return;
    }

    const estaAbierto = !detalle.hidden;

    detalle.hidden = estaAbierto;

    enlace.setAttribute(
      "aria-expanded",
      String(!estaAbierto),
    );

    enlace.querySelector("span").textContent = estaAbierto
      ? "Leer nota"
      : "Cerrar nota";
  });
}

/*
 * Mostramos todas las publicaciones al cargar la página.
 */
mostrarPublicaciones();

/* =====================================================
   FORMULARIO DE CONTACTO
   ===================================================== */

const formulario = document.querySelector(".formulario-contacto");
const inputNombre = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const inputMensaje = document.querySelector("#mensaje");
const contadorMensaje = document.querySelector("#contador-mensaje");

const mensajeFormulario = document.querySelector(
  "#mensaje-formulario",
);

const limiteCaracteres = 300;

/*
 * Actualizamos el contador cada vez que el usuario
 * escribe o borra en el textarea.
 */
if (inputMensaje && contadorMensaje) {
  inputMensaje.addEventListener("input", () => {
    const caracteresEscritos = inputMensaje.value.length;

    contadorMensaje.textContent =
      `Caracteres: ${caracteresEscritos}/${limiteCaracteres}`;

    contadorMensaje.classList.toggle(
      "aviso",
      caracteresEscritos >= limiteCaracteres,
    );
  });
}

/*
 * Controlamos el envío del formulario.
 */
if (
  formulario &&
  inputNombre &&
  inputEmail &&
  inputMensaje &&
  mensajeFormulario
) {
  formulario.addEventListener("submit", async (evento) => {
    /*
     * Evita el envío tradicional y la recarga de la página.
     */
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const mensaje = inputMensaje.value.trim();

    const botonEnviar = formulario.querySelector(
      'button[type="submit"]',
    );

    limpiarResultadoFormulario();

    /*
     * Comprobamos que ningún campo esté vacío.
     */
    if (nombre === "" || email === "" || mensaje === "") {
      mostrarResultadoFormulario(
        "Por favor, completa todos los campos.",
        "error",
      );

      return;
    }

    /*
     * Comprobamos que el correo tenga un formato válido.
     */
    if (!inputEmail.validity.valid) {
      mostrarResultadoFormulario(
        "Introduce una dirección de correo válida.",
        "error",
      );

      return;
    }

    /*
     * Comprobamos el límite del mensaje.
     */
    if (mensaje.length > limiteCaracteres) {
      mostrarResultadoFormulario(
        "El mensaje excede el límite de 300 caracteres.",
        "error",
      );

      return;
    }

    try {
      /*
       * Desactivamos el botón mientras se realiza el envío.
       */
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";

      /*
       * Recogemos los datos introducidos en el formulario.
       */
      const datosFormulario = new FormData(formulario);

      /*
       * Enviamos la información a Netlify.
       */
      const respuesta = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(datosFormulario).toString(),
      });

      /*
       * Si Netlify responde con un error, saltamos al catch.
       */
      if (!respuesta.ok) {
        throw new Error(
          `Error en el envío: ${respuesta.status}`,
        );
      }

      mostrarResultadoFormulario(
        "¡Mensaje enviado correctamente! Me pondré en contacto contigo.",
        "exito",
      );

      /*
       * Vaciamos el formulario y reiniciamos el contador.
       */
      formulario.reset();

      contadorMensaje.textContent =
        `Caracteres: 0/${limiteCaracteres}`;

      contadorMensaje.classList.remove("aviso");
    } catch (error) {
      console.error(error);

      mostrarResultadoFormulario(
        "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
        "error",
      );
    } finally {
      /*
       * Este código se ejecuta tanto si funciona como si falla.
       */
      botonEnviar.disabled = false;

      botonEnviar.innerHTML = `
        <i
          class="fa-solid fa-paper-plane"
          aria-hidden="true"
        ></i>
        Enviar mensaje
      `;
    }
  });
}

/*
 * Elimina los mensajes anteriores.
 */
function limpiarResultadoFormulario() {
  mensajeFormulario.textContent = "";

  mensajeFormulario.classList.remove(
    "error",
    "exito",
  );
}

/*
 * Muestra un mensaje de error o de éxito.
 */
function mostrarResultadoFormulario(texto, tipo) {
  mensajeFormulario.textContent = texto;

  mensajeFormulario.classList.remove(
    "error",
    "exito",
  );

  mensajeFormulario.classList.add(tipo);
}