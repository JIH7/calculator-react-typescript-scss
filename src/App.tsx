import { useState, useEffect } from 'react';

import Calculator from './components/Calculator';

import ThemeChanger from './components/ThemeChanger';
import Screen from './components/Screen';
import Keypad from './components/Keypad';

function App() {
  const [theme, setTheme] = useState('t1')
  const [calculator, setCalculator] = useState(new Calculator())

  useEffect(() => {
    console.log(calculator)
  }, [calculator])

  const updateCalculator = (input: string) => {
    setCalculator((prevCalculator) => prevCalculator.process(input))
  }

  return (
    <>
      <main className={theme}>
        <header>
          <h1>calc</h1>
          <ThemeChanger theme={theme} setTheme={setTheme} />
        </header>
        <Screen value={calculator.displayValue} />
        <Keypad updateCalculator={updateCalculator} />
      </main>
    </>
  )
}

export default App
