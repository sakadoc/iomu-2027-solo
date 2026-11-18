@echo off
title IOMU 2027 - Surakarta 3D Experience (Local Server)
cd /d "%~dp0"

echo ========================================================
echo   IOMU 2027 - 3D Surakarta WebGL Experience
echo   Menjalankan server lokal tanpa install aplikasi...
echo ========================================================
echo.

start "" "http://127.0.0.1:8080"
call "%APPDATA%\Antigravity\bin\agy-node.cmd" server.mjs
pause
