import React from 'react'

// Utility to produce a human-friendly "time ago" string
function getTimeAgo(isoString) {
  const then = new Date(isoString)
  const seconds = Math.floor((Date.now() - then.getTime()) / 1000)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } // less than a minute

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minutes ago`
  } // less than an hour

  const hours = Math.floor(minutes / 60)
  if (hours < 24) {
    return `${hours} hours ago`
  } // less than a day

  const days = Math.floor(hours / 24)
  return `${days} days ago`
} // otherwise in days

// Render a single thought card with message and time ago
export const ThoughtCard = ({ thought }) => {
  return (
    <article className="thought-card">
      <p className="thought-message">{thought.message}</p>

      <footer className="thought-footer">
        {/* Left: placeholder for like button that will be added later */}
        <div className="like-placeholder" aria-hidden="true"></div>

        {/* Right: relative time */}
        <p className="thought-time">{getTimeAgo(thought.createdAt)}</p>
      </footer>
    </article>
  )
}
