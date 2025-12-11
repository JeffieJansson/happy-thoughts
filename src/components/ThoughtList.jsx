import { ThoughtCard } from './ThoughtCard'



export const ThoughtList = ({ thoughts, onLike }) => { // Receives array of thoughts and onLike handler as props
  return (
    <section className="thought-list">
      {thoughts.length === 0 ? (  // Check if thoughts array is empty
        <p className="empty-text">No happy thoughts yet — be the first!</p>  // Empty State: Show message when no thoughts exist yet
      ) : (
        thoughts.map(thought => ( // Map over thoughts array to render ThoughtCard for each thought
          <ThoughtCard 
            key={thought._id} // thought._id used as unique key for list rendering
            thought={thought} //thought object passed as prop to ThoughtCard
            onLike={onLike} //onLike is passed down to ThoughtCard for handling likes
          />
        ))
      )}
    </section>
  )
}