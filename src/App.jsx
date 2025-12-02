import React from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'

export function App() {
  return (
    <main className="app">
      <ThoughtForm />
      <ThoughtList />
    </main>
  )
}