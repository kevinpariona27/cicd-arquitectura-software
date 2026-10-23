@echo off
chcp 65001 > nul
title Demo 2: Quality Gate en Accion (Fallo Deliberado)
color 0C

echo ==========================================================
echo 🔴 ESCENARIO 2: QUALITY GATE EN ACCIÓN (FALLO DELIBERADO)
echo ==========================================================
echo.
echo [1/3] Inyectando inconsistencia en los tests unitarios (/health)...
call npm run demo:break

echo.
echo [2/3] Registrando commit con la regresión arquitectónica...
git add .
git commit -m "fix: cambio con regresion deliberada en tests"

echo.
echo [3/3] Enviando cambios a GitHub con git push...
git push origin main

echo.
echo ==========================================================
echo 🛑 ¡REGRESIÓN ENVIADA A GITHUB!
echo 👉 Observa la pestaña de GitHub Actions en tu navegador.
echo 👉 La etapa 'Quality Gate' FALLARÁ EN ROJO.
echo 👉 El despliegue quedará BLOQUEADO automáticamente,
echo    protegiendo el entorno de producción contra caídas.
echo ==========================================================
echo.
pause
