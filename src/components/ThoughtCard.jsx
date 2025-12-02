export const ThoughtCard = ({ thought }) => {
  return (
    <article className="thought-card">
      <p className="thought-message">{thought?.message}</p>
      <div className="thought-footer">
        <span className="time">{thought?.createdAt || ''}</span>
      </div>
    </article>
  )
}
