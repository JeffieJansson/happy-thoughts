import { ThoughtCard } from './ThoughtCard'

/* ThoughtList Component - Renders a list of happy thoughts 
 * @param {Array} thoughts - Array of thought objects from App.jsx state
 * @param {Function} onLike - Handler function passed down from App.jsx
 */
export const ThoughtList = ({ thoughts, onLike }) => {
  return (
    <section className="thought-list">
      {thoughts.length === 0 ? (
        // Empty State: Show message when no thoughts exist yet
        <p className="empty-text">No happy thoughts yet — be the first!</p>
      ) : (
        // Map over thoughts array and create a ThoughtCard for each one
        thoughts.map(thought => (
          <ThoughtCard 
            key={thought._id} 
            // Pass the entire thought object as a prop
            thought={thought} 
            // Pass through the onLike handler so cards can trigger likes
            onLike={onLike} 
          />
        ))
      )}
    </section>
  )
}