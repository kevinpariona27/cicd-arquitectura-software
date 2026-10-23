const request = require('supertest');
const app = require('../src/app');
const { formatUptime, getDoraMetrics, getSystemMetrics } = require('../src/services/metrics');

describe('Quality Gate: DORA & Metrics Tests (Responsable: Pozo & Pool)', () => {
  it('GET /api/dora debe retornar las 4 métricas DORA clave', async () => {
    const res = await request(app).get('/api/dora');

    expect(res.statusCode).toBe(200);
    expect(res.body.systemPerformance).toBe('Elite Performer');
    expect(res.body.metrics).toBeDefined();

    const { deploymentFrequency, leadTimeForChanges, changeFailureRate, meanTimeToRestore } = res.body.metrics;
    expect(deploymentFrequency.level).toBe('Elite');
    expect(leadTimeForChanges.level).toBe('Elite');
    expect(changeFailureRate.level).toBe('Elite');
    expect(meanTimeToRestore.level).toBe('Elite');
  });

  it('formatUptime debe formatear correctamente los segundos transcurridos', () => {
    expect(formatUptime(0)).toBe('0d 0h 0m 0s');
    expect(formatUptime(65)).toBe('0d 0h 1m 5s');
    expect(formatUptime(3665)).toBe('0d 1h 1m 5s');
    expect(formatUptime(90065)).toBe('1d 1h 1m 5s');
  });

  it('getDoraMetrics debe retornar un objeto con estructura válida', () => {
    const dora = getDoraMetrics();
    expect(dora.deploymentFrequency).toHaveProperty('value');
    expect(dora.leadTimeForChanges).toHaveProperty('description');
  });

  it('getSystemMetrics debe respetar la variable de entorno NODE_ENV si está definida o usar default', () => {
    const originalEnv = process.env.NODE_ENV;
    
    process.env.NODE_ENV = 'test-environment';
    const metricsWithCustomEnv = getSystemMetrics();
    expect(metricsWithCustomEnv.environment).toBe('test-environment');

    delete process.env.NODE_ENV;
    const metricsWithDefault = getSystemMetrics();
    expect(metricsWithDefault.environment).toBe('production');

    process.env.NODE_ENV = originalEnv;
  });
});
