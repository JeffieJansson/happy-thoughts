import { useState } from 'react'

// === VALIDATION CONSTANTS ===
const CHAR_LIMIT = 140 // Maximum characters (Twitter-style limit)
const CHAR_MIN = 5 // Minimum characters to prevent spam/empty messages

/**
 * Features:
 * - Real-time character counter (shows remaining, over limit, or too short)
 * - Visual feedback with color changes (red for errors)
 * - Submit button disabled when validation fails
 * - Error messages on submit attempts with invalid data
 * - Automatic form reset after successful submission
 * - Accessibility features (aria-live, aria-describedby)
 * 
 * Props:
 * @param {Function} onAdd - Callback from App.jsx to handle form submission
 *                          Receives the trimmed message string as parameter
 */
export const ThoughtForm = ({ onAdd }) => {
  // === STATE MANAGEMENT ===

  const [text, setText] = useState('')
  
  /**
   * error: Validation error message to display to user
   * null = no error, string = error message to show
   */
  const [error, setError] = useState(null)
  
  // === REAL-TIME VALIDATION CALCULATIONS ===
  //isOverLimit: Check if user exceeded the character limit
  const isOverLimit = text.length > CHAR_LIMIT
  
  // isTooShort: Check if text exists but is too short
  const isTooShort = text.trim().length > 0 && text.trim().length < CHAR_MIN
  
  // remaining: Characters left until limit
  const remaining = CHAR_LIMIT - text.length

  // === VALIDATION FUNCTIONS ===
  
  /**
   * Checks if the current text passes all validation requirements
   * Requirements:
   * 1. After trimming whitespace, must be >= CHAR_MIN (5 chars)
   * 2. After trimming whitespace, must be <= CHAR_LIMIT (140 chars)
   * Uses trim() to prevent submissions of only whitespace
   */
  const isValid = () => {
    const trimmedLength = text.trim().length
    return trimmedLength >= CHAR_MIN && trimmedLength <= CHAR_LIMIT
  }

  // === EVENT HANDLERS ===
  
  /**
   * Handles every change to the textarea (every keystroke)
   * Flow:
   * 1. User types character
   * 2. Update text state with new value
   * 3. Clear any existing error (forgiving UX - let them try again)
   * 4. Component re-renders with updated state
   * 5. Textarea displays updated value
   * 
   * @param {Event} e - The input change event
   */
   const handleInputChange = (e) => {
    setText(e.target.value) // Update state with current textarea value
    if (error) setError(null) // Clear error to give user fresh start
  }
  
  /**
   * Handles form submission
   * 
   * Flow:
   * 1. Prevent default form behavior (page reload)
   * 2. Validate the input:
   *    - Check if empty (even after trim)
   *    - Check if meets character requirements
   * 3. If invalid: Set error message and exit early (don't call onAdd)
   * 4. If valid: Call onAdd callback, reset form, clear error
   * @param {Event} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault() // Stop browser from reloading page
    
    // First validation: Check if empty after trimming
    if (!text.trim()) {
      setError('Please write something!')
      return // Exit early, don't submit
    }
    
    // Second validation: Check character requirements
    if (!isValid()) {
      setError('Message must be between 5 and 140 characters')
      return // Exit early, don't submit
    }
    
    // All validations passed - submit and reset
    onAdd(text.trim()) // Send trimmed text to parent (App.jsx)
    setText('') // Clear textarea for next thought
    setError(null) // Clear any lingering error
  }

  // === RENDER ===
  return (
    <section className="thought-form">
    <form className="thought-form-inner" onSubmit={handleSubmit} noValidate>
      {/* Form Label */}
      <label htmlFor="thought-input" className="thought-form__label">
        What's making you happy right now?
      </label>

      {/* Controlled Textarea Input */}
      <textarea
        id="thought-input"
        value={text} // Controlled component: value comes from state
        onChange={handleInputChange} // Every keystroke updates state
        placeholder="React is making me happy!"
        aria-describedby="char-count" // Links to character counter for screen readers
      />

      {/* Submit Button and Character Counter Row */}
      <div className="form-row">
        {/* Submit Button */}
        <button 
            type="submit"
            disabled={!isValid()} // Disable when validation fails (prevents submission)
            className="send-button"
            >
              <img src="./heart.png" alt="Heart icon" className='hearts' /> 
              Send Happy Thought 
              <img src="./heart.png" alt="Heart icon" className='hearts' />
        </button>
        
          {/* Character Counter with Dynamic Messaging */}
          <p
            id="char-count"
            // Dynamic class: adds error styling when over limit or too short
            className={`char-count ${(isOverLimit || isTooShort) ? 'char-count--error' : ''}`}
            // Accessibility: "assertive" announces errors immediately, "polite" waits for pause
            aria-live={(isOverLimit || isTooShort) ? "assertive" : "polite"}
          >
            {/* Triple ternary for three different messages: */}
            {isOverLimit
              ? `Exceeded by ${text.length - CHAR_LIMIT} characters` // Over limit
              : isTooShort
              ? `Minimum ${CHAR_MIN} characters required` // Too short
              : `${remaining} characters remaining`} {/* Normal state */}
          </p>
      </div>
      
      {/* Error Message Display */}
      {/* Conditional rendering: only shows when error exists */}
      {error && <p className="error-message">{error}</p>}
    </form>
    </section>
  )
}