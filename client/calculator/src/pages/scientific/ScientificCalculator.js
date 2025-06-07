import React, { useState } from 'react';
import './ScientificCalculator.css';

const ScientificCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(true);
  const [pendingOperation, setPendingOperation] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [error, setError] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);
  const [pendingScientificOperation, setPendingScientificOperation] = useState(null);

  const performCalculation = async (operation, value, secondValue = null) => {
    try {
      const response = await fetch('http://localhost:5000/api/scientific/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation,
          value: parseFloat(value),
          secondValue: secondValue !== null ? parseFloat(secondValue) : null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDisplay(data.result.toString());
        setWaitingForOperand(true);
        setError(null);
        setWaitingForSecondValue(false);
        setPendingScientificOperation(null);
      } else {
        setError(data.error || 'Calculation error');
        setDisplay('Error');
      }
    } catch (error) {
      setError('Network error');
      setDisplay('Error');
    }
  };

  const inputDigit = (digit) => {
    if (error) {
      setError(null);
      setDisplay(digit);
      setWaitingForOperand(false);
    } else if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }

    if (waitingForSecondValue && pendingScientificOperation) {
      const firstValue = firstOperand;
      const secondValue = digit;
      performCalculation(pendingScientificOperation, firstValue, secondValue);
    }
  };

  const inputDot = () => {
    if (error) {
      setError(null);
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(true);
    setPendingOperation(null);
    setFirstOperand(null);
    setError(null);
    setWaitingForSecondValue(false);
    setPendingScientificOperation(null);
  };

  const performOperation = (nextOperation) => {
    if (error) {
      return;
    }

    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (pendingOperation) {
      const result = calculate(firstOperand, inputValue, pendingOperation);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForOperand(true);
    setPendingOperation(nextOperation);
  };

  const calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
        return firstOperand * secondOperand;
      case '÷':
        if (secondOperand === 0) {
          setError('Cannot divide by zero');
          return 'Error';
        }
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleScientificOperation = (operation) => {
    if (error) {
      return;
    }

    const currentValue = parseFloat(display);

    // Operations that need two values
    if (operation === 'power' || operation === 'mod') {
      setFirstOperand(currentValue);
      setWaitingForSecondValue(true);
      setPendingScientificOperation(operation);
      setWaitingForOperand(true);
      return;
    }

    // Single value operations
    performCalculation(operation, currentValue);
  };

  return (
    <div className="scientific-calculator">
      <div className="display">{error || display}</div>
      <div className="keypad">
        <div className="function-keys">
          <button onClick={() => handleScientificOperation('power')}>x^y</button>
          <button onClick={() => handleScientificOperation('sqrt')}>√x</button>
          <button onClick={() => handleScientificOperation('exp')}>exp</button>
          <button onClick={() => handleScientificOperation('log')}>log</button>
          <button onClick={() => handleScientificOperation('ln')}>ln</button>
        </div>
        <div className="trigonometry-keys">
          <button onClick={() => handleScientificOperation('sin')}>sin</button>
          <button onClick={() => handleScientificOperation('cos')}>cos</button>
          <button onClick={() => handleScientificOperation('tan')}>tan</button>
          <button onClick={() => handleScientificOperation('factorial')}>n!</button>
          <button onClick={() => handleScientificOperation('mod')}>mod</button>
        </div>
        <div className="number-keys">
          <button onClick={() => inputDigit('7')}>7</button>
          <button onClick={() => inputDigit('8')}>8</button>
          <button onClick={() => inputDigit('9')}>9</button>
          <button onClick={() => performOperation('÷')}>÷</button>
          <button onClick={clearDisplay}>C</button>

          <button onClick={() => inputDigit('4')}>4</button>
          <button onClick={() => inputDigit('5')}>5</button>
          <button onClick={() => inputDigit('6')}>6</button>
          <button onClick={() => performOperation('×')}>×</button>
          <button onClick={() => setDisplay(String(-parseFloat(display)))}>±</button>

          <button onClick={() => inputDigit('1')}>1</button>
          <button onClick={() => inputDigit('2')}>2</button>
          <button onClick={() => inputDigit('3')}>3</button>
          <button onClick={() => performOperation('-')}>-</button>
          <button onClick={() => performOperation('=')}>=</button>

          <button onClick={() => inputDigit('0')}>0</button>
          <button onClick={inputDot}>.</button>
          <button onClick={() => handleScientificOperation('pi')}>π</button>
          <button onClick={() => performOperation('+')}>+</button>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator; 