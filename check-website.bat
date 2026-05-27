@echo off
setlocal
echo Checking port 3000...
netstat -ano | findstr :3000
echo.
echo Checking homepage...
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri 'http://localhost:3000/zh' -UseBasicParsing -TimeoutSec 10).StatusCode } catch { $_.Exception.Message }"
pause
