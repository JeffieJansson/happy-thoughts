import React, { useState, useEffect } from 'react'
import { ThoughtForm } from './components/ThoughtForm'
import { ThoughtList } from './components/ThoughtList'
import { fetchThoughts, postThought, likeThought } from './api'
import './index.css'

/**
 * App Component - Main application container
 * 
 * This is the top-level component that manages all global application state
 * and coordinates between the form (ThoughtForm) and display (ThoughtList) components.
 * 
 * State Management:
 * - thoughts: Array of all happy thoughts fetched from the API
 * - loading: Boolean to show loading state during initial data fetch
 * - error: String with user-friendly error message (null when no error)
 * 
 * Component Architecture:
 * - ThoughtForm: Receives handleFormSubmit to create new thoughts
 * - ThoughtList: Receives thoughts array and handleLike to display and interact with thoughts
 * 
 * Data Flow:
 * 1. Initial fetch: API -> setThoughts -> ThoughtList renders
 * 2. New thought: Form -> handleFormSubmit -> API -> prepend to thoughts array
 * 3. Like thought: Card -> handleLike -> API -> update specific thought in array
 */
export function App() {
  // === STATE MANAGEMENT ===
  
  /**
   * thoughts: Array of thought objects from the API
   * Each thought contains: _id (unique), message (string), hearts (number), createdAt (ISO date)
   */
  const [thoughts, setThoughts] = useState([])
  
  /**
   * loading: Tracks the loading state during initial data fetch
   * true = showing loading message, false = data loaded or error occurred
   */
  const [loading, setLoading] = useState(true)
  
  /**
   * error: Stores user-friendly error messages for display
   * null = no error, string = error message to show user
   */
  const [error, setError] = useState(null)

  // === INITIAL DATA FETCH ===
  
  /**
   * useEffect with empty dependency array [] runs ONCE on component mount
   * 
   * This fetches all existing thoughts from the API when the app first loads.
   * 
   * Success flow: API data -> setThoughts -> clear error -> stop loading
   * Error flow: Catch error -> log to console -> set user message -> stop loading
   * 
   * The .finally() ensures loading stops regardless of success or failure
   */
  useEffect(() => {
    fetchThoughts()
      .then((data) => {
        setThoughts(data) // Populate thoughts array with API data
        setError(null) // Clear any previous errors
      })
      .catch((error) => {
        console.error("Failed to fetch thoughts:", error) // Log for debugging
        setError("Failed to load thoughts. Please try again later.") // User-friendly message
      })
      .finally(() => {
        setLoading(false) // Stop loading whether success or failure
      })
  }, []) // Empty array = run only once on mount, never re-run

  // === EVENT HANDLERS ===
  
  /**
   * Handles submission of a new thought from ThoughtForm
   * 
   * Flow:
   * 1. Receives validated message from form
   * 2. Sends POST request to API via postThought()
   * 3. Prepends returned thought object to front of thoughts array
   * 4. Uses functional setState to avoid race conditions with concurrent updates
   * 
   * Note: Form handles its own validation errors, this only handles API errors
   * 
   * @param {string} message - The validated thought message from ThoughtForm
   */
  const handleFormSubmit = (message) => {
    postThought(message)
      .then((newThought) => {
        // Functional update: use previous state to safely prepend new thought
        // Spread operator creates new array: [new, ...old items]
        setThoughts((previousThoughts) => [newThought, ...previousThoughts])
      })
      .catch((error) => {
        console.error("Failed to submit thought:", error)
        // Note: Could add UI error feedback here in future
      })
  }

  /**
   * Handles liking a thought from ThoughtCard
   * 
   * Flow:
   * 1. Receives thoughtId from the clicked card
   * 2. Sends POST request to API via likeThought()
   * 3. Receives updated thought with incremented hearts count
   * 4. Maps through thoughts array to replace only the liked thought
   * 
   * The map() pattern ensures immutability - creates new array with one item updated
   * 
   * @param {string} thoughtId - The MongoDB _id of the thought to like
   */
  const handleLike = (thoughtId) => {
    likeThought(thoughtId)
      .then((updatedThought) => {
        // Functional update: map creates new array, replacing only the matching thought
        setThoughts((previousThoughts) => 
          previousThoughts.map((thought) => 
            // Ternary: if IDs match, use updated thought; otherwise keep original
            thought._id === updatedThought._id ? updatedThought : thought
          )
        )
      })
      .catch((error) => {
        console.error('Failed to like thought:', error)
        // Note: Could show toast notification here in future
      })
  }

  // === CONDITIONAL RENDERING ===
  
  /**
   * Loading State: Show loading message while fetching initial data
   * Returns early, preventing form and list from rendering until data is ready
   */
  if (loading) {
    return <div className="loading">Loading happy thoughts...</div>
  }

  /**
   * Error State: Show error message if API fetch failed
   * Returns early, showing user-friendly message instead of broken UI
   */
  if (error) {
    return <div className="error">{error}</div>
  }

  // === MAIN RENDER ===
  
  /**
   * Normal State: Render the full application
   * 
   * Structure:
   * - ThoughtForm: Input form at top, receives handleFormSubmit callback
   * - ThoughtList: Display area below, receives thoughts data and handleLike callback
   * 
   * Props flow:
   * - onAdd prop connects form submission to handleFormSubmit
   * - thoughts prop provides data for display
   * - onLike prop connects like button to handleLike
   */
  return ( 
    <main className="app">
      <ThoughtForm onAdd={handleFormSubmit} />
      <ThoughtList thoughts={thoughts} onLike={handleLike} />
    </main>
  )
}