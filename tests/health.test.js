const request = require('supertest');
const app = require('../src/app');
const packageJson = require('../package.json');

describe('Quality Gate: Health & Info Tests (Responsable: Pool & Miriam)', () => {
  it('GET /health debe retornar código 200 con estado healthy y versión válida', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.version).toBe(packageJson.version);
    expect(res.body.qualityGateStatus).toBe('PASSED');
    expect(res.body.checks).toBeDefined();
    expect(res.body.checks.api).toBe('UP');
    expect(typeof res.body.uptimeSeconds).toBe('number');
  });

  it('GET /api/info debe contener los 6 integrantes del equipo', async () => {
    const res = await request(app).get('/api/info');

    expect(res.statusCode).toBe(200);
    expect(res.body.course).toBe('Arquitectura de Software');
    expect(res.body.career).toBe('Ingeniería de Sistemas');
    expect(res.body.team).toBeInstanceOf(Array);
    expect(res.body.team.length).toBe(6);

    const names = res.body.team.map(m => m.name);
    expect(names).toContain('Kevin');
    expect(names).toContain('Pool');
    expect(names).toContain('Zaga');
    expect(names).toContain('Verton');
    expect(names).toContain('Miriam');
    expect(names).toContain('Pozo');
  });

  it('GET /ruta-inexistente debe responder 404 Not Found de forma controlada', async () => {
    const res = await request(app).get('/ruta-inexistente');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Not Found');
  });
});
