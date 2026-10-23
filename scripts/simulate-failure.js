const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '..', 'tests', 'health.test.js');
let content = fs.readFileSync(testPath, 'utf8');

if (content.includes("expect(res.body.status).toBe('healthy');")) {
  content = content.replace(
    "expect(res.body.status).toBe('healthy');",
    "// [SIMULACIÓN ERROR DE CALIDAD - MIRIAM]\n    expect(res.body.status).toBe('unhealthy_failure');"
  );
  fs.writeFileSync(testPath, content, 'utf8');
  console.log('❌ Error deliberado inyectado en tests/health.test.js');
  console.log('👉 Ejecuta "npm test" o haz "git commit" y "git push" para ver fallar el Quality Gate en rojo.');
} else {
  console.log('ℹ️ El test ya contiene un fallo inducido.');
}
