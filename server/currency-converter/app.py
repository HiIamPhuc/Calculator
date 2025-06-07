from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

@app.route('/api/currencies', methods=['GET'])
def get_currencies():
    response = requests.get(f"{API_BASE_URL}.json")
    if response.status_code == 200:
        currencies = response.json()
        return jsonify(currencies)
    return jsonify({"error": "Failed to fetch currencies"}), 500

@app.route('/api/convert', methods=['GET'])
def convert_currency():
    from_currency = request.args.get('from', '').lower()
    to_currency = request.args.get('to', '').lower()
    amount = float(request.args.get('amount', 1))

    response = requests.get(f"{API_BASE_URL}/{from_currency}.json")
    if response.status_code == 200:
        rate = response.json()[from_currency][to_currency]
        converted_amount = amount * rate
        return jsonify({
            "from": from_currency,
            "to": to_currency,
            "amount": amount,
            "rate": rate,
            "result": converted_amount
        })
    return jsonify({"error": "Failed to convert currency"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 