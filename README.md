# 🌐 WEB-Sites-Dashboard-Checker

A professional Full-Stack Monitoring Solution built to track website uptime and latency. This project demonstrates a production-grade deployment combining a Python backend, a React frontend,

The system is built with a focus on reliability and real-time data visualization:

- Backend: Flask (Python) serving a RESTful API.
- Frontend: React with Tailwind CSS for a modern, responsive UI.
- Worker: A standalone Python script triggered by Cron Jobs for 24/7 automated monitoring.
- Proxy: Nginx acting as a reverse proxy with SSL (HTTPS) encryption via Certbot.
- Database: JSON-based persistent storage for configuration and results.

# ⚙️ How It Works

1. Site Configuration: Users add target URLs through the React interface.
2. API Gateway: The Flask API receives the request and updates config.json.
3. Automated Checker: Every minute, a Cron Job executes checker.py, which pings all configured sites and records latency and status.
4. Real-time Insights: The React Dashboard fetches the latest results from ping_results.json and displays them in a clean, filterable table.
