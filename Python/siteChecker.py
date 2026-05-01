import requests
import time
from datetime import datetime
import json
import os
from ai import generate_diagnostic_report

def checkSite(url):
    results = {
        "website": url, "status": "DOWN", "latency": 0,
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "ssl_cert": "N/A", "domain_expiry": "N/A"
    }
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        start_time = time.time()
        response = requests.get(url, timeout=5, verify=True, headers=headers)
        end_time = time.time()
        results["latency"] = round((end_time - start_time) * 1000)
        results["status"] = "UP" if response.status_code == 200 else "DOWN"
    except Exception as e:
        print(f"Error checking {url}: {e}")
    return results

path_config = "/var/www/site-checker/config.json"
path_json = "/var/www/site-checker/ping_results.json"
path_ai = "/var/www/site-checker/ai_help.json" # Puna putanja!

if os.path.exists(path_config):
    with open(path_config, 'r') as f:
        sites = json.load(f)
        if not isinstance(sites, list): sites = [] # Zaštita
else:
    sites = []

if os.path.exists(path_json):
    try:
        with open(path_json, 'r') as f:
            database = json.load(f)
            if isinstance(database, list): database = {}
    except:
        database = {}
else:
    database = {}

if sites:
    errors_for_ai = []
    for site in sites:
        result = checkSite(site)
        if site not in database: database[site] = []
        database[site].append(result)
        database[site] = database[site][-20:]
        if result["status"] == "DOWN":
            errors_for_ai.append(f"{site} is DOWN ({result['timestamp']})")

    with open(path_json, 'w') as f:
        json.dump(database, f, indent=4)
    
    with open(path_ai, 'w') as f:
        json.dump({
            "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            "diagnostic_report": generate_diagnostic_report(errors_for_ai)
        }, f, indent=4)