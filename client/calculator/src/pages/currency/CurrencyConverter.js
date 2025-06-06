import React, { useState, useEffect } from 'react';
import './CurrencyConverter.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('vnd');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/currencies');
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (err) {
      setError('Failed to fetch currencies');
    }
  };

  const convertCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to convert currency');
    }
    setLoading(false);
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="converter-container">
        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.1"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <button className="swap-button" onClick={handleSwap}>
          ⇄
        </button>

        <div className="input-group">
          <input
            type="number"
            value={result ? result.result : ''}
            readOnly
            placeholder="0"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {loading && <div className="loading">Converting...</div>}
        {error && <div className="error">{error}</div>}
        
        {result && (
          <div className="result-info">
            <p>
              Exchange Rate: 1 {fromCurrency.toUpperCase()} = {result.rate}{' '}
              {toCurrency.toUpperCase()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter; 