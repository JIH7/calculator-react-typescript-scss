import { useState, useEffect } from 'react';

import Calculator from './components/Calculator';
import CalculatorData from './components/CalculatorData';

import KeyListener from './components/KeyListener';

import ThemeChanger from './components/ThemeChanger';
import Screen from './components/Screen';
import Keypad from './components/Keypad';

function App() {
  const [theme, setTheme] = useState('t1')
  const [calcData, setCalcData] = useState(new CalculatorData())

  const processKeyboardInput = (key:string) => {
    const validChars = '0123456789xX/=-.';
    console.log(key)
    if(key === '*') {
      updateCalculator('x');
      return;
    } else if (key === "Enter") {
      updateCalculator('=')
    } else if (key === 'Backspace') {
      updateCalculator('DEL');
      return;
    } else if (key.toLowerCase() === "r") {
      updateCalculator("RESET");
      return;
    } else if (validChars.includes(key)) {
      updateCalculator(key.toLowerCase())
      return;
    }
  }

  const updateCalculator = (input: string) => {
    console.log("Updating calculator")
    const calculator = new Calculator(calcData);

    calculator.process(input);

    const data = calculator.data;

    setCalcData({...data});
  }

  return (
    <>
      <main className={theme}>
        <KeyListener onKeyPress={processKeyboardInput} />
        <header>
          <h1>calc</h1>
          <ThemeChanger theme={theme} setTheme={setTheme} />
        </header>
        <Screen value={calcData.displayValue} />
        <Keypad updateCalculator={updateCalculator} />
      </main>
    </>
  )
}

export default App
