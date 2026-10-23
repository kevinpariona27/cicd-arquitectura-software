const startTime = Date.now();

/**
 * Servicio de métricas del sistema y métricas DORA
 * (Capítulo 6 - DevSecOps y Métricas DORA - Pozo)
 */
function getSystemMetrics() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const memoryUsage = process.memoryUsage();

  return {
    uptimeSeconds,
    uptimeFormatted: formatUptime(uptimeSeconds),
    memoryUsageMB: {
      rss: (memoryUsage.rss / 1024 / 1024).toFixed(2),
      heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
      heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2)
    },
    nodeVersion: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || 'production'
  };
}

/**
 * Las 4 Métricas DORA (DevOps Research and Assessment)
 * Representan el rendimiento de entrega de software de alto impacto
 */
function getDoraMetrics() {
  return {
    deploymentFrequency: {
      metric: "Deployment Frequency",
      value: "Múltiples despliegues diarios (Bajo demanda)",
      level: "Elite",
      description: "Frecuencia con la que el código se despliega con éxito en producción tras pasar el pipeline."
    },
    leadTimeForChanges: {
      metric: "Lead Time for Changes",
      value: "< 4 minutos",
      level: "Elite",
      description: "Tiempo transcurrido desde el commit en GitHub hasta el despliegue automático en la nube."
    },
    changeFailureRate: {
      metric: "Change Failure Rate",
      value: "0% - 5%",
      level: "Elite",
      description: "Porcentaje de despliegues que causan degradación en producción (mitigado por Quality Gates)."
    },
    meanTimeToRestore: {
      metric: "Mean Time to Recovery (MTTR)",
      value: "< 2 minutos",
      level: "Elite",
      description: "Tiempo promedio de recuperación mediante Rollback automatizado gobernado por Health Checks."
    }
  };
}

function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
}

module.exports = {
  getSystemMetrics,
  getDoraMetrics,
  formatUptime
};
