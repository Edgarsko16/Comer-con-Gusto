/* =====================================================
   SESIONES ONLINE
   Muestra el botón «Entrar a mi consulta» según config.js.
   No recoge ni guarda datos del paciente.
   ===================================================== */

(function () {
  const config = window.CONFIG_SESIONES || {};
  const acceso = document.querySelector("#acceso-consulta");

  if (!acceso) {
    return;
  }

  const TELEFONO = '<a href="tel:+34611959825">611 95 98 25</a>';

  /* Código de reunión de Google Meet: abc-defg-hij */
  const PATRON_CODIGO_MEET = /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/;

  /*
   * Solo aceptamos enlaces https de meet.google.com con un código
   * de reunión. Se descartan parámetros adicionales: el paciente
   * siempre llega al enlace limpio.
   */
  function validarUrlSala(texto) {
    if (typeof texto !== "string" || texto.trim() === "") {
      return { valida: false, motivo: "vacia" };
    }

    let url;
    try {
      url = new URL(texto.trim());
    } catch {
      return { valida: false, motivo: "formato" };
    }

    if (
      url.protocol !== "https:" ||
      url.hostname !== "meet.google.com" ||
      !PATRON_CODIGO_MEET.test(url.pathname)
    ) {
      return { valida: false, motivo: "formato" };
    }

    const codigo = url.pathname.replace(/\//g, "");
    return { valida: true, href: `https://meet.google.com/${codigo}` };
  }

  function mostrarAviso(motivo) {
    const texto =
      motivo === "vacia"
        ? "La consulta online todavía no está disponible."
        : "Ahora mismo no podemos abrir la consulta online.";

    acceso.innerHTML = `
      <p class="aviso-sesion">
        ${texto}
        Para tu sesión, llama a Rebeca al ${TELEFONO}.
      </p>
    `;

    /* Aviso solo para quien mantiene la web (consola del navegador) */
    if (motivo === "formato") {
      console.error(
        "config.js: urlSala debe ser un enlace como https://meet.google.com/abc-defg-hij",
      );
    }
  }

  function crearBotonEnlace(href) {
    const enlace = document.createElement("a");
    enlace.className = "boton-principal boton-consulta";
    enlace.href = href;
    enlace.rel = "noopener noreferrer";
    enlace.innerHTML = `
      <i class="fa-solid fa-video" aria-hidden="true"></i>
      <span>Entrar a mi consulta</span>
    `;

    const nota = document.createElement("p");
    nota.className = "nota-boton";
    nota.id = "nota-boton-consulta";
    nota.textContent =
      "Al pulsar, pasarás a la videollamada de Rebeca en Google Meet.";

    enlace.setAttribute("aria-describedby", nota.id);

    acceso.replaceChildren(enlace, nota);
  }

  const resultado = validarUrlSala(config.urlSala);

  if (resultado.valida) {
    crearBotonEnlace(resultado.href);
  } else {
    mostrarAviso(resultado.motivo);
  }
})();
