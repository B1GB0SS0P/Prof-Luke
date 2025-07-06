cd /d "%~dp0Frontend"

REM Optional: check if node_modules exists, install if missing
IF NOT EXIST node_modules (
    echo Installing dependencies...
    npm install
)

echo Starting development server...
npm run dev

pause
