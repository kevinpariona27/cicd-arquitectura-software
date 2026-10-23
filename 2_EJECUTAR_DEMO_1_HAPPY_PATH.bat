@echo off
title Demo 1: Happy Path (Version 1.1.0)
color 0A

echo ==========================================================
echo [ESCENARIO 1] HAPPY PATH - PROMOCION A VERSION 1.1.0
echo ==========================================================
echo.
echo [1/3] Actualizando version en package.json a 1.1.0...
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
echo [EXITO] CAMBIO ENVIADO A GITHUB
echo - Mira la pestana de GitHub Actions en tu navegador.
echo - Veras pasar: Quality Gate, DevSecOps y Docker Build.
echo - Luego recarga http://localhost:3000 para ver la v1.1.0.
echo ==========================================================
echo.
pause
