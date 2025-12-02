import { ThoughtCard } from './ThoughtCard'


export const ThoughtList = ({ thoughts }) => {
  // render list of ThoughtCard components or a message if empty
  return (
    <section className="thought-list">
      {/* check if thoughts is empty */}
      {thoughts.length === 0 ? (
        <p className="empty-text">No happy thoughts yet — be the first!</p>
      ) : (
        thoughts.map(t => <ThoughtCard key={t.id} thought={t} />) // render ThoughtCard for each thought
      )}
    </section>
  )
}
