@echo off
setlocal
cd /d E:\Codex\diang-fire-platform
echo.
echo ========================================
echo  Shanghai Di'ang website local server
echo ========================================
echo.
echo URL: http://localhost:3000/zh
echo.
echo Keep this window open while previewing the website.
echo Press Ctrl+C to stop the server.
echo.
"C:\Program Files\nodejs\node.exe" "E:\Codex\diang-fire-platform\node_modules\next\dist\bin\next" start -p 3000 -H 0.0.0.0
pause
