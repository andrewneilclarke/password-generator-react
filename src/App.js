import { useState } from 'react';
import Switch from "react-switch"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';

function App() {
  const [length, setLength] = useState(8)
  const [password, setPassword] = useState('-------')
  const lower = true
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [cases, setCases] = useState(false)
  const [copied, setCopied] = useState(false)

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

  const incrementLength = () => {
    if (length < 16) {
      setLength(length + 1)
    }
  }
  const decrementLength = () => {
    if (length > 6) {
      setLength(length - 1)
    }
  }

  // console.log(getRandomLower(), getRandomNumber(), getRandomSymbol(), getRandomUpper())

  const generatePassword = () => {
    copied && setCopied(false)
    let pass = '';
    // const typesCount = lower + cases + numbers + symbols;
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


  return (
    <div className="app">
      <h3 className="title">AC Password Creator</h3>
      <div className="content">
        <div className="section length">
          <h4>Password Length</h4>
          <div className="length-buttons">
            <button onClick={decrementLength}>-</button>
            <button onClick={incrementLength}>+</button>
          </div>
          <p>{length}</p>
        </div>


        <div className="section">
          <p>Uppercase</p>

          <Switch onChange={() => setCases(!cases)} checked={cases} onColor="#0A4B80" />
        </div>
        <div className="section">
          <p>Numbers</p>
          <Switch onChange={() => setNumbers(!numbers)} checked={numbers} onColor="#0A4B80" />
        </div>
        <div className="section">
          <p>Symbols</p>
          <Switch onChange={() => setSymbols(!symbols)} checked={symbols} onColor="#0A4B80" />
        </div>
      </div>
      <button onClick={generatePassword}>Create</button>
      <p className="password">{password}</p>
      {/* <button onClick={copyToClip}>Copy</button> */}
      <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
        <button className="copy" onCopy={() => setCopied(true)}>Copy</button>
      </CopyToClipboard>
      {copied && <p style={{ fontSize: 'small', marginTop: '1em' }}>Copied!</p>}
    </div >
  );
}
export default App;
