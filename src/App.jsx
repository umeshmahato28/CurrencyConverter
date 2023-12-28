import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [curr, setCurr] = useState("");
  const [tocurr, setToCurr] = useState("");
  const [fromdata, setFromData] = useState("");
  const [todata, setToData] = useState("");
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const result = await response.json();
        setCurrencyData(Object.entries(result.rates).map(([key, value]) => ({ key, value })));
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []); // The empty dependency array means this effect will run once after the initial render

  function convert() {
    const toExchangeRate = currencyData.find(item => item.key === curr)?.value || 1.0;
    const exchangeRate = currencyData.find(item => item.key === tocurr)?.value || 1.0;
    const data = Number((exchangeRate / toExchangeRate) *  fromdata);
    setToData(data || ""); // Set to empty string if data is NaN
  }

  return (
    <>
      <div className='bg-green-200 flex h-screen items-center'>
        <div className='w-[29rem] h-[29rem] p-5 m-auto rounded-md shadow-2xl shadow-emerald-800/75 bg-blue-200'>
          <h2 className='p-4 mt-9 m-4 mb-8 text-center font-bold rounded-xl shadow-lg shadow-red-400/75 bg-red-300'>CURRENCY CONVERTER </h2>
          <div className='m-4 space-y-3'>
            <span className='p-2 text-green-600 font-semibold' text=""> From </span>
            <select className='font-medium rounded-sm shadow-md' value={curr} onChange={(e) => { setCurr(e.target.value) }}>
              {currencyData.map((result) => (
                <option key={result.key} value={result.key}>
                  {result.key}
                </option>
              ))}
            </select>
            <br />
            <input className='p-2 w-full items-center border border-blue-500 rounded-md' type="number" min='0' onChange={(e) => { setFromData(e.target.value) }} /><br />
          </div>

          <div className='m-4 space-y-3'>
            <label className='p-2 text-green-600 font-semibold' htmlFor="">To </label>
            <select className='font-medium rounded-sm shadow-md' value={tocurr} onChange={(e) => { setToCurr(e.target.value) }}>
              {currencyData.map((result) => (
                <option key={result.key} value={result.key}>
                  {result.key}
                </option>
              ))}
            </select>
            <br />
            <input className='p-2 w-full items-center border border-blue-500 rounded-md' type="number" value={todata} id="amount" readOnly /><br />
          </div>
          <button className="ml-44 bg-blue-300 shadow-lg shadow-blue-500/75 rounded-lg p-2 m-3" onClick={convert}>
            CONVERT
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
