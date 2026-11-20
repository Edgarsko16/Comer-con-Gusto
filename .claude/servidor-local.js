// Servidor de desarrollo local para Comer con Gusto (solo para la vista previa).
// Sin dependencias: Node 18+. Uso: node .claude/servidor-local.js [puerto]
// Recarga el navegador al guardar HTML, CSS o JS. El script de recarga se
// inyecta solo en las respuestas de este servidor; los archivos no cambian.
const http = require("http");
const fs = require("fs");
const path = require("path");

const raiz = path.resolve(__dirname, "..");
const puerto = Number(process.argv[2] || 8080);
const tipos = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".jpg": "image/jpeg",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ico": "image/x-icon",
};
const clientes = new Set();
const scriptRecarga =
  '<script>new EventSource("/__recarga").onmessage=()=>location.reload();</script>';

http.createServer((req, res) => {
  const ruta = decodeURIComponent(new URL(req.url, "http://x").pathname);

  if (ruta === "/__recarga") {
    res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" });
    res.write(": conectado\n\n");
    clientes.add(res);
    req.on("close", () => clientes.delete(res));
    return;
  }

  let archivo = path.join(raiz, ruta);
  // Como en Netlify (_redirects): nada fuera del proyecto, ni carpetas
  // ocultas (.git, .claude), ni la documentación interna
  const relativa = path.relative(raiz, archivo);
  const partes = relativa.split(path.sep);
  if (relativa.startsWith("..") || partes[0] === "docs-internos" || partes.some((p) => p.startsWith("."))) {
    res.writeHead(404); return res.end("404");
  }
  if (ruta.endsWith("/")) archivo = path.join(archivo, "index.html");
  else if (fs.existsSync(archivo) && fs.statSync(archivo).isDirectory()) {
    res.writeHead(301, { Location: ruta + "/" }); return res.end();
  }

  fs.readFile(archivo, (err, datos) => {
    if (err) { res.writeHead(404); return res.end("404"); }
    const ext = path.extname(archivo);
    res.writeHead(200, { "Content-Type": tipos[ext] || "application/octet-stream", "Cache-Control": "no-store" });
    if (ext === ".html") return res.end(datos.toString("utf8").replace("</body>", scriptRecarga + "</body>"));
    res.end(datos);
  });
}).listen(puerto, "127.0.0.1", () => console.log(`Comer con Gusto en http://127.0.0.1:${puerto}/`));

// Avisa a los navegadores abiertos cuando cambia un archivo de la web
let espera;
fs.watch(raiz, { recursive: true }, (_evento, nombre) => {
  if (!nombre || /^\.|[\\/]\./.test(nombre) || !/\.(html|css|js)$/.test(nombre)) return;
  clearTimeout(espera);
  espera = setTimeout(() => clientes.forEach((c) => c.write("data: recarga\n\n")), 150);
});
