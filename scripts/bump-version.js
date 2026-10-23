const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.version === '1.0.0') {
  pkg.version = '1.1.0';
  console.log('🚀 Versión actualizada de 1.0.0 a 1.1.0 (Demostración Happy Path)');
} else {
  pkg.version = '1.0.0';
  console.log('🔄 Versión reseteada a 1.0.0');
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
