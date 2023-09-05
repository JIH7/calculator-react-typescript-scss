import Button from "./Button"

function Keypad() {
  return (
    <section className={`keypad`}>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button util={true}>DEL</Button>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button>+</Button>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button>-</Button>
        <Button>.</Button>
        <Button>0</Button>
        <Button>/</Button>
        <Button>x</Button>
        <Button util={true} long={true}>RESET</Button>
        <Button equals={true} long={true}>=</Button>
    </section>
  )
}

export default Keypad
