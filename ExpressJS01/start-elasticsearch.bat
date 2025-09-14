@echo off
echo ========================================
echo    KHOI DONG ELASTICSEARCH
echo ========================================
echo.

echo 1. Kiem tra Docker...
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker chua duoc cai dat!
    echo Vui long cai dat Docker Desktop truoc khi chay script nay.
    pause
    exit /b 1
)

echo.
echo 2. Khoi dong Elasticsearch va Kibana...
docker-compose up -d

echo.
echo 3. Cho Elasticsearch khoi dong (30 giay)...
timeout /t 30 /nobreak >nul

echo.
echo 4. Kiem tra Elasticsearch...
curl -s http://localhost:9200 >nul
if %errorlevel% equ 0 (
    echo ✅ Elasticsearch da san sang!
) else (
    echo ⚠️ Elasticsearch chua san sang, vui long cho them...
)

echo.
echo 5. Mo Kibana Dashboard...
start http://localhost:5601

echo.
echo ✅ Elasticsearch va Kibana da khoi dong!
echo.
echo 🔍 Elasticsearch: http://localhost:9200
echo 📊 Kibana: http://localhost:5601
echo.
pause
