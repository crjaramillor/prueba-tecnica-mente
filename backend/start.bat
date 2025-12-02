@echo off
chcp 65001 >nul
title Backend Spring Boot
echo ========================================
echo   Iniciando Backend Spring Boot
echo ========================================
echo.

REM Buscar Java automáticamente en varias ubicaciones
echo Buscando Java instalado...

REM Buscar en C:\Program Files\Java
for /d %%i in ("C:\Program Files\Java\jdk*") do (
    set "JAVA_HOME=%%i"
    goto :found
)

REM Buscar en C:\Program Files (x86)\Java
for /d %%i in ("C:\Program Files (x86)\Java\jdk*") do (
    set "JAVA_HOME=%%i"
    goto :found
)

REM Buscar en D:\Program Files\Java
for /d %%i in ("D:\Program Files\Java\jdk*") do (
    set "JAVA_HOME=%%i"
    goto :found
)

REM Intentar encontrar Java usando el comando where
where java >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Java encontrado en PATH, pero JAVA_HOME no configurado.
    echo Intentando configurar JAVA_HOME desde la ruta de java.exe...
    for /f "tokens=*" %%j in ('where java') do (
        set "JAVA_PATH=%%j"
        goto :extract_java_home
    )
)

:extract_java_home
if defined JAVA_PATH (
    REM Extraer JAVA_HOME desde la ruta de java.exe
    for %%k in ("%JAVA_PATH%") do set "JAVA_DIR=%%~dpk"
    if "%JAVA_DIR:~-9%"=="\bin\" (
        set "JAVA_HOME=%JAVA_DIR:~0,-5%"
        goto :found
    )
    if "%JAVA_DIR:~-10%"=="\bin\" (
        set "JAVA_HOME=%JAVA_DIR:~0,-6%"
        goto :found
    )
)

echo.
echo ERROR: No se encontro Java JDK instalado.
echo.
echo Por favor:
echo 1. Instala Java 17 o superior desde: https://www.oracle.com/java/technologies/downloads/
echo 2. O configura JAVA_HOME manualmente antes de ejecutar este script
echo.
pause
exit /b 1

:found
echo JAVA_HOME configurado: %JAVA_HOME%
echo.
echo ========================================
echo   Iniciando Spring Boot...
echo ========================================
echo.
call mvnw.cmd spring-boot:run

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ========================================
    echo ERROR: No se pudo iniciar el backend
    echo ========================================
    echo.
    pause
)

