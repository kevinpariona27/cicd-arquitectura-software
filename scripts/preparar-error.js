const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rama = 'error-demo';

console.log(`==========================================================`);
console.log(`[ESCENARIO 2] INYECTANDO ERROR DELIBERADO EN RAMA ${rama}`);
console.log(`==========================================================`);

try {
  execSync('git checkout main', { stdio: 'inherit' });
  try { execSync('git pull --ff-only', { stdio: 'inherit' }); } catch (e) {}

  // Crear o reiniciar la rama error-demo
  try {
    execSync(`git checkout -B ${rama}`, { stdio: 'inherit' });
  } catch (e) {
    execSync(`git checkout -b ${rama}`, { stdio: 'inherit' });
  }

  // Inyectar el fallo en src/app.js: cambiar * 100 por * 10
  const appPath = path.join(__dirname, '..', 'src', 'app.js');
  let content = fs.readFileSync(appPath, 'utf8');
  content = content.replace('(presentes / total) * 100', '(presentes / total) * 10');
  fs.writeFileSync(appPath, content, 'utf8');

  execSync('git commit -am "Cambio con error (demo del quality gate)"', { stdio: 'inherit' });
  execSync(`git push -u --force origin ${rama}`, { stdio: 'inherit' });

  // Crear o reportar Pull Request
  const prCmd = `gh pr create --base main --head ${rama} --title "Cambio con error (demo del quality gate)" --body "Este PR tiene un error a proposito. Las pruebas deben fallar y el merge debe quedar bloqueado. NO FUSIONAR."`;
  try {
    execSync(prCmd, { stdio: 'inherit' });
  } catch (err) {
    console.log('El Pull Request ya existia; se actualizo con el nuevo commit.');
  }

  // Regresar a main
  execSync('git checkout main', { stdio: 'inherit' });

  console.log(`\n==========================================================`);
  console.log(`[LISTO] ESCENARIO 2 PREPARADO`);
  console.log(`- En la pestana Pull requests de GitHub veras el check 'test' en ROJO.`);
  console.log(`- El boton de Merge quedara BLOQUEADO por el Quality Gate.`);
  console.log(`==========================================================`);
} catch (error) {
  console.error('Error durante la ejecucion:', error.message);
  process.exit(1);
}
