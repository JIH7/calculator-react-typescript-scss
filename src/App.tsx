import { useState } from 'react';

import ThemeChanger from './components/ThemeChanger';
import Screen from './components/Screen';
import Keypad from './components/Keypad';

function App() {
  const [theme, setTheme] = useState('t1')

  return (
    <>
      <main className={theme}>
        <header>
          <h1>calc</h1>
          <ThemeChanger theme={theme} setTheme={setTheme} />
        </header>
        <Screen value={'0'} />
        <Keypad />
      </main>
    </>
  )
}

export default App
