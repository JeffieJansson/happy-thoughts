import { ThoughtCard } from './ThoughtCard'

export const ThoughtList = ({ thoughts, onLike }) => {
  // render list of ThoughtCard components or a message if empty
  return (
    <section className="thought-list">
      {/* check if thoughts is empty */}
      {thoughts.length === 0 ? (
        <p className="empty-text">No happy thoughts yet — be the first!</p>
      ) : (
        thoughts.map(thought => (
          // keep your existing key usage, and forward onLike so ThoughtCard can call it
          <ThoughtCard key={thought._id} thought={thought} onLike={onLike} />
        ))
      )}
    </section>
  )
}