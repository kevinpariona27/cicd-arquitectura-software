const express = require('express');
const router = express.Router();
const { getDoraMetrics, getSystemMetrics } = require('../services/metrics');

/**
 * Endpoint de Métricas DORA (/api/dora)
 * Responsable: Pozo (DevSecOps & Métricas DORA)
 */
router.get('/', (req, res) => {
  const metrics = getDoraMetrics();
  const system = getSystemMetrics();

  res.status(200).json({
    framework: 'DORA (DevOps Research and Assessment)',
    systemPerformance: 'Elite Performer',
    metrics,
    system
  });
});

module.exports = router;
