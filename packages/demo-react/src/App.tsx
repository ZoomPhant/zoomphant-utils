import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function CrashError() {
  console.log(Object.create(null), 1, 2, 3, 4);
  throw new Error('App crashed!');

  return null;
}

function CrashReferenceError() {
  throw new ReferenceError("App crashed with ReferenceError")

  return null;
}


function App() {
  const [count, setCount] = useState(0)
  const [crash, setCrash] = useState(0);
  const handleCrash = (type: number) => {
    setCrash(type);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="button-group">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <button onClick={() => handleCrash(1)}>
            Throw Error
          </button>
          <button onClick={() => handleCrash(2)}>
            Throw ReferenceError
          </button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {crash === 1 && <CrashError />}
      {crash === 2 && <CrashReferenceError />}
    </>
  )
}

export default App
