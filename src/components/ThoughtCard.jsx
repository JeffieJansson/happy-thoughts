export const ThoughtCard = ({ thought }) => {
  return (
    <article className="thought-card">
      <p className="thought-message">{thought?.message}</p>
      <div className="thought-footer">
          {/* shows time posted thought*/}
        <span className="time">{new Date(thought.createdAt).toLocaleTimeString()}</span>
      </div>
    </article>
  )
}
