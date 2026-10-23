const express = require('express');
const router = express.Router();
const packageJson = require('../../package.json');

/**
 * Metadata Endpoint (/api/info)
 * Provee información sobre la arquitectura, atributos de calidad y roles del equipo.
 */
router.get('/', (req, res) => {
  res.status(200).json({
    course: 'Arquitectura de Software',
    career: 'Ingeniería de Sistemas',
    topic: 'CI/CD: Continuous Integration & Continuous Delivery/Deployment',
    version: packageJson.version,
    team: [
      { name: 'Kevin', role: 'Líder DevOps & Pipeline as Code', chapter: 'Cap. 1: Fundamentos de CI/CD' },
      { name: 'Pool', role: 'Calidad & Shift-Left Testing', chapter: 'Cap. 2: Quality Gates y Estrategia de Pruebas' },
      { name: 'Zaga', role: 'Contenedores & Artefactos', chapter: 'Cap. 3: Inmutabilidad y Contenedores Docker' },
      { name: 'Verton', role: 'Despliegue Continuo (CD)', chapter: 'Cap. 4: Continuous Delivery vs Deployment y Cloud' },
      { name: 'Miriam', role: 'Resiliencia & Release Patterns', chapter: 'Cap. 5: Patrones de Release y Health Checks' },
      { name: 'Pozo', role: 'DevSecOps & Métricas DORA', chapter: 'Cap. 6: Seguridad Continua y Métricas DORA' }
    ],
    architecturalAttributes: [
      {
        attribute: 'Desplegabilidad (Deployability)',
        description: 'Capacidad de poner incrementos de software en producción de manera predecible y automatizada.'
      },
      {
        attribute: 'Modificabilidad y Testabilidad',
        description: 'Shift-Left Testing con suites de pruebas automáticas que evitan degradación arquitectónica.'
      },
      {
        attribute: 'Disponibilidad y Tolerancia a Fallos',
        description: 'Health Checks (/health), Rollback automático y Zero-Downtime Releases.'
      },
      {
        attribute: 'Seguridad Arquitectónica (DevSecOps)',
        description: 'Quality Gates con SAST y escaneo de vulnerabilidades con Trivy antes de la entrega.'
      }
    ]
  });
});

module.exports = router;
