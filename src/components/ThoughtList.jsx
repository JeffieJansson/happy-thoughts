import { ThoughtCard } from './ThoughtCard'

export const ThoughtList = ({ thoughts, onLike }) => { // Receives array of thoughts and onLike handler as props
  return (
    <section className="thought-list">
      {thoughts.length === 0 ? (  // Check if thoughts array is empty
        <p className="empty-text">No happy thoughts yet — be the first!</p>  // Empty State: Show message when no thoughts exist yet
      ) : (
        thoughts.map(thought => ( 
          <ThoughtCard 
            key={thought._id}
            thought={thought} 
            onLike={onLike} 
          />
        ))
      )}
    </section>
  )
}