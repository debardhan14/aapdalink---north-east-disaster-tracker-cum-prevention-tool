@echo off
title AapdaLink - North East Disaster Platform
echo ====================================================================
echo   Launching AapdaLink - North East Disaster Safety Hub
echo ====================================================================
echo.
echo [1/2] Opening application in your default browser...
start "" "%~dp0index.html"
start "" "http://localhost:3000"
echo.
echo [2/2] Starting local web server on http://localhost:3000 ...
echo Press Ctrl+C in this terminal window to stop the server anytime.
echo.
python -m http.server 3000 -d "%~dp0"
if %ERRORLEVEL% NEQ 0 (
    echo Python server stopped or not in PATH. Direct file mode is active.
)
pause
