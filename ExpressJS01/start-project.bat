@echo off
echo ========================================
echo    KHOI DONG BACKEND SERVER
echo ========================================
echo.

echo 1. Cai dat dependencies...
npm install

echo.
echo 2. Tao du lieu mau...
npm run seed

echo.
echo 3. Dong bo du lieu sang Elasticsearch...
npm run sync-es

echo.
echo 4. Khoi dong server...
npm start

echo.
echo ✅ Backend da khoi dong thanh cong!
echo.
echo 🔍 API: http://localhost:8080
echo 📊 Kibana: http://localhost:5601
echo.
pause
