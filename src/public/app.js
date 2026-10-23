// CI/CD Live Dashboard Client
async function updateDashboard() {
  try {
    const res = await fetch('/health');
    if (!res.ok) throw new Error('Respuesta no satisfactoria');
    const data = await res.json();

    document.getElementById('version-badge').textContent = `v${data.version}`;
    document.getElementById('stat-uptime').textContent = data.uptime || `${data.uptimeSeconds}s`;
    document.getElementById('stat-env').textContent = `${data.environment} (Live)`;
    document.getElementById('stat-health').textContent = `Healthy (${data.status})`;
    
    if (data.memoryUsageMB) {
      document.getElementById('stat-memory').textContent = `Heap: ${data.memoryUsageMB.heapUsed} MB`;
    }
  } catch (err) {
    console.error('Error actualizando métricas:', err);
    document.getElementById('app-status').textContent = 'DESCONECTADO';
    document.getElementById('app-status').style.color = '#ef4444';
  }
}

async function fetchEndpoint(endpoint) {
  const viewer = document.getElementById('json-viewer');
  const endpointLabel = document.getElementById('current-endpoint');
  
  endpointLabel.textContent = `Consultando: ${endpoint}...`;
  viewer.textContent = 'Cargando datos en vivo...';

  try {
    const res = await fetch(endpoint);
    const json = await res.json();
    endpointLabel.textContent = `Respuesta HTTP ${res.status} de ${endpoint}`;
    viewer.textContent = JSON.stringify(json, null, 2);
  } catch (err) {
    endpointLabel.textContent = `Error al consultar ${endpoint}`;
    viewer.textContent = `Error: ${err.message}`;
  }
}

// Iniciar monitoreo
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
  fetchEndpoint('/health');
  setInterval(updateDashboard, 3000);
});
