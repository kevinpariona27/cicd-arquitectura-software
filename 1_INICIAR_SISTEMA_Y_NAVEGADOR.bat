@echo off
chcp 65001 > nul
title Servidor CI/CD - Arquitectura de Software
color 0B

echo ==========================================================
echo 🚀 INICIANDO SERVIDOR LOCAL PARA LA EXPOSICIÓN
echo ==========================================================
echo.
echo Abriendo Dashboard en el navegador: http://localhost:3000
echo Abriendo GitHub Actions: https://github.com/kevinpariona27/cicd-arquitectura-software/actions
echo.

start "" "http://localhost:3000"
timeout /t 2 > nul
start "" "https://github.com/kevinpariona27/cicd-arquitectura-software/actions"

echo.
echo Presiona Ctrl+C en esta ventana para detener el servidor cuando termine la clase.
echo.
npm start
