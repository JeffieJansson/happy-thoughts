import { useState } from 'react'

// === VALIDATION CONSTANTS ===
const CHAR_LIMIT = 140 // Maximum characters (Twitter-style limit)
const CHAR_MIN = 5 // Minimum characters to prevent spam/empty messages


export const ThoughtForm = ({ onAdd }) => {
  // === STATE MANAGEMENT ===

  const [text, setText] = useState('')
  const [error, setError] = useState(null)
  
  // === REAL-TIME VALIDATION CALCULATIONS ===
  const isOverLimit = text.trim().length > CHAR_LIMIT
  const isTooShort = text.trim().length > 0 && text.trim().length < CHAR_MIN
  const remaining = CHAR_LIMIT - text.trim().length 

  // === VALIDATION FUNCTIONS ===
  const isValid = () => { // Checks if current text meets character requirements
    const trimmedLength = text.trim().length 
    return trimmedLength >= CHAR_MIN && trimmedLength <= CHAR_LIMIT // Valid if within min and max
  }

  //if empty textarea button should be able to submit to show error
  const shouldDisableButton = () => {
    if (text.length === 0) return false 
    return isTooShort || isOverLimit // Disable only when actually typing invalid length
  }

  // === EVENT HANDLERS ===
  const handleInputChange = (e) => { // Handles textarea input changes
    setText(e.target.value) // Update state with current textarea value
    if (error) setError(null) 
  }
  
  const handleSubmit = (e) => { // Handles form submission
    e.preventDefault()
    
    // first validation: Check if empty after trimming
    if (!text.trim()) { 
      setError('Please write something!')
      return 
    }
    
    // Second validation: Check character requirements
    if (!isValid()) {
      setError('Message must be between 5 and 140 characters')
      return 
    }
    
    // All validations passed - submit and reset
    onAdd(text.trim()) // Send trimmed text to parent (App.jsx)
    setText('') // Clear textarea for next thought
    setError(null) 
  }

  // === RENDER ===
  return (
    <section className="thought-form">
    <form 
        className="thought-form-inner" 
        onSubmit={handleSubmit} 
        noValidate>
      <label 
        htmlFor="thought-input" 
        className="thought-form__label">
        What's making you happy right now?
      </label>

      {/* Controlled Textarea Input */}
      <textarea
        id="thought-input"
        value={text} // Controlled component: value comes from state
        onChange={handleInputChange} // Every keystroke updates state
        placeholder="React is making me happy!"
        aria-describedby="char-count" // Links to character counter for screen readers
        aria-invalid={isOverLimit || isTooShort}
      />

      {/* Submit Button and Character Counter Row */}
      <div className="form-row">
        <button 
          type="submit"
          disabled={shouldDisableButton()} // Disable only when too short/long, not when empty
          className="send-button"
            >
        <img src="./heart.png" alt="Heart icon" className='hearts' /> 
          Send Happy Thought 
        <img src="./heart.png" alt="Heart icon" className='hearts' />
        </button>
        
          {/* Character Counter with Messaging */}
        <p
          id="char-count"
          className={`char-count ${(isOverLimit || isTooShort) ? 'char-count--error' : ''}`} 
          aria-live={(isOverLimit || isTooShort) ? "assertive" : "polite"}
          >
        {/* three different messages: */}
        {isOverLimit
          ? `Exceeded by ${text.trim().length - CHAR_LIMIT} characters` // Over limit
          : isTooShort
          ? `Minimum ${CHAR_MIN} characters required` // Too short
          : `${remaining} characters remaining`} {/* Normal state */}
        </p>
      </div>
      
      {/* Conditional rendering: only shows when error exists */}
      {error && <p className="error-message" role="alert" aria-live="assertive">{error}</p>}
    </form>
    </section>
  )
}