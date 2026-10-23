# 🎙️ Guion de Exposición para Expositor Individual (1 Sola Persona)
## CI/CD en Arquitectura de Software — Ingeniería de Sistemas
**Tiempo estimado:** 5 a 6 minutos (posterior a la proyección de diapositivas)  
**Expositor único:** Representando al equipo de 6 integrantes (Kevin, Pool, Zaga, Verton, Miriam, Pozo)  
**Repositorio GitHub:** [https://github.com/kevinpariona27/cicd-arquitectura-software](https://github.com/kevinpariona27/cicd-arquitectura-software)

---

### 🖥️ Preparación Previa en esta Laptop (Antes de que te llamen al estrado)
1. Ve a la carpeta `zapata` en el explorador de archivos.
2. Haz doble clic en el archivo:
   👉 **`1_INICIAR_SISTEMA_Y_NAVEGADOR.bat`**
   *Esto iniciará el servidor local y abrirá automáticamente en tu navegador dos pestañas:*
   - **Pestaña 1:** `http://localhost:3000` (El Dashboard interactivo del proyecto).
   - **Pestaña 2:** `https://github.com/kevinpariona27/cicd-arquitectura-software/actions` (La consola de GitHub Actions).
3. Deja minimizada la carpeta `zapata` para tener a mano los archivos `.bat` de la demo.

---

## 🎬 GUION MINUTO A MINUTO (Qué decir y qué hacer en pantalla)

### [00:00 - 01:00] Transición del PPT a la Práctica: Presentación de la Arquitectura
* **Acción en pantalla:** Proyecta la **Pestaña 1** (`http://localhost:3000`).
* **Qué decir:**
  > *"Profesor, habiendo concluido la parte teórica de nuestra exposición en las diapositivas, pasamos a la demostración práctica en vivo de nuestra arquitectura de software orientada a CI/CD y DevSecOps.*  
  >  
  > *Como se observa en el panel proyectado, hemos estructurado el sistema bajo los principios de desacoplamiento y alta disponibilidad:  
  > • En la cabecera vemos el servicio activo respondiendo con código HTTP 200 OK en su Liveness Probe (`/health`).  
  > • A nivel de equipo, cada integrante ha liderado un pilar arquitectónico: Kevin en el Pipeline as Code y versionamiento Trunk-Based; Pool en la estrategia Shift-Left Testing y Quality Gates; Zaga en la inmutabilidad con Docker Multi-Stage; Verton en la automatización del despliegue cloud; Miriam en resiliencia y tolerancia a fallos; y Pozo en seguridad DevSecOps con Trivy y métricas DORA.*  
  >  
  > *A continuación, demostraremos en vivo los dos escenarios operacionales más críticos de la arquitectura."*

---

### [01:00 - 02:45] ESCENARIO 1: Happy Path (Flujo Exitoso de Entrega Continua)
* **Acción en pantalla:**
  1. En el Dashboard web, señala con el cursor la versión actual: **`v1.0.0`**.
  2. Ve a la carpeta `zapata` y haz doble clic en:  
     👉 **`2_EJECUTAR_DEMO_1_HAPPY_PATH.bat`**  
     *(La ventana negra actualizará la versión a 1.1.0, hará commit y push a GitHub automáticamente en 3 segundos)*.
  3. Cambia a la **Pestaña 2** del navegador (GitHub Actions) y dale F5.
* **Qué decir:**
  > *"Iniciamos el **Escenario 1: Happy Path**. En este momento, el sistema se encuentra en producción en la versión 1.0.0. Acabo de aplicar una nueva versión (1.1.0) y hacer push a la rama `main`.*  
  >  
  > *Observen cómo de inmediato GitHub Actions detecta el commit y dispara nuestro Pipeline declarativo:*  
  > *1. **Quality Gate (Pool):** Ejecuta el linter estático y la suite de pruebas unitarias con Jest, exigiendo más del 80% de cobertura.*  
  > *2. **DevSecOps (Pozo):** Ejecuta Aqua Security Trivy para escanear dependencias y descartar vulnerabilidades críticas antes del empaquetado.*  
  > *3. **Contenerización (Zaga):** Construye la imagen inmutable con Docker Multi-stage y la publica en GitHub Container Registry (`ghcr.io`).*  
  > *4. **Despliegue Continuo (Verton y Miriam):** Se valida el endpoint `/health` asegurando Zero-Downtime.*"  
* **Acción final del Escenario 1:**
  - Cuando el pipeline termine en verde, regresa a la **Pestaña 1** (`http://localhost:3000`) y presiona **F5**.
  - Muestra que la versión cambió en vivo a **`v1.1.0`**.
* **Qué decir:**
  > *"Como pueden apreciar en pantalla, la nueva versión 1.1.0 se encuentra en producción en tiempo récord, sin intervención manual y satisfaciendo plenamente el atributo de **Desplegabilidad**."*

---

### [02:45 - 04:30] ESCENARIO 2: La Puerta de Calidad (Quality Gate Bloqueando Fallos)
* **Acción en pantalla:**
  1. Ve a la carpeta `zapata` y haz doble clic en:  
     👉 **`3_EJECUTAR_DEMO_2_QUALITY_GATE_FALLO.bat`**  
     *(Inyectará un fallo en los tests y hará push a GitHub automáticamente)*.
  2. Cambia a la **Pestaña 2** (GitHub Actions) y haz clic en el nuevo workflow que se acaba de iniciar.
* **Qué decir:**
  > *"Ahora simularemos un escenario de alto riesgo en ingeniería de software: un desarrollador introduce una regresión o un cambio que rompe el contrato arquitectónico de la aplicación.*  
  >  
  > *En un modelo tradicional sin CI/CD, este error pasaría inadvertido y tumbaría el servidor de producción. Sin embargo, en nuestra arquitectura con **Quality Gate** ocurre lo siguiente:*  
  >  
  > *(Muestra la pantalla de GitHub Actions cuando el Job 1 se pone en ROJO)*  
  >  
  > *Observen la consola: la etapa de **Quality Gate ha fallado en ROJO**. El pipeline detectó la discrepancia en las pruebas unitarias y **abortó inmediatamente todo el ciclo**. Ni se construyó la imagen Docker, ni se disparó el despliegue a la nube.*  
  >  
  > *Si regresamos al Dashboard de producción (Pestaña 1), el servicio sigue 100% operativo y disponible. El pipeline actuó como un escudo de resiliencia protegiendo el negocio."*

---

### [04:30 - 05:30] Conclusión Técnica y Métricas DORA (Cierre con Broche de Oro)
* **Acción en pantalla:** Regresa a la **Pestaña 1** y enfócate en el cuadrante de **Métricas DORA**.
* **Qué decir:**
  > *"Para concluir nuestra presentación, este pipeline nos permite alcanzar niveles **Elite Performer** según el estándar DORA de Google Cloud DevOps:*  
  > *1. **Deployment Frequency:** Despliegues bajo demanda en cualquier momento del día.*  
  > *2. **Lead Time for Changes:** Menos de 4 minutos desde el commit hasta el despliegue.*  
  > *3. **Change Failure Rate:** Tasa de fallo en producción prácticamente nula gracias al Quality Gate previo.*  
  > *4. **Mean Time to Recovery (MTTR):** Recuperación en menos de 2 minutos gobernada por políticas de rollback con `/health`.*  
  >  
  > *Con esto demostramos que CI/CD no es solo una herramienta, sino una disciplina arquitectónica que asegura confiabilidad, modificabilidad y seguridad continua. Muchas gracias, quedamos atentos a sus preguntas."*

---

### 🧹 Limpieza Post-Exposición (Al terminar)
Solo haz doble clic en:
👉 **`4_RESTAURAR_TODO_A_VERDE.bat`**  
Y tu repositorio quedará nuevamente 100% verde y limpio para futuras revisiones del docente.
