const express = require('express');
const router = express.Router();
const packageJson = require('../../package.json');
const { getSystemMetrics } = require('../services/metrics');

/**
 * Health Check Endpoint (/health)
 * Responsable: Miriam (Resiliencia & Release Patterns)
 * Permite a orquestadores de nube (Render, Railway, Kubernetes, ALBs)
 * verificar la vitalidad (liveness/readiness) del contenedor antes de enrutar tráfico.
 */
router.get('/', (req, res) => {
  const metrics = getSystemMetrics();

  const healthData = {
    status: 'healthy',
    service: 'software-architecture-ci-cd-demo',
    version: packageJson.version, // En la Demo cambia de 1.0.0 a 1.1.0
    environment: metrics.environment,
    uptime: metrics.uptimeFormatted,
    uptimeSeconds: metrics.uptimeSeconds,
    memoryUsageMB: metrics.memoryUsageMB,
    timestamp: new Date().toISOString(),
    qualityGateStatus: 'PASSED',
    checks: {
      api: 'UP',
      database_connection: 'UP (simulated)',
      memory: 'HEALTHY'
    }
  };

  res.status(200).json(healthData);
});

module.exports = router;
