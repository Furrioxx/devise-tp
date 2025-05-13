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
      EUR: {rate : 0.85, symbol: "€"}, 
      USD: {rate : 1, symbol: "$"} 
    },
    EUR: {
      EUR: {rate : 1, symbol: "€"}, 
      USD: {rate : 1.18, symbol: "$"} 
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
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <span>&#8594;</span>
        <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
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
