const fs = require('fs');
const path = require('path');

const testPath = path.join(__dirname, '..', 'tests', 'health.test.js');
let content = fs.readFileSync(testPath, 'utf8');

if (content.includes("expect(res.body.status).toBe('unhealthy_failure');")) {
  content = content.replace(
    "// [SIMULACIÓN ERROR DE CALIDAD - MIRIAM]\n    expect(res.body.status).toBe('unhealthy_failure');",
    "expect(res.body.status).toBe('healthy');"
  );
  fs.writeFileSync(testPath, content, 'utf8');
  console.log('✅ Test restaurado a estado saludable en tests/health.test.js');
  console.log('👉 Ejecuta "npm test" y comprobarás que el Quality Gate vuelve a pasar en verde.');
} else {
  console.log('ℹ️ El test ya se encuentra en estado saludable.');
}
