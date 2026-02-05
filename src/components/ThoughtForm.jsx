import { useState } from 'react'
import '../styles/thoughtForm.css'

const CHAR_LIMIT = 140 
const CHAR_MIN = 5

export const ThoughtForm = ({ onAdd }) => {

  const [text, setText] = useState('')
  const [error, setError] = useState(null)
  const isOverLimit = text.trim().length > CHAR_LIMIT
  const isTooShort = text.trim().length > 0 && text.trim().length < CHAR_MIN
  const remaining = CHAR_LIMIT - text.trim().length 

  const isValid = () => { 
    const trimmedLength = text.trim().length 
    return trimmedLength >= CHAR_MIN && trimmedLength <= CHAR_LIMIT
  }
  const shouldDisableButton = () => {
    if (text.length === 0) return false 
    return isTooShort || isOverLimit 
  }

  const handleInputChange = (e) => { 
    setText(e.target.value) 
    if (error) setError(null) 
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
    <form 
        className="thought-form-inner" 
        onSubmit={handleSubmit} 
        noValidate>
      <label 
        htmlFor="thought-input" 
        className="thought-form__label">
        What's making you happy right now?
      </label>

      <textarea
        id="thought-input"
        value={text} 
        onChange={handleInputChange} 
        placeholder="React is making me happy!"
        aria-describedby="char-count" 
        aria-invalid={isOverLimit || isTooShort}
      />

      <div className="form-row">
        <button 
          type="submit"
          disabled={shouldDisableButton()} 
          className="send-button"
            >
        <img src="./heart.png" alt="Heart icon" className='hearts' /> 
          Send Happy Thought 
        <img src="./heart.png" alt="Heart icon" className='hearts' />
        </button>
        
        <p
          id="char-count"
          className={`char-count ${(isOverLimit || isTooShort) ? 'char-count--error' : ''}`} 
          aria-live={(isOverLimit || isTooShort) ? "assertive" : "polite"}
          >

        {isOverLimit
          ? `Exceeded by ${text.trim().length - CHAR_LIMIT} characters`
          : isTooShort
          ? `Minimum ${CHAR_MIN} characters required` 
          : `${remaining} characters remaining`} 
        </p>
      </div>      

      {error && <p className="error-message" role="alert">{error}</p>}
    </form>
   </section>
  )
}