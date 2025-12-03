import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import './index.css'

export function App() {
  // List of thoughts
  const [thoughts, setThoughts] = useState([])

  // A small tick to force re-render so "time ago" updates automatically
  const [tick, setTick] = useState(0) // initial tick value

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1)
    }, 30000) // update every 30 seconds

    return () => clearInterval(id)
  }, [])

  // Add a new thought to the top of the list
  const addThought = (message) => {
    const newThought = {
      id: Date.now(),
      message,
      createdAt: new Date().toISOString(), // current time in ISO 8601 format
    }
    setThoughts((prev) => [newThought, ...prev])
  }

  return (
    <main className="app">
      <ThoughtForm onAdd={addThought} /> {/*pass addThought as onAdd prop*/}
      <ThoughtList thoughts={thoughts} tick={tick} /> {/*pass thoughts and tick as props*/}
    </main>
  )
}