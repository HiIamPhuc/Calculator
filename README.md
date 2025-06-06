# Scientific Calculator

A modern scientific calculator with a React frontend and Flask backend.

## Project Structure

```
Calculator/
├── client/
│   └── calculator/
│       └── src/
│           └── pages/
│               └── scientific/
│                   ├── ScientificCalculator.js
│                   └── ScientificCalculator.css
└── server/
    └── scientific-calculator/
        ├── app.py
        └── requirements.txt
```

## Setup Instructions

### Backend Setup

1. Navigate to the server directory:
```bash
cd server/scientific-calculator
```

2. Create a virtual environment (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The server will start on http://localhost:5000

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client/calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at http://localhost:3000

## Features

- Basic arithmetic operations (+, -, ×, ÷)
- Scientific functions:
  - Square (x²)
  - Square root (√x)
  - Exponential (exp)
  - Logarithm (log, ln)
  - Trigonometric functions (sin, cos, tan)
  - Factorial (n!)
  - Modulo (mod)
- Memory functions
- Error handling
- Responsive design

## API Endpoints

### POST /api/scientific/calculate
Performs scientific calculations

Request body:
```json
{
  "operation": "string",
  "value": "number",
  "secondValue": "number" (optional)
}
```

Response:
```json
{
  "success": "boolean",
  "result": "number"
}
```