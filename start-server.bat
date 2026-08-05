@echo off
cd /d "%~dp0"
echo Starting Cali Cave local server at http://localhost:8765
echo Press Ctrl+C to stop.
python -m http.server 8765
