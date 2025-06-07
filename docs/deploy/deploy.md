# Deployment Guide for Web Calculator

## Part 1: Run the Python Backend with `virtualenv` (one virtual environment per service)

The project includes separate services, for example, the graphing service: `server/graphing`.

### Step 1: Create a Virtual Environment for Each Service

#### 1. Navigate to the service directory

```bash
cd server/graphing
```

#### 2. Create a virtual environment using `virtualenv`

```bash
virtualenv venv
```

> This command creates a `venv/` directory in the current folder.

#### 3. Activate the virtual environment

* **On Windows**:

  ```bash
  venv\Scripts\activate
  ```

* **On macOS/Linux**:

  ```bash
  source venv/bin/activate
  ```

> After activation, you will see `(venv)` appear at the beginning of your terminal prompt.

#### 4. Install required libraries

* If there's a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

#### 5. Repeat the above steps for other services under `server/`

Other services include `currency-converter` and `scientific-calculator`.

For Windows:

```bash
cd server/currency-converter
virtualenv venv
venv\Scripts\activate
```

```bash
cd server/scientific-calculator
virtualenv venv
venv\Scripts\activate
```

---

### Step 2: Run the Backend

The main file for each service is `app.py`:

```bash
cd server/name-of-service
```

```bash
python app.py
```

> 📡 By default, the server runs at `http://0.0.0.0:5001` or `http://127.0.0.1:5001`.

---

### Step 3: Deactivate the Virtual Environment

```bash
deactivate
```

---

## Part 2: Run the React Frontend (Node.js)

The frontend is located in the `client/calculator` directory.

### Step 1: Install Node.js (if not already installed)

* Download from: [https://nodejs.org](https://nodejs.org)

### Step 2: Install frontend dependencies

```bash
cd client/calculator
npm install
```

### Step 3: Run the React application

```bash
npm start
```

> The app will automatically open at `http://localhost:3000`

---

## Quick Command Summary Table

| Action                             | Example Command                   |
| ---------------------------------- | --------------------------------- |
| Create virtual environment         | `virtualenv venv`                 |
| Activate virtual env (Windows)     | `venv\Scripts\activate`           |
| Activate virtual env (macOS/Linux) | `source venv/bin/activate`        |
| Install Python dependencies        | `pip install -r requirements.txt` |
| Run backend                        | `python app.py`                   |
| Deactivate virtual environment     | `deactivate`                      |
| Install React frontend libraries   | `npm install`                     |
| Run React frontend                 | `npm start`                       |

---