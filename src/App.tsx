import { useState, useEffect } from 'react';

import Calculator from './components/Calculator';
import CalculatorData from './components/CalculatorData';

import KeyListener from './components/KeyListener';

import ThemeChanger from './components/ThemeChanger';
import Screen from './components/Screen';
import Keypad from './components/Keypad';

const loadColorPref = ():string => {
  if (localStorage.getItem('colorPref') !== null) {
    const colorPref = localStorage.getItem('colorPref');
    return colorPref ?? 't1';
  }

  return 't1';
}

function App() {
  const [theme, setTheme] = useState(loadColorPref())
  const [calcData, setCalcData] = useState(new CalculatorData())

  useEffect(() => {
    localStorage.setItem('colorPref', theme);
  }, [theme])

  const processKeyboardInput = (key:string) => {
    const validChars = '0123456789xX+/=-.';
    if(key === '*') {
      updateCalculator('x');
      return;
    } else if (key === "Enter") {
      updateCalculator('=')
    } else if (key === 'Backspace' || key === "Delete") {
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
    // Calculator object contains functions for operating on data. Seperated from data so spread operator can be used to pass by value without losing methods
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