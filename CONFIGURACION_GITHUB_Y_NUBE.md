# 🌐 Guía de Configuración: GitHub y Despliegue en la Nube (Render)

Esta guía permite al equipo (**Kevin, Verton y Zaga**) dejar el repositorio y la nube configurados en menos de 5 minutos para la presentación.

---

## PASO 1: Subir el proyecto a GitHub (Kevin)

1. Ingresa a tu cuenta de [GitHub](https://github.com) y crea un nuevo repositorio llamado:  
   `cicd-arquitectura-software` (Público o Privado).
2. En tu terminal en la carpeta del proyecto (`c:\Users\kevin\Documents\zapata`), ejecuta los siguientes comandos reemplazando `TU_USUARIO`:

```bash
git add .
git commit -m "feat: arquitectura base ci/cd, quality gates y devsecops"
git remote add origin https://github.com/TU_USUARIO/cicd-arquitectura-software.git
git branch -M main
git push -u origin main
```

---

## PASO 2: Configurar permisos en GitHub para GitHub Container Registry (GHCR)

Para que el pipeline de GitHub Actions pueda publicar la imagen Docker en GHCR sin pedir contraseñas externas:
1. En tu repositorio en GitHub, ve a **Settings** (Configuración) ➔ **Actions** ➔ **General**.
2. Desplázate hacia abajo hasta la sección **Workflow permissions**.
3. Selecciona la opción: **"Read and write permissions"** (Permisos de lectura y escritura).
4. Haz clic en **Save** (Guardar).

---

## PASO 3: Despliegue en la Nube con Render (Verton - Opcional pero muy recomendado para URL pública)

Para que la demo tenga una URL real en internet (ejemplo: `https://mi-demo-cicd.onrender.com`):

### Opción Rápida con Render (Gratuito):
1. Regístrate o inicia sesión en [Render.com](https://render.com) (puedes entrar con tu cuenta de GitHub con un clic).
2. Haz clic en **New +** ➔ **Web Service**.
3. Selecciona **Build and deploy from a Git repository** y conecta tu repositorio `cicd-arquitectura-software`.
4. En la configuración:
   - **Name:** `arquitectura-cicd-demo`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
5. Haz clic en **Deploy Web Service**.
6. En la pestaña **Settings** del servicio en Render, busca la sección **Deploy Hook** y copia la URL generada (`https://api.render.com/deploy/srv-xxxx?key=yyyy`).

### Vincular el Webhook con GitHub Secrets:
1. En tu repositorio de GitHub, ve a **Settings** ➔ **Secrets and variables** ➔ **Actions**.
2. Haz clic en **New repository secret**.
3. **Name:** `RENDER_DEPLOY_HOOK`
4. **Secret:** Pega la URL del Deploy Hook que copiaste de Render.
5. Haz clic en **Add secret**.

> **¡Listo!** Ahora cada vez que hagan `git push` a `main`, GitHub Actions ejecutará los tests, validará la seguridad, empaquetará el contenedor Docker y disparará el despliegue automático a Render.

---

## 💻 Plan B (Si no hay internet estable en el salón de clases):
Si el proyector o el aula no cuenta con buena conexión a internet:
1. Ejecuten la aplicación localmente:
   ```bash
   npm start
   ```
2. Abran en el navegador: `http://localhost:3000`.
3. Para la simulación de pruebas, ejecuten `npm test` y `npm run demo:break` directamente en la terminal proyectada para mostrar los Quality Gates en tiempo real.
