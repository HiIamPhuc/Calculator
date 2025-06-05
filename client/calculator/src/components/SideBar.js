import React from 'react';
import './SideBar.css';

const SideBar = ({ setMode }) => {
  return (
    <div className="sidebar">
      <button onClick={() => setMode('standard')}>Standard</button>
      <button onClick={() => setMode('scientific')}>Scientific</button>
      <button onClick={() => setMode('currency')}>Currency Converter</button>
      <button onClick={() => setMode('graphing')}>Graphing</button>
    </div>
  );
};

export default SideBar;