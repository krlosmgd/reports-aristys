import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FinancialDashboard from './components/Dashboard.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <FinancialDashboard />
    </>
  )
}

export default App
