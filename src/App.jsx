import { useState } from 'react'
import './App.css'

function App() {

  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)


  const rates = {
  USD: {
    USD: { rate: 1, symbol: "$" },
    EUR: { rate: 0.85, symbol: "€" },
    GBP: { rate: 0.74, symbol: "£" },
    JPY: { rate: 110.5, symbol: "¥" },
    CHF: { rate: 0.91, symbol: "CHF" },
    CAD: { rate: 1.26, symbol: "CA$" }
  },
  EUR: {
    USD: { rate: 1.18, symbol: "$" },
    EUR: { rate: 1, symbol: "€" },
    GBP: { rate: 0.87, symbol: "£" },
    JPY: { rate: 129.53, symbol: "¥" },
    CHF: { rate: 1.08, symbol: "CHF" },
    CAD: { rate: 1.48, symbol: "CA$" }
  },
  GBP: {
    USD: { rate: 1.35, symbol: "$" },
    EUR: { rate: 1.15, symbol: "€" },
    GBP: { rate: 1, symbol: "£" },
    JPY: { rate: 149.7, symbol: "¥" },
    CHF: { rate: 1.24, symbol: "CHF" },
    CAD: { rate: 1.7, symbol: "CA$" }
  },
  JPY: {
    USD: { rate: 0.0091, symbol: "$" },
    EUR: { rate: 0.0077, symbol: "€" },
    GBP: { rate: 0.0067, symbol: "£" },
    JPY: { rate: 1, symbol: "¥" },
    CHF: { rate: 0.0083, symbol: "CHF" },
    CAD: { rate: 0.0114, symbol: "CA$" }
  },
  CHF: {
    USD: { rate: 1.1, symbol: "$" },
    EUR: { rate: 0.93, symbol: "€" },
    GBP: { rate: 0.81, symbol: "£" },
    JPY: { rate: 120.48, symbol: "¥" },
    CHF: { rate: 1, symbol: "CHF" },
    CAD: { rate: 1.36, symbol: "CA$" }
  },
  CAD: {
    USD: { rate: 0.79, symbol: "$" },
    EUR: { rate: 0.68, symbol: "€" },
    GBP: { rate: 0.59, symbol: "£" },
    JPY: { rate: 87.72, symbol: "¥" },
    CHF: { rate: 0.74, symbol: "CHF" },
    CAD: { rate: 1, symbol: "CA$" }
  }
}


  // changement du state amount
  const changeAmount = (e) => {
    const value = parseFloat(e.target.value);
    !isNaN(value) ? setAmount(value) : setAmount('');
  }

  // affichage de l'erreur
  const displayError = (message) => {
    setError(message);
    setResult(null);  
  }

  // calcul du montant converti
  const calculate = () => {
    const parsedAmount = parseFloat(amount);
    
    if(parsedAmount < 0){
      displayError("Le montant doit être supérieur à 0");
      return;
    }
    if(isNaN(parsedAmount)){
      console.log("NaN");
      displayError("Le montant doit être un nombre");
      return;
    }
    const result = (parsedAmount * rates[fromCurrency][toCurrency].rate).toFixed(2);
    setResult(
      `${result} ${rates[fromCurrency][toCurrency].symbol}`
    );
    setError(null);
  }

  return (
    <div className='calculator'>
      <h1>Calculateur de devise</h1>
      <input type="number" id="amount" placeholder="Montant" value={amount} onChange={changeAmount}/>
      <div className="flex">
        <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <span>&#8594;</span>
        <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button onClick={calculate}>Calculer</button>
      <div className={error ? "error" : "hide"}>
        {error}
      </div>
      <div className={result ? "result" : "hide"}>
        {result}
      </div>
    </div>
  )
}

export default App
