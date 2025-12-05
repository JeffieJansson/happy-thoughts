import { useState } from 'react'

const CHAR_LIMIT = 140

//make ThoughtForm controlled with useState
export const ThoughtForm = ({ onAdd }) => {
  const [text, setText] = useState('')
   //calculate if over character limit and remaining characters
  const isOverLimit = text.length > CHAR_LIMIT
  const remaining = CHAR_LIMIT - text.length

   const handleInputChange = (e) => {
    setText(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || isOverLimit) return
    onAdd(trimmed)
    setText('')
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
            disabled={!text.trim() || isOverLimit} // disable button if text is empty or over character limit
            className="send-button"
            >
              <img src="./heart.png" alt="Heart icon" className='hearts' /> Send Happy Thought <img src="./heart.png" alt="Heart icon" className='hearts' />
        </button>
          <p
            id="char-count"
            className={`char-count ${isOverLimit ? 'char-count--error' : ''}`} // add error class if over limit
            aria-live={isOverLimit ? "assertive" : "polite"} // announce changes for screen readers
          >
            {isOverLimit
              ? `Exceeded by ${text.length - CHAR_LIMIT} characters`
              : `${remaining} characters remaining`}
          </p>
      </div>
    </form>
    </section>
  )
}