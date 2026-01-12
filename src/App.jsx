import { useState } from 'react'
import './App.css'
import RootRoutes from './routes/RootRoutes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>

    <RootRoutes />


    </div>
  )
}

export default App
