from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

CONFIG_FILE = "/var/www/site-checker/config.json"
RESULTS_FILE = "/var/www/site-checker/ping_results.json"

@app.route('/add-site', methods=['POST'])
def add_site():
    data = request.json
    new_url = data.get('url')
    new_name = data.get('name')

    if not new_url:
        return jsonify({"error": "URL is missing"}), 400

    sites = []
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, 'r') as f:
            try:
                content = json.load(f)
                # KLJUČNI POPRAVAK: Provjera je li učitano lista
                if isinstance(content, list):
                    sites = content
                else:
                    sites = [] # Ako je {} (dict), resetiraj na listu
            except:
                sites = []

    if new_url not in sites:
        sites.append(new_url)
        with open(CONFIG_FILE, 'w') as f:
            json.dump(sites, f, indent=4)
        return jsonify({"message": "Success", "sites": sites}), 200
    
    return jsonify({"message": "Already exists"}), 200

@app.route('/get-results', methods=['GET'])
def get_results():
    if os.path.exists(RESULTS_FILE):
        with open(RESULTS_FILE, 'r') as f:
            try:
                data = json.load(f)
                return jsonify(data), 200
            except:
                return jsonify({}), 200
    return jsonify({}), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001, debug=True)