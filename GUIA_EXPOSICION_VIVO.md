# 🎬 Guion Maestro: Demostración Práctica en Vivo (Live Demo)
## CI/CD en Arquitectura de Software — Ingeniería de Sistemas
**Tiempo estimado:** 4 a 5 minutos (posterior a la presentación del PPT)  
**Equipo:** Kevin, Pool, Zaga, Verton, Miriam, Pozo

---

### 🖥️ Preparación Previa en la Laptop del Expositor (Antes de empezar)
1. Abrir **VS Code** con el proyecto abierto en la carpeta `zapata`.
2. Abrir **Google Chrome** con 2 pestañas fijas:
   - **Pestaña 1:** URL de la aplicación web activa en vivo (en Render o en `http://localhost:3000`).
   - **Pestaña 2:** Repositorio en GitHub en la pestaña **Actions** (`https://github.com/TU_USUARIO/TU_REPO/actions`).
3. Tener una terminal abierta lista en VS Code.

---

## 🟢 ESCENARIO 1: Flujo Exitoso (Happy Path) — 2:00 min

### 1. Verton (Despliegue Continuo) — [00:00 - 00:30]
* **Acción:** Muestra en el proyector la **Pestaña 1** con la interfaz gráfica del Dashboard y abre el endpoint `/health`.
* **Lo que dice:**
  > *"Profesor, compañeros, habiendo concluido la fundamentación teórica de la arquitectura CI/CD, iniciamos la demostración práctica en vivo. Como observan en pantalla, nuestro servicio está activo en producción con la versión **1.0.0**, respondiendo con código 200 OK y estado 'healthy' en su liveness probe."*

---

### 2. Kevin (Líder DevOps) — [00:30 - 01:00]
* **Acción:** Pasa a VS Code. Ejecuta el comando rápido para subir de versión:
  ```bash
  npm run demo:bump
  git add .
  git commit -m "feat(release): promocion a version 1.1.0"
  git push origin main
  ```
* **Lo que dice:**
  > *"Como desarrollador y líder DevOps, acabo de implementar una actualización en el código incrementando la versión a **1.1.0**. Al hacer 'git push' a la rama principal mediante Trunk-Based Development, se activa de forma automática nuestro Pipeline as Code definido en `.github/workflows/ci-cd.yml`."*

---

### 3. Pool y Zaga (Testing y Contenedores) — [01:00 - 01:40]
* **Acción:** Cambian a la **Pestaña 2** (GitHub Actions) y le dan clic a la ejecución en curso.
* **Lo que dice Pool:**
  > *"En esta primera etapa observamos el **Quality Gate**. Aquí se ejecuta el análisis estático y nuestra suite de pruebas unitarias con Jest. Bajo el principio de Shift-Left Testing, garantizamos que las reglas de negocio y los contratos de arquitectura se cumplan con más del 80% de cobertura antes de generar cualquier artefacto."*
* **Lo que dice Zaga:**
  > *"Una vez superado el Quality Gate, el pipeline activa mi etapa: **Docker Multi-Stage Build**. Aplicando el principio arquitectónico del Artefacto Inmutable, 'Build once, deploy anywhere', compilamos una imagen optimizada sobre Alpine Linux con usuario no-root para minimizar la superficie de ataque, publicándola en GitHub Container Registry."*

---

### 4. Verton (Cierre de Happy Path) — [01:40 - 02:00]
* **Acción:** Muestra la etapa final de GitHub Actions en verde y vuelve a la **Pestaña 1** (la aplicación web). Recarga la página (F5).
* **Lo que dice:**
  > *"El pipeline dispara el webhook de despliegue continuo hacia la nube. Como vemos al recargar el navegador, la aplicación ahora refleja la versión **1.1.0** en vivo, sin tiempo de inactividad (Zero-Downtime), completando el Happy Path de extremo a extremo."*

---

## 🔴 ESCENARIO 2: La Puerta de Calidad (Quality Gate en Acción) — 2:00 min

### 5. Miriam (Resiliencia y Protección) — [02:00 - 03:00]
* **Acción:** Pasa a la terminal de VS Code y ejecuta el script de inyección de fallo:
  ```bash
  npm run demo:break
  git add .
  git commit -m "fix: cambio experimental con regresion en tests"
  git push origin main
  ```
* **Lo que dice:**
  > *"Ahora simularemos un escenario crítico de la vida real: un desarrollador comete un error inadvertido que altera el contrato del endpoint `/health` o introduce una regresión. En un despliegue artesanal tradicional, este fallo llegaría a producción y causaría una caída del servicio. Acabo de hacer push con este defecto."*
* **Acción:** Vuelve a GitHub Actions y abre la ejecución que acaba de iniciar.
* **Lo que dice:**
  > *"Observen la consola de GitHub Actions: en cuestión de segundos, la etapa de **Quality Gate falla en ROJO**. Las pruebas detectaron la inconsistencia y abortaron inmediatamente la ejecución. Ni la imagen de Docker se construyó, ni el despliegue a la nube fue autorizado. La versión productiva permanece 100% intacta y disponible."*

---

### 6. Pozo (DevSecOps, Métricas DORA y Conclusión) — [03:00 - 04:00]
* **Acción:** Muestra en el Dashboard web el panel de las **4 Métricas DORA** y el reporte de seguridad con **Trivy**.
* **Lo que dice:**
  > *"Con esto demostramos en vivo la tesis de nuestro trabajo: el pipeline no es solo un conjunto de scripts, sino un **mecanismo de gobernanza arquitectónica**.  
  > 1. Gracias al escaneo continuo con **Trivy SAST**, bloqueamos vulnerabilidades y secretos expuestos (DevSecOps).  
  > 2. Alcanzamos un rendimiento de categoría **Elite** en las 4 Métricas DORA: despliegues bajo demanda, Lead Time inferior a 4 minutos, tasa de fallos en producción cercana al 0% y recuperación casi instantánea gobernada por Health Checks.  
  > Quedamos a su disposición para la ronda de preguntas. Muchas gracias."*

---

### 🛠️ Restauración Inmediata (Para dejar todo limpio)
Al terminar la exposición o en las pruebas previas, ejecutar en la terminal:
```bash
npm run demo:fix
git add .
git commit -m "chore: restaurar suite de pruebas a estado saludable"
git push origin main
```
Con esto el pipeline volverá a estar 100% verde.
