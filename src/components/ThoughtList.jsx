import { ThoughtCard } from './ThoughtCard'

export const ThoughtList = ({ thoughts, tick, onLike }) => {
  // render list of ThoughtCard components or a message if empty
  return (
    <section className="thought-list">
      {/* include tick so parent re-renders affect this component (keeps moment().fromNow() fresh) */}
      <div style={{ display: 'none' }}>{tick}</div>

      {/* check if thoughts is empty */}
      {thoughts.length === 0 ? (
        <p className="empty-text">No happy thoughts yet — be the first!</p>
      ) : (
        thoughts.map(t => (
          // keep your existing key usage, and forward onLike so ThoughtCard can call it
          <ThoughtCard key={t._id} thought={t} onLike={onLike} />
        ))
      )}
    </section>
  )
}