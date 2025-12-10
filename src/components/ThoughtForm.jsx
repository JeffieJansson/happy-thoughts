import { useState } from 'react'

const CHAR_LIMIT = 140
const CHAR_MIN = 5

//make ThoughtForm controlled with useState
export const ThoughtForm = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)
   //calculate if over character limit and remaining characters
  const isOverLimit = text.length > CHAR_LIMIT
  const isTooShort = text.trim().length > 0 && text.trim().length < CHAR_MIN
  const remaining = CHAR_LIMIT - text.length

  //validation function for enabling/disabling submit button
  const isValid = () => {
    const trimmedLength = text.trim().length
    return trimmedLength >= CHAR_MIN && trimmedLength <= CHAR_LIMIT
  }

   const handleInputChange = (e) => {
    setText(e.target.value)
    if (error) setError(null) // Clear error when user starts typing
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) {
      setError('Please write something!')
      return
    }
    if (!isValid()) {
      setError('Message must be between 5 and 140 characters')
      return
    }
    onAdd(text.trim())
    setText('')
    setError(null)
  }

  return (
    <section className="thought-form">
    <form className="thought-form-inner" onSubmit={handleSubmit} noValidate>
      <label htmlFor="thought-input" className="thought-form__label">
        What's making you happy right now?
      </label>

      <textarea
        id="thought-input"
        value={text}
        onChange={handleInputChange} // make textarea controlled
        placeholder="React is making me happy!"
        aria-describedby="char-count"
      />

      <div className="form-row">
        <button 
            type="submit"
            disabled={!isValid()} // disable button if validation fails
            className="send-button"
            >
              <img src="./heart.png" alt="Heart icon" className='hearts' /> Send Happy Thought <img src="./heart.png" alt="Heart icon" className='hearts' />
        </button>
          <p
            id="char-count"
            className={`char-count ${(isOverLimit || isTooShort) ? 'char-count--error' : ''}`} // add error class if over limit or too short
            aria-live={(isOverLimit || isTooShort) ? "assertive" : "polite"} // announce changes for screen readers
          >
            {isOverLimit
              ? `Exceeded by ${text.length - CHAR_LIMIT} characters`
              : isTooShort
              ? `Minimum ${CHAR_MIN} characters required`
              : `${remaining} characters remaining`}
          </p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
    </section>
  )
}