import { useState, useEffect } from 'react'
import SALUDO from './components/saludo'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <h1>David</h1>
      <SALUDO/>
      <div>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )
}

export default App