const express = require('express');
const path = require('path');

const healthRouter = require('./routes/health');
const infoRouter = require('./routes/info');
const doraRouter = require('./routes/dora');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir la interfaz gráfica de demostración
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/health', healthRouter);
app.use('/api/info', infoRouter);
app.use('/api/dora', doraRouter);

// Manejador para rutas 404
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

module.exports = app;
