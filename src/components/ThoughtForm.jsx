import { useState } from 'react'

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
      <form onSubmit={handleSubmit}>
      
        <label htmlFor="thought-input">What's making you happy right now?</label>
        <textarea
          id="thought-input"
          value={text}
          onChange={handleInputChange}
          placeholder="React is making me happy!"
        />
        <div className="form-row">
          <p className="char-count">140 characters remaining</p>
          <button 
          type="submit" 
          className="send-button" 
          disabled={!text.trim()}> {/* disable button if text is empty */}
          ❤️ Send Happy Thought ❤️
          </button>
        </div>
      </form>
    </section>
  )
}
