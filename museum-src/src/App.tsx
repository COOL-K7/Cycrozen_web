import { useState } from 'react'
import Landing from './components/Landing'
import Museum from './components/Museum'

export default function App() {
  const [entered, setEntered] = useState(false)

  if (!entered) {
    return <Landing onEnter={() => setEntered(true)} />
  }

  return <Museum onExit={() => setEntered(false)} />
}
