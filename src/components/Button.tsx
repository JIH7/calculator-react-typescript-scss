interface ButtonProps {
  util?: boolean;
  equals?: boolean;
  long?:boolean;
  updateCalculator?:Function;
  children?: string;
}

function Button({
  util = false,
  equals = false,
  long = false,
  updateCalculator = (input:string) => {
    console.log(`No 'updateCalculator' function set within component 'button'. Button text is '${input}'`);
  },
  children = '',
} : ButtonProps) {

  const handleClick = () => {
    updateCalculator(children);
  }

  return (
    <button
    onClick={handleClick}
    className={`button ${util ? 'util' : ''} ${equals ? 'equals' : ''} ${long ? 'long' : ''}`}>
      {children}
    </button>
  )
}

export default Button
