@echo off
echo ========================================
echo    CAI DAT ELASTICSEARCH
echo ========================================
echo.

echo 1. Kiem tra Docker...
docker --version
if %errorlevel% neq 0 (
    echo ❌ Docker chua duoc cai dat!
    echo Vui long cai dat Docker Desktop truoc khi chay script nay.
    echo.
    echo Link tai: https://www.docker.com/products/docker-desktop/
    pause
    exit /b 1
)

echo.
echo 2. Tai Elasticsearch image...
docker pull docker.elastic.co/elasticsearch/elasticsearch:8.11.0

echo.
echo 3. Tai Kibana image...
docker pull docker.elastic.co/kibana/kibana:8.11.0

echo.
echo 4. Tao network cho Elasticsearch...
docker network create elastic 2>nul

echo.
echo 5. Khoi dong Elasticsearch container...
docker run -d --name elasticsearch --net elastic -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e "xpack.security.enabled=false" -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" docker.elastic.co/elasticsearch/elasticsearch:8.11.0

echo.
echo 6. Cho Elasticsearch khoi dong (60 giay)...
timeout /t 60 /nobreak >nul

echo.
echo 7. Khoi dong Kibana container...
docker run -d --name kibana --net elastic -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://elasticsearch:9200" docker.elastic.co/kibana/kibana:8.11.0

echo.
echo 8. Kiem tra Elasticsearch...
curl -s http://localhost:9200 >nul
if %errorlevel% equ 0 (
    echo ✅ Elasticsearch da san sang!
) else (
    echo ⚠️ Elasticsearch chua san sang, vui long cho them...
)

echo.
echo 9. Mo Kibana Dashboard...
start http://localhost:5601

echo.
echo ✅ Cai dat Elasticsearch thanh cong!
echo.
echo 🔍 Elasticsearch: http://localhost:9200
echo 📊 Kibana: http://localhost:5601
echo.
echo De dung lai Elasticsearch, chay: docker-compose down
echo.
pause
