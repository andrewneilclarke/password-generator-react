import { useState } from 'react';
import Switch from "react-switch"
import './App.css';

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('-------')
  const lower = true
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [cases, setCases] = useState(false)
  const changeLength = (e) => {
    setLength(e.target.value)
  }

  const getRandomLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
  }
  const getRandomUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
  }
  const getRandomNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
  }

  const getRandomSymbol = () => {
    const symbolList = '!"%&@;:-';
    return symbolList[Math.floor(Math.random() * symbolList.length)]
  }

  const randomFunctions = {
    lower: getRandomLower,
    cases: getRandomUpper,
    numbers: getRandomNumber,
    symbols: getRandomSymbol
  }

  // console.log(getRandomLower(), getRandomNumber(), getRandomSymbol(), getRandomUpper())

  const generatePassword = () => {
    let pass = '';
    const typesCount = lower + cases + numbers + symbols;
    let options = [{ lower }, { cases }, { numbers }, { symbols }].filter(item => Object.values(item)[0]);

    // for (let i = 0; i < length; i += typesCount) {
    //   options.forEach(option => {
    //     const optionName = Object.keys(option)[0];
    //     // console.log(optionName)
    //     pass += randomFunctions[optionName]();
    //   })
    // };

    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * options.length);
      pass += randomFunctions[Object.keys(options[rand])[0]]();
      // console.log(optionName)
    };

    setPassword(pass)
  }

  const copyToClip = () => {
    alert(`${password} copied to clipboard`)
    navigator.clipboard.writeText(password)
  }

  return (
    <div className="container">
      <h3 className="title">AC Password Generator</h3>
      <div className="content">
        <div className="section length">Password Length
          <div className="slidecontainer">
            <input onChange={changeLength} type="range" min="8" max="20" value={length} />
          </div>
          {length}
        </div>
        <div className="section">Uppercase
          <Switch onChange={() => setCases(!cases)} checked={cases} onColor="#0A4B80" />
        </div>
        <div className="section">Numbers
          <Switch onChange={() => setNumbers(!numbers)} checked={numbers} onColor="#0A4B80" />
        </div>
        <div className="section">Symbols
          <Switch onChange={() => setSymbols(!symbols)} checked={symbols} onColor="#0A4B80" />
        </div>
      </div>
      <button onClick={generatePassword}>Create</button>
      <p className="password">{password}</p>
      <button onClick={copyToClip}>Copy</button>
    </div>
  );
}
export default App;
