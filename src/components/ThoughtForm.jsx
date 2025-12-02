import { useState } from 'react'

//make ThoughtForm controlled with useState
export const ThoughtForm = ({ onAdd }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text.trim())
    setText('')
  }

  //submit handler to call onAdd with text and reset text state
  return (
    <section className="thought-form">
      <form onSubmit={handleSubmit}>
      
        <label htmlFor="thought-input">What's making you happy right now?</label>
        <textarea
          id="thought-input"
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="React is making me happy!"
        />
        <div className="form-row">
          <p className="char-count">140 characters remaining</p>
          <button 
          type="submit" 
          className="send-button" 
          disabled={!text.trim()}>
          ❤️ Send Happy Thought ❤️
          </button>
        </div>
      </form>
    </section>
  )
}
