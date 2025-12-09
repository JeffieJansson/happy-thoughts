import { useState, useEffect } from 'react'
import { ThoughtCard } from './ThoughtCard'

export const ThoughtList = ({ thoughts, onLike }) => {
  // A small tick to force re-render so "time ago" updates automatically
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000) // update every second
    return () => clearInterval(id)
  }, [])

  // render list of ThoughtCard components or a message if empty
  return (
    <section className="thought-list">
      {/* include tick so re-renders keep moment().fromNow() fresh */}
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