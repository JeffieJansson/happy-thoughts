import { ThoughtCard } from './ThoughtCard'
import '../styles/thoughtList.css'

export const ThoughtList = ({ thoughts, onLike, onEdit, onDelete }) => { 
  return (
    <section className="thought-list">
      {thoughts.length === 0 ? (  
        <p className="empty-text">No happy thoughts yet — be the first!</p>  // Empty State: Show message when no thoughts exist yet
      ) : (
        thoughts.map(thought => ( 
          <ThoughtCard 
            key={thought._id}
            thought={thought} 
            onLike={onLike}
            onEdit={onEdit}
            onDelete={onDelete} 
          />
        ))
      )}
    </section>
  )
}