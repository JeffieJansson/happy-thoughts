import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { fetchThoughts, postThought, likeThought } from './api'

export function App() {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


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
  }, []) 


  const handleFormSubmit = (message) => {  
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
        setThoughts((previousThoughts) => 
          previousThoughts.map((thought) =>
            thought._id === updatedThought._id ? updatedThought : thought
          )
        )
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