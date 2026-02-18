@echo off
echo ========================================
echo CBC EMEA Knowledge Assistant
echo Local Server Starter
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Starting server with Python...
    echo.
    echo Server will be available at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python not found. Checking for Node.js...
    echo.
    where http-server >nul 2>&1
    if %errorlevel% == 0 (
        echo Starting server with Node.js http-server...
        echo.
        echo Server will be available at: http://localhost:8080
        echo Press Ctrl+C to stop the server
        echo.
        http-server
        goto :end
    ) else (
        echo http-server not installed. Installing...
        npm install -g http-server
        echo.
        echo Starting server...
        http-server
        goto :end
    )
)

REM Check if PHP is installed
php --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python and Node.js not found. Starting server with PHP...
    echo.
    echo Server will be available at: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

echo.
echo ERROR: No suitable server found!
echo Please install one of the following:
echo   - Python (recommended): https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo   - PHP: https://www.php.net/downloads
echo.
echo Or simply open index.html directly in your browser.
pause

:end
