import fs from "node:fs";
import path from "node:path";

// Escribe la tabla de resultados (ID, script, Pass/Fail, tiempo) en
// cypress/results/ al terminar la corrida. El pipeline la publica en el
// Job Summary de GitHub Actions y la guarda como artefacto.
function escribirResultados(results) {
  const dir = path.resolve("cypress/results");
  fs.mkdirSync(dir, { recursive: true });

  const filas = [];
  for (const run of results?.runs ?? []) {
    const script = path.basename(run.spec.relative);
    for (const t of run.tests ?? []) {
      const titulo = t.title[t.title.length - 1];
      const [id, ...resto] = titulo.split(" | ");
      const ms =
        t.duration ??
        (t.attempts ?? []).reduce((acc, a) => acc + (a.wallClockDuration ?? 0), 0);
      filas.push({
        id: resto.length ? id.trim() : "-",
        caso: resto.length ? resto.join(" | ") : titulo,
        script,
        resultado: t.state === "passed" ? "Pass" : t.state === "failed" ? "Fail" : t.state,
        segundos: Number((ms / 1000).toFixed(2)),
      });
    }
  }

  const pass = filas.filter((f) => f.resultado === "Pass").length;
  const total = filas.length;
  const totalSeg = filas.reduce((a, f) => a + f.segundos, 0).toFixed(2);

  const md = [
    "## Resultados de automatización E2E (Cypress)",
    "",
    "| ID caso | Caso | Script | Resultado | Tiempo (s) |",
    "|---|---|---|---|---|",
    ...filas.map(
      (f) => `| ${f.id} | ${f.caso} | ${f.script} | ${f.resultado === "Pass" ? "✅ Pass" : "❌ " + f.resultado} | ${f.segundos} |`
    ),
    "",
    `**Total:** ${pass}/${total} Pass · **Tiempo total de casos:** ${totalSeg} s`,
    "",
  ].join("\n");

  fs.writeFileSync(path.join(dir, "resultados.json"), JSON.stringify(filas, null, 2));
  fs.writeFileSync(path.join(dir, "resultados.md"), md);
}

// Objeto de configuración plano: Cypress se ejecuta con npx en el CI y no
// está instalado como dependencia, así que no se importa defineConfig.
export default {
  e2e: {
    baseUrl: "http://127.0.0.1:5173",
    supportFile: false,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    setupNodeEvents(on) {
      on("after:run", escribirResultados);
    },
  },
};
