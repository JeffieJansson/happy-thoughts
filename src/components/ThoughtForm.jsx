import { useState } from 'react'

const CHAR_LIMIT = 140


//make ThoughtForm controlled with useState
export const ThoughtForm = ({ onAdd }) => {
  const [text, setText] = useState('')
  
  //input change handler to update text state
  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  //function to reset form
  const resetForm = () => {
    setText('')
  }

  //calculate if over character limit and remaining characters
  const isOverLimit = text.length > CHAR_LIMIT
  const remaining = CHAR_LIMIT - text.length

  //submit handler to call onAdd with text and reset text state
  const handleSubmit = (e) => {
    e.preventDefault() 
    if (!text.trim()) return
    onAdd(text.trim())
    resetForm('')
  }

  //render form with textarea and submit button
  return (
    <section className="thought-form">
      <form onSubmit={handleSubmit} className="thought-form-inner" noValidate>
      
        <label htmlFor="thought-input">What's making you happy right now?</label>
        <textarea
          id="thought-input"
          value={text}
          onChange={handleInputChange}
          placeholder="React is making me happy!"
        />
        <div className="form-row">
             <p
            className={`char-count ${isOverLimit ? 'char-count--error' : ''}`}
            aria-live={isOverLimit ? "assertive" : "polite"}
          >
            {isOverLimit
              ? `Character limit exceeded by ${text.length - CHAR_LIMIT} characters`
              : `${remaining} characters remaining`}
          </p>
          
          <button 
            type="submit"
            disabled={!text.trim() || isOverLimit} // disable button if text is empty or over character limit
            className="send-button"
          >

            ❤️ Send Happy Thought ❤️
          </button>
        </div>
      </form>
    </section>
  )
}
