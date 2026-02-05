import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { fetchThoughts, postThought, likeThought, deleteThought, editThought } from './api'
import  { LoginForm }  from './components/LoginForm'
import  { SignupForm }  from './components/SignupForm'
import './styles/authForm.css'

export function App() {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)


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

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, []) 

  const handleFormSubmit = (message) => {  
    postThought(message, user?.accessToken) 
      .then((data) => { 
        setThoughts((previousThoughts) => [data.response, ...previousThoughts]) 
        setError(null)
      })
      .catch((error) => { 
        console.error("Failed to submit thought:", error)
        setError("Failed to submit thought. Please try again.")
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
        setError(null)
      })
      .catch((error) => {
        console.error('Failed to like thought:', error)
        setError("Failed to like thought. Please try again.")
      })
  }

  const handleDelete = (thoughtId) => {
    deleteThought(thoughtId, user?.accessToken)
    .then(() => {
      setThoughts((previousThoughts) => 
        previousThoughts.filter((thought) => thought._id !== thoughtId)
      )
      setError(null)
    })
    .catch((error) => {
      console.error('Failed to delete thought:', error)
      setError("Failed to delete thought. Please try again.")
    })
  }

  const handleEditThought = (thoughtId, newMessage) => {
    editThought(thoughtId, newMessage, user?.accessToken)
    .then((data) => {
      setThoughts((previousThoughts) => 
        previousThoughts.map((thought) =>
          thought._id === data.response._id ? data.response : thought
        )
      )
      setError(null)
    })
    .catch((error) => {
      console.error('Failed to edit thought:', error)
      setError("Failed to edit thought. Please try again.")
    })
  }

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }
  if (loading) {
    return <div className="loading">Loading happy thoughts...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return ( 
    <main className="app">
        {user ? (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ) : (
          
          <>
          <div className="auth-container">
            <SignupForm handleLogin={handleLogin} />
            <LoginForm handleLogin={handleLogin} />
              </div>
          </>
        )}
    
      <ThoughtForm 
        onAdd={handleFormSubmit} />
      <ThoughtList 
        thoughts={thoughts} 
        onLike={handleLike}
        onDelete={handleDelete}
        onEdit={handleEditThought}
        user={user}
      />
    </main>
  )
}