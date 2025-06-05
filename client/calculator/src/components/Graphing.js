import React, { useState, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';
import './Graphing.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const Graphing = () => {
  const [graphData, setGraphData] = useState({ labels: [], datasets: [] });
  const [expression, setExpression] = useState(''); // Bắt đầu rỗng
  const [error, setError] = useState(null);

  const fetchGraphData = useCallback(async () => {
    if (!expression.trim()) {
      setError('Please enter expression before drawing.');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5001/api/graph', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression, range: [-20, 20], points: 200 }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      const points = data.points;
      const labels = points.map(point => point.x);
      const values = points.map(point => point.y);

      setGraphData({
        labels,
        datasets: [
          {
            label: `Hàm: ${expression}`,
            data: values,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      });
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    }
  }, [expression]);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setGraphData({ labels: [], datasets: [] });
      setError(null);
    } else if (value === '=') {
      fetchGraphData();
    } else if (value === '+-') {
      setExpression(prev => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
    } else if (value === '⌫') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === 'x^y') {
      setExpression(prev => prev + '^');
    } else if (value === 'π') {
      setExpression(prev => prev + 'pi');
    } else if (value === 'e') {
      setExpression(prev => prev + 'e');
    } else if (value === '|x|') {
      setExpression(prev => prev + 'abs(');
    } else if (value === '√x') {
      setExpression(prev => prev + 'sqrt(');
    } else if (value === 'x²') {
      setExpression(prev => prev + '^2');
    } else if (value === '10^x') {
      setExpression(prev => prev + '10^');
    } else if (value === 'log') {
      setExpression(prev => prev + 'log(');
    } else if (value === 'ln') {
      setExpression(prev => prev + 'ln(');
    }else if (value === 'sin') {
      setExpression(prev => prev + 'sin(');
    }else if (value === 'cos') {
      setExpression(prev => prev + 'cos(');
    }else if (value === 'tan') {
      setExpression(prev => prev + 'tan(');
    } else if (value === '2ⁿ') {
      setExpression(prev => prev + '2^');
    }else {
      setExpression(prev => prev + value);
    }
  };

  const graphButtons = [
    ['2ⁿ', 'π', 'e', 'C', '⌫'],
    ['x²', '1/x', '|x|', '√x', 'x^y'],
    ['10^x', 'log', 'ln', '(', ')'],
    ['7', '8', '9', '/', '*'],
    ['4', '5', '6', '-', '+'],
    ['1', '2', '3', '+-', '%'],
    ['0', '.', '^', '=', 'sin'],
    ['x', 'y','z', 'cos', 'tan'],
  ];

  return (
    <div className="graphing-container">
      <h2>Graph of a function with one variable</h2>
      <div className="input-container">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="Enter expression (ví dụ: x^2, sin(x),...)"
        />
        <button onClick={fetchGraphData}>Graphing</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="graphing-content">
        <div className="button-box">
          {graphButtons.flat().map((btn, i) => (
            <button key={i} className="graph-button" onClick={() => handleButtonClick(btn)} disabled={!btn}>
              {btn || ''}
            </button>
          ))}
        </div>
        <div className="chart-container">
          <Line
            data={graphData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: { type: 'linear', position: 'bottom' },
                y: { type: 'linear' },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Graphing;