const app = require('./app');

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 CI/CD Demo - Arquitectura de Software`);
  console.log(`📡 Servidor activo en: http://localhost:${PORT}`);
  console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 Métricas DORA: http://localhost:${PORT}/api/dora`);
  console.log(`ℹ️  Información: http://localhost:${PORT}/api/info`);
  console.log(`====================================================`);
});

// Manejo de señales de apagado gracioso (Graceful Shutdown)
process.on('SIGTERM', () => {
  console.log('🛑 Señal SIGTERM recibida: Cerrando servidor HTTP con gracia...');
  server.close(() => {
    console.log('✅ Servidor HTTP cerrado.');
    process.exit(0);
  });
});
