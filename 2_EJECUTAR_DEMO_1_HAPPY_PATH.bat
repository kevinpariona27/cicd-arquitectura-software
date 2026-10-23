@echo off
chcp 65001 > nul
title Demo 1: Happy Path (Version 1.1.0)
color 0A

echo ==========================================================
echo 🟢 ESCENARIO 1: HAPPY PATH (PROMOCIÓN A VERSIÓN 1.1.0)
echo ==========================================================
echo.
echo [1/3] Actualizando versión en package.json a 1.1.0...
call npm run demo:bump

echo.
echo [2/3] Registrando commit en Git (Trunk-Based Development)...
git add .
git commit -m "feat(release): promocion a version 1.1.0"

echo.
echo [3/3] Enviando cambios a GitHub con git push...
git push origin main

echo.
echo ==========================================================
echo ✅ ¡CAMBIO ENVIADO EXITOSAMENTE A GITHUB!
echo 👉 Mira la pestaña de GitHub Actions en tu navegador.
echo 👉 Verás pasar el Quality Gate, DevSecOps y Docker Build.
echo 👉 Luego recarga http://localhost:3000 para ver la v1.1.0.
echo ==========================================================
echo.
pause
