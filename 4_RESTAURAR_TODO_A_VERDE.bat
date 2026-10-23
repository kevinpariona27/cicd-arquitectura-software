@echo off
title Restaurar Todo a Verde
color 0F

echo ==========================================================
echo [RESTAURACION] SISTEMA A ESTADO SALUDABLE
echo ==========================================================
echo.
echo [1/3] Restaurando tests a estado 100% saludable...
call npm run demo:fix

echo.
echo [2/3] Registrando commit de restauracion...
git add .
git commit -m "chore: restaurar suite de pruebas a estado saludable"

echo.
echo [3/3] Enviando cambios a GitHub con git push...
git push origin main

echo.
echo ==========================================================
echo [EXITO] SISTEMA RESTAURADO
echo - La suite de pruebas y el pipeline volveran a estar en verde.
echo ==========================================================
echo.
pause
