import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { fetchThoughts, postThought, likeThought, deleteThought, editThought } from './api'

export function App() {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  useEffect(() => { 
    fetchThoughts()
      .then((data) => {
        setThoughts(data.response) 
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
      .then((data) => { 
        setThoughts((previousThoughts) => [data.response, ...previousThoughts]) 
      })
      .catch((error) => { 
        console.error("Failed to submit thought:", error)
      })
  }

  
  const handleLike = (thoughtId) => { 
    likeThought(thoughtId) 
      .then((data) => {
        setThoughts((previousThoughts) => 
          previousThoughts.map((thought) =>
            thought._id === data.response._id ? data.response : thought
          )
        )
      })
      .catch((error) => {
        console.error('Failed to like thought:', error)
      })
  }

  const handleDelete = (thoughtId) => {
    deleteThought(thoughtId)
    .then(() => {
      setThoughts((previousThoughts) => 
        previousThoughts.filter((thought) => thought._id !== thoughtId)
      )
    })
    .catch((error) => {
      console.error('Failed to delete thought:', error)
    })
  }

  const handleEditThought = (thoughtId, newMessage) => {
    editThought(thoughtId, newMessage)
    .then((data) => {
      setThoughts((previousThoughts) => 
        previousThoughts.map((thought) =>
          thought._id === data.response._id ? data.response : thought
        )
      )
    })
    .catch((error) => {
      console.error('Failed to edit thought:', error)
    })
  }
4
  if (loading) {
    return <div className="loading">Loading happy thoughts...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return ( 
    <main className="app">
      <ThoughtForm 
        onAdd={handleFormSubmit} />
      <ThoughtList 
        thoughts={thoughts} 
        onLike={handleLike}
        onDelete={handleDelete}
        onEdit={handleEditThought}
      />
    </main>
  )
}