import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import './index.css'

const API_URL = 'https://happy-thoughts-api-4ful.onrender.com/thoughts'

export function App() {
   // List of thoughts
  const [thoughts, setThoughts] = useState([])

  // Fetch existing thoughts when the component mounts
  useEffect(() => {
    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then((res) => res.json())
      .then((data) => setThoughts(data))
      .catch((error) => {

        console.error("Failed to fetch thoughts:", error)
      })
  }, [])
  

const handleFormSubmit = (message) => {
// Post new thought to the API
  fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", {
    method: "POST",
    body: JSON.stringify({
      message: message,
    }),
    headers: { "Content-Type": "application/json" },
  })

    .then((res) => {
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      return res.json();
    })
    
    .then((newThought) => {
      setThoughts((previousThoughts) => [newThought, ...previousThoughts])
    }) 
    .catch((error) => {
      console.error("Failed to submit thought:", error);
    });

};


const handleLike = (thoughtId) => {
    fetch(`${API_URL}/${thoughtId}/like`, { method: 'POST' }) //when liking, send POST to hearts endpoint
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Like request failed with status ${res.status}`)
        }
        return res.json()
      })
      .then((updatedThought) => {
        // Update the specific thought in state
        setThoughts((prev) => prev.map((t) => (t._id === updatedThought._id ? updatedThought : t))) //replace old thought with updated one
      })
      .catch((err) => {
        console.error('Failed to like thought:', err)
      })
  }
  return ( 
    <main className="app">
      <ThoughtForm onAdd={handleFormSubmit} />
      <ThoughtList thoughts={thoughts} onLike={handleLike} />
    </main>
  )
}