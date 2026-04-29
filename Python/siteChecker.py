import requests
import time
from datetime import datetime
import json
import os

def checkSite(url):
    results = {
        "website": url,
        "status": "DOWN",
        "latency": 0,
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "ssl_cert": "N/A",
        "domain_expiry": "N/A"
    }
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    try:
        start_time = time.time()
        response = requests.get(url, timeout=5, verify=True, headers=headers)
        end_time = time.time()
        results["latency"] = round((end_time - start_time) * 1000)
        results["status"] = "UP" if response.status_code == 200 else "DOWN"
    except Exception as e:
        print(f"Error checking {url}: {e}")
    return results

path_config = "config.json"
path_json = "ping_results.json"
MAX_HISTORY = 20

# 1. Dohvati stranice iz configa
if os.path.exists(path_config):
    with open(path_config, 'r') as f:
        sites = json.load(f)
else:
    sites = []

# 2. Učitaj staru bazu rezultata
if os.path.exists(path_json):
    try:
        with open(path_json, 'r') as f:
            database = json.load(f)
            if isinstance(database, list): database = {}
    except:
        database = {}
else:
    database = {}

# 3. Odradi provjeru ako ima siteova
if sites:
    print(f"Provjera započeta u {datetime.now().strftime('%H:%M:%S')}")
    for site in sites:
        result = checkSite(site)
        if site not in database:
            database[site] = []
        
        database[site].append(result)
        database[site] = database[site][-MAX_HISTORY:]
        print(f"{site}: {result['status']} ({result['latency']}ms)")

    # 4. Spremi i ugasi se
    with open(path_json, 'w') as f:
        json.dump(database, f, indent=4)
    print("Završeno.")
else:
    print("Nema stranica za provjeru u config.json.")