import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { fetchThoughts, postThought, likeThought } from './api'
import './index.css'

export function App() {
  // === STATE MANAGEMENT ===
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // === INITIAL DATA FETCH ===
  
  useEffect(() => { // Runs once on component mount
    fetchThoughts() // Fetch thoughts from API
      .then((data) => {
        setThoughts(data) // Populate thoughts array with API data
        setError(null) // Clear any previous errors
      })
      .catch((error) => {
        console.error("Failed to fetch thoughts:", error) // Log for debugging
        setError("Failed to load thoughts. Please try again later.") // User-friendly message
      })
      .finally(() => { // ensure loading stops regardless of success or failure
        setLoading(false) // Stop loading whether success or failure
      })
  }, []) // Empty array = run only once on mount, never re-run

  // === EVENT HANDLERS ===

  const handleFormSubmit = (message) => {  //handleFormSubmit handles new thought submissions from ThoughtForm
    postThought(message) // Send POST request to API
      .then((newThought) => { // Receive newly created thought from API
        setThoughts((previousThoughts) => [newThought, ...previousThoughts]) // Prepend new thought to existing array
      })
      .catch((error) => { // if POST fails catch the error and log it
        console.error("Failed to submit thought:", error)
      })
  }

  // handleLike processes like actions from ThoughtCard components
  const handleLike = (thoughtId) => { // Receives the ID of the thought to like
    likeThought(thoughtId) // Send POST request to like endpoint
      .then((updatedThought) => {
        setThoughts((previousThoughts) => // Update thoughts state with new like count
          previousThoughts.map((thought) => // Map over existing thoughts
            thought._id === updatedThought._id ? updatedThought : thought // Replace only the liked thought with updated data
          )
        )
      })
      .catch((error) => {
        console.error('Failed to like thought:', error)
      })
  }

  // === CONDITIONAL RENDERING ===
 
  if (loading) {
    return <div className="loading">Loading happy thoughts...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  // === MAIN RENDER ===
 
  return ( 
    <main className="app">
      <ThoughtForm onAdd={handleFormSubmit} />
      <ThoughtList thoughts={thoughts} onLike={handleLike} />
    </main>
  )
}