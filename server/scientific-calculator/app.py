from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

@app.route('/api/scientific/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        operation = data.get('operation')
        value = float(data.get('value', 0))
        second_value = data.get('secondValue')
        
        if second_value is not None:
            second_value = float(second_value)

        result = 0
        if operation == 'square':
            result = value ** 2
        elif operation == 'sqrt':
            if value < 0:
                raise ValueError("Cannot calculate square root of negative number")
            result = math.sqrt(value)
        elif operation == 'exp':
            result = math.exp(value)
        elif operation == 'log':
            if value <= 0:
                raise ValueError("Cannot calculate logarithm of non-positive number")
            result = math.log10(value)
        elif operation == 'ln':
            if value <= 0:
                raise ValueError("Cannot calculate natural logarithm of non-positive number")
            result = math.log(value)
        elif operation == 'sin':
            result = math.sin(math.radians(value))
        elif operation == 'cos':
            result = math.cos(math.radians(value))
        elif operation == 'tan':
            # Check for undefined tangent values (90°, 270°, etc.)
            if abs(math.cos(math.radians(value))) < 1e-10:
                raise ValueError("Tangent is undefined at this angle")
            result = math.tan(math.radians(value))
        elif operation == 'power':
            if second_value is None:
                raise ValueError("Second value is required for power operation")
            result = value ** second_value
        elif operation == 'factorial':
            if value < 0 or not value.is_integer():
                raise ValueError("Factorial is only defined for non-negative integers")
            result = math.factorial(int(value))
        elif operation == 'mod':
            if second_value is None:
                raise ValueError("Second value is required for modulo operation")
            if second_value == 0:
                raise ValueError("Cannot perform modulo by zero")
            result = value % second_value
        elif operation == 'pi':
            result = math.pi
        else:
            raise ValueError(f"Unknown operation: {operation}")
        
        return jsonify({
            'success': True,
            'result': result
        })
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f"Calculation error: {str(e)}"
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 