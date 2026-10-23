# Arquitectura de Software: CI/CD Pipeline & DevSecOps

Proyecto práctico para la demostración en vivo de **Integración Continua (CI)** y **Entrega / Despliegue Continuo (CD)** dentro del curso de **Arquitectura de Software** (Ingeniería de Sistemas).

---

## 👥 Matriz de Roles y Responsabilidades (6 Integrantes)

| Integrante | Rol Especializado | Capítulo Informe | Sección PPT | Responsabilidad en la Demo |
| :--- | :--- | :--- | :--- | :--- |
| **Kevin** | Líder DevOps & Pipeline as Code | Cap. 1: Fundamentos CI/CD y Pipeline as Code | Introducción y Visión General | Configuración de repo GitHub, pipeline (`.github/workflows/ci-cd.yml`) y variables/secretos. |
| **Pool** | Calidad & Shift-Left Testing | Cap. 2: Quality Gates y Estrategia de Pruebas | Estrategia de Testing y Shift-Left | Suite de pruebas unitarias/integración con Jest y verificación de Quality Gate (>80% cobertura). |
| **Zaga** | Contenedores & Artefactos | Cap. 3: Inmutabilidad y Docker | Empaquetado y Paridad Dev/Prod | Dockerfile Multi-stage build, usuario no root y publicación a GitHub Container Registry (GHCR). |
| **Verton** | Despliegue Continuo (CD) | Cap. 4: Continuous Delivery vs Deployment & Cloud | Automatización del Despliegue Cloud | Demostración en vivo del **Happy Path** (despliegue automático a Render / Cloud). |
| **Miriam** | Resiliencia & Release Patterns | Cap. 5: Patrones de Release y Health Checks | Alta Disponibilidad y Rollback | Endpoint `/health`, simulación del **bloqueo por Quality Gate** y tolerancia a fallos. |
| **Pozo** | DevSecOps & Métricas DORA | Cap. 6: Seguridad Continua y Métricas DORA | Seguridad DevSecOps y Conclusiones | Escaneo de vulnerabilidades con Trivy SAST, panel de Métricas DORA y cierre técnico. |

---

## 🏛️ Atributos de Calidad Arquitectónicos Demostrados

1. **Desplegabilidad (Deployability):** Puesta en producción automatizada con mínimo tiempo de ciclo (`< 4 min`) sin intervención manual.
2. **Modificabilidad y Testabilidad:** El principio de *Shift-Left Testing* evita regresiones con validaciones automáticas antes de cualquier fusión o despliegue.
3. **Disponibilidad y Tolerancia a Fallos:** Endpoint `/health` con liveness probe y política de Rollback automático.
4. **Seguridad Arquitectónica (DevSecOps):** Quality Gates con escaneo estático (SAST) y escáner de contenedores con Trivy en el pipeline.

---

## 📁 Estructura del Proyecto

```text
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Pipeline as Code con las 4 etapas automatizadas
├── src/
│   ├── app.js                 # Configuración principal de Express y middleware
│   ├── server.js              # Entrypoint del servidor con Graceful Shutdown
│   ├── routes/
│   │   ├── health.js          # Health check endpoint (/health) - Miriam
│   │   ├── info.js            # Metadatos del equipo y arquitectura (/api/info)
│   │   └── dora.js            # Métricas DORA del sistema (/api/dora) - Pozo
│   ├── services/
│   │   └── metrics.js         # Lógica de cálculo de métricas y uptime
│   └── public/
│       ├── index.html         # Dashboard visual interactivo para la exposición
│       ├── style.css          # Estilos modernos modo oscuro (DevOps UI)
│       └── app.js             # Conexión asíncrona a los endpoints
├── tests/
│   ├── health.test.js         # Pruebas unitarias de salud y rutas
│   └── dora.test.js           # Pruebas de métricas DORA y cobertura
├── scripts/
│   ├── bump-version.js        # Script de apoyo: actualiza versión a 1.1.0 (Demo 1)
│   ├── simulate-failure.js    # Script de apoyo: inyecta fallo para Quality Gate (Demo 2)
│   └── restore-tests.js       # Script de apoyo: restaura los tests a verde
├── Dockerfile                 # Multi-stage build optimizado para producción
├── .eslintrc.json             # Linter estático para asegurar calidad de código
├── package.json               # Dependencias, scripts y configuración de Jest
├── GUIA_EXPOSICION_VIVO.md    # Guion detallado minuto a minuto para la exposición
└── CONFIGURACION_GITHUB_Y_NUBE.md # Pasos para subir a GitHub y Render
```

---

## 🚀 Comandos Rápidos

```bash
# Instalar dependencias
npm install

# Iniciar servidor local
npm start
# Abrir en navegador: http://localhost:3000

# Ejecutar Quality Gate local (Tests + Cobertura + Linter)
npm test
npm run test:coverage
npm run lint

# Simulación para Escenario 1 (Happy Path - Incrementar versión)
npm run demo:bump

# Simulación para Escenario 2 (Quality Gate - Inyectar fallo)
npm run demo:break

# Restaurar estado saludable
npm run demo:fix
```
