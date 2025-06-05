from flask import Flask, request, jsonify
import numpy as np
from sympy import sympify, lambdify
from flask_cors import CORS
import logging
import re

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/api/graph', methods=['POST'])
def generate_graph_data():
    logger.info("Received POST request with data: %s", request.get_json())
    try:
        data = request.get_json()
        expression = data.get('expression', 'x**2').strip()
        if not expression:
            raise ValueError("Expression cannot be empty.")

        # Tiền xử lý
        expression = re.sub(r'(\d)([a-zA-Z])', r'\1*\2', expression)  # Ví dụ: 2x -> 2*x
        expression = re.sub(r'([a-zA-Z])(\d)', r'\1*\2', expression)  # Ví dụ: x2 -> x*2

        x_range = data.get('range', [-10, 10])
        num_points = data.get('points', 100)

        x = np.linspace(x_range[0], x_range[1], num_points)
        x_sym = sympify(expression)  # Phân tích biểu thức
        f = lambdify('x', x_sym, 'numpy')
        y = f(x)

        points = [{'x': float(x_val), 'y': float(y_val)} for x_val, y_val in zip(x, y)]
        return jsonify({'points': points}), 200
    except ValueError as ve:
        logger.error("Value error: %s", str(ve))
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logger.error("Error processing request: %s", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)