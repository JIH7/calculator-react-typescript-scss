import Button from "./Button"

interface KeypadProps {
  updateCalculator?: Function;
}

function Keypad({
  updateCalculator = (input:string) => {
    console.log("No 'updateCalculator()' function set within component 'Keypad'.")
  }
}: KeypadProps) {
  return (
    <section className={`keypad`}>
        <Button
        updateCalculator={updateCalculator}>7</Button>
        <Button
        updateCalculator={updateCalculator}>8</Button>
        <Button
        updateCalculator={updateCalculator}>9</Button>
        <Button
        updateCalculator={updateCalculator}
        util={true}>DEL</Button>
        <Button
        updateCalculator={updateCalculator}>4</Button>
        <Button
        updateCalculator={updateCalculator}>5</Button>
        <Button
        updateCalculator={updateCalculator}>6</Button>
        <Button
        updateCalculator={updateCalculator}>+</Button>
        <Button
        updateCalculator={updateCalculator}>1</Button>
        <Button
        updateCalculator={updateCalculator}>2</Button>
        <Button
        updateCalculator={updateCalculator}>3</Button>
        <Button
        updateCalculator={updateCalculator}>-</Button>
        <Button
        updateCalculator={updateCalculator}>.</Button>
        <Button
        updateCalculator={updateCalculator}>0</Button>
        <Button
        updateCalculator={updateCalculator}>/</Button>
        <Button
        updateCalculator={updateCalculator}>x</Button>
        <Button
        updateCalculator={updateCalculator}
        util={true}
        long={true}>RESET</Button>
        <Button
        updateCalculator={updateCalculator}
        equals={true}
        long={true}>=</Button>
    </section>
  )
}

export default Keypad
