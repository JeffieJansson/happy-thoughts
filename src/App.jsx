import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { fetchThoughts, postThought, likeThought } from './api'
import './index.css'

export function App() {
  // List of thoughts
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch existing thoughts when the component mounts
  useEffect(() => {
    fetchThoughts()
      .then((data) => {
        setThoughts(data)
        setError(null)
      })
      .catch((error) => {
        console.error("Failed to fetch thoughts:", error)
        setError("Failed to load thoughts. Please try again later.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, []) // Empty dependency array means this runs once on mount

  const handleFormSubmit = (message) => {
    // Post new thought to the API
    postThought(message)
      .then((newThought) => {
        setThoughts((previousThoughts) => [newThought, ...previousThoughts])
      })
      .catch((error) => {
        console.error("Failed to submit thought:", error)
      })
  }

  const handleLike = (thoughtId) => {
    likeThought(thoughtId)
      .then((updatedThought) => {
        // Update the specific thought in state
        setThoughts((previousThoughts) => previousThoughts.map((thought) => (thought._id === updatedThought._id ? updatedThought : thought)))
      })
      .catch((error) => {
        console.error('Failed to like thought:', error)
      })
  }

  if (loading) {
    return <div className="loading">Loading happy thoughts...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return ( 
    <main className="app">
      <ThoughtForm onAdd={handleFormSubmit} />
      <ThoughtList thoughts={thoughts} onLike={handleLike} />
    </main>
  )
}