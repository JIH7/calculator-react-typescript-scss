interface ButtonProps {
  util?: boolean;
  equals?: boolean;
  long?:boolean;
  children?: string;
}

function Button({
  util = false,
  equals = false,
  long = false,
  children = '',
} : ButtonProps) {

  return (
    <button className={`button ${util ? 'util' : ''} ${equals ? 'equals' : ''} ${long ? 'long' : ''}`}>
      {children}
    </button>
  )
}

export default Button
