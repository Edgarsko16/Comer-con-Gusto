const instagramLink = document.querySelector('a[href*="instagram.com"]');

if (instagramLink) {
  instagramLink.addEventListener("click", () => {
    console.log("Usuario visitó el Instagram");
  });
}

/*
 * Para publicar una entrada nueva, copia uno de estos objetos y colócalo al
 * principio de la lista. Las notas se leen aquí y los vídeos abren su enlace.
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
    imagen: "images/comida2.jpg",
  },
  {
    tipo: "video",
    fecha: "2026-05-14",
    titulo: "Cómo preparar una comida adaptada y apetecible",
    resumen:
      "Un recurso visual con ideas para cuidar la textura, la presentación y el disfrute al comer.",
    enlace: "https://www.instagram.com/p/DXj73BJIwM6/",
    imagen: "images/comida1.jpg",
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

function crearEntradaBlog(publicacion, indice) {
  const esVideo = publicacion.tipo === "video";
  const atributosEnlace = esVideo
    ? `href="${publicacion.enlace}" target="_blank" rel="noopener"`
    : `href="#detalle-blog-${indice}" data-abrir-nota="${indice}" aria-expanded="false"`;
  const detalle = esVideo
    ? ""
    : `<div class="detalle-entrada" id="detalle-blog-${indice}" hidden>
        ${publicacion.contenido.map((parrafo) => `<p>${parrafo}</p>`).join("")}
      </div>`;

  return `
    <article class="entrada-blog">
      <img class="imagen-entrada" src="${publicacion.imagen}" alt="" loading="lazy" />
      <div class="contenido-entrada">
        <div class="metadatos-entrada">
          <span class="tipo-entrada">${esVideo ? "Vídeo" : "Nota"}</span>
          <span aria-hidden="true">·</span>
          <time datetime="${publicacion.fecha}">
            ${formatoFecha.format(new Date(publicacion.fecha))}
          </time>
        </div>
        <h3>${publicacion.titulo}</h3>
        <p>${publicacion.resumen}</p>
        <a class="enlace-entrada" ${atributosEnlace}>
          <span>${esVideo ? "Ver vídeo" : "Leer nota"}</span>
          <i class="fa-solid ${esVideo ? "fa-circle-play" : "fa-arrow-right"}" aria-hidden="true"></i>
        </a>
        ${detalle}
      </div>
    </article>
  `;
}

function mostrarPublicaciones(filtro = "todos") {
  if (!contenedorBlog) return;

  const publicacionesOrdenadas = publicacionesBlog
    .map((publicacion, indice) => ({ ...publicacion, indice }))
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .filter((publicacion) => filtro === "todos" || publicacion.tipo === filtro);

  contenedorBlog.innerHTML = publicacionesOrdenadas
    .map((publicacion) => crearEntradaBlog(publicacion, publicacion.indice))
    .join("");
}

filtrosBlog.forEach((boton) => {
  boton.addEventListener("click", () => {
    filtrosBlog.forEach((filtro) => filtro.classList.remove("activo"));
    boton.classList.add("activo");
    mostrarPublicaciones(boton.dataset.filtro);
  });
});

contenedorBlog?.addEventListener("click", (evento) => {
  const enlace = evento.target.closest("[data-abrir-nota]");
  if (!enlace) return;

  evento.preventDefault();
  const detalle = document.querySelector(`#detalle-blog-${enlace.dataset.abrirNota}`);
  const estaAbierto = !detalle.hidden;

  detalle.hidden = estaAbierto;
  enlace.setAttribute("aria-expanded", String(!estaAbierto));
  enlace.querySelector("span").textContent = estaAbierto ? "Leer nota" : "Cerrar nota";
});

mostrarPublicaciones();
