import Button from './components/Button'

function App() {

  return (
    <>
      <div className={`t3`}>
        <Button />
        <Button util={true} />
        <Button equals={true} />
      </div>
    </>
  )
}

export default App
