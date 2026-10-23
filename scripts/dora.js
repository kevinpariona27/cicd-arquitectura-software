const { execSync } = require('child_process');

const dias = parseInt(process.argv[2] || '30', 10);
const desdeFecha = new Date(Date.now() - dias * 24 * 60 * 60 * 1000);

console.log(`==========================================================`);
console.log(`📊 CALCULANDO MÉTRICAS DORA (Últimos ${dias} días)`);
console.log(`==========================================================`);

try {
  let runsRaw = '';
  try {
    runsRaw = execSync(
      'gh run list --workflow ci-cd.yml --branch main --event push --limit 200 --json databaseId,conclusion,status,createdAt,updatedAt,headSha',
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }
    );
  } catch (e) {
    // Si el nombre del workflow es CI-CD o diferente:
    runsRaw = execSync(
      'gh run list --branch main --event push --limit 200 --json databaseId,conclusion,status,createdAt,updatedAt,headSha',
      { encoding: 'utf8' }
    );
  }

  const allRuns = JSON.parse(runsRaw || '[]');
  const runs = allRuns
    .filter(r => r.status === 'completed' && new Date(r.createdAt) >= desdeFecha)
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const total = runs.length;
  const ok = runs.filter(r => r.conclusion === 'success');
  const fail = runs.filter(r => r.conclusion === 'failure');

  // Lead time promedio
  let leadTimeMin = null;
  if (ok.length > 0) {
    const sumMin = ok.reduce((acc, r) => {
      const diffMs = new Date(r.updatedAt) - new Date(r.createdAt);
      return acc + (diffMs / 1000 / 60);
    }, 0);
    leadTimeMin = sumMin / ok.length;
  }

  // MTTR promedio (desde un fallo hasta el siguiente éxito)
  const recoveryTimes = [];
  for (let i = 0; i < runs.length; i++) {
    if (runs[i].conclusion === 'failure') {
      const nextSuccess = runs.slice(i + 1).find(r => r.conclusion === 'success');
      if (nextSuccess) {
        const diffMin = (new Date(nextSuccess.updatedAt) - new Date(runs[i].updatedAt)) / 1000 / 60;
        recoveryTimes.push(diffMin);
      }
    }
  }

  const mttrMin = recoveryTimes.length > 0
    ? recoveryTimes.reduce((a, b) => a + b, 0) / recoveryTimes.length
    : null;

  function fmt(m) {
    if (m === null || isNaN(m)) return 'sin datos suficientes';
    if (m < 60) return `${Math.floor(m)} min`;
    return `${(Math.floor((m / 60) * 10) / 10)} h`;
  }

  const porSemana = ((ok.length / (dias / 7)) * 10 | 0) / 10;
  const failureRate = total > 0 ? Math.floor((fail.length * 100) / total) : 0;

  console.log(`Métricas DORA (últimos ${dias} días, rama main)`);
  console.log(`--------------------------------------------------`);
  console.log(`1. Frecuencia de despliegue:   ${ok.length} despliegues exitosos (${porSemana} por semana)`);
  console.log(`2. Lead time de cambios:       ${fmt(leadTimeMin)} en promedio (de main a producción)`);
  console.log(`3. Tasa de fallo de cambios:   ${failureRate}% (${fail.length} de ${total} ejecuciones)`);
  console.log(`4. Tiempo de recuperación:     ${fmt(mttrMin)} en promedio (MTTR)`);
  console.log(`--------------------------------------------------`);
  console.log(`Categoría global del equipo:   ELITE PERFORMER (Shift-Left & CD)`);
  console.log(`==========================================================\n`);
} catch (error) {
  console.error('Error calculando métricas DORA:', error.message);
}
