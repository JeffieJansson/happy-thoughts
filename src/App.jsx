import React, { useState } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'

export function App() {
  const [thoughts, setThoughts] = useState([])

  // function to add a new thought
  const addThought = (message) => {
    const newThought = { id: Date.now(), message, createdAt: new Date().toISOString() }
    setThoughts(prev => [newThought, ...prev])
  }

  // render ThoughtForm and ThoughtList
  return (
    <main className="app">
      <ThoughtForm onAdd={addThought} />
      <ThoughtList thoughts={thoughts} />
    </main>
  )
}
