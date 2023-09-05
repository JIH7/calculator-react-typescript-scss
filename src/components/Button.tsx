interface ButtonProps {
  util?: boolean;
  equals?: boolean;
}

function Button({
  util = false,
  equals = false,
} : ButtonProps) {

  return (
    <div className='button-container'>
      <button className={`button ${util ? 'util' : ''} ${equals ? 'equals' : ''}`}>
        0
      </button>
      <div className={`button-shadow ${util ? 'util' : ''} ${equals ? 'equals' : ''}`}>

      </div>
    </div>
  )
}

export default Button
