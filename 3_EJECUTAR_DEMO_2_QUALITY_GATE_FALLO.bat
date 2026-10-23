@echo off
title Demo 2: Quality Gate en Accion (Fallo Deliberado)
color 0C

echo ==========================================================
echo [ESCENARIO 2] QUALITY GATE EN ACCION (FALLO DELIBERADO)
echo ==========================================================
echo.
echo [1/3] Inyectando inconsistencia en los tests unitarios (/health)...
call npm run demo:break

echo.
echo [2/3] Registrando commit con la regresion arquitectonica...
git add .
git commit -m "fix: cambio con regresion deliberada en tests"

echo.
echo [3/3] Enviando cambios a GitHub con git push...
git push origin main

echo.
echo ==========================================================
echo [ALERTA] REGRESION ENVIADA A GITHUB
echo - Observa la pestana de GitHub Actions en tu navegador.
echo - La etapa Quality Gate FALLARA EN ROJO.
echo - El despliegue quedara BLOQUEADO automaticamente,
echo   protegiendo el entorno de produccion contra caidas.
echo ==========================================================
echo.
pause
