const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const nuevaVersion = process.argv[2] || '1.1.0';
const rama = `version-${nuevaVersion.replace(/\./g, '-')}`;

console.log(`==========================================================`);
console.log(`[ESCENARIO 1] PREPARANDO CAMBIO DE VERSION A ${nuevaVersion}`);
console.log(`==========================================================`);

try {
  execSync('git checkout main', { stdio: 'inherit' });
  try { execSync('git pull --ff-only', { stdio: 'inherit' }); } catch (e) { /* ignore if already up to date */ }
  
  // Crear o cambiar a la rama
  try {
    execSync(`git checkout -b ${rama}`, { stdio: 'inherit' });
  } catch (e) {
    execSync(`git checkout ${rama}`, { stdio: 'inherit' });
  }

  // Actualizar package.json
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.version = nuevaVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

  // Actualizar package-lock.json si existe
  const lockPath = path.join(__dirname, '..', 'package-lock.json');
  if (fs.existsSync(lockPath)) {
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    lock.version = nuevaVersion;
    if (lock.packages && lock.packages['']) lock.packages[''].version = nuevaVersion;
    fs.writeFileSync(lockPath, JSON.stringify(lock, null, 2) + '\n', 'utf8');
  }

  execSync(`git commit -am "Version ${nuevaVersion}"`, { stdio: 'inherit' });
  execSync(`git push -u origin ${rama}`, { stdio: 'inherit' });

  // Crear Pull Request con gh
  const prCmd = `gh pr create --base main --head ${rama} --title "Version ${nuevaVersion}" --body "Cambio de version para la demo del camino feliz."`;
  try {
    execSync(prCmd, { stdio: 'inherit' });
  } catch (err) {
    console.log('El Pull Request ya existia o fue actualizado.');
  }

  console.log(`\n==========================================================`);
  console.log(`[EXITO] PULL REQUEST CREADO EN GITHUB`);
  console.log(`- En GitHub Actions veras ejecutandose el check 'test'.`);
  console.log(`- Cuando termine en verde, ejecuta: 2_FUSIONAR_PR.bat`);
  console.log(`==========================================================`);
} catch (error) {
  console.error('Error durante la ejecucion:', error.message);
  process.exit(1);
}
