import ReactTimeAgo from 'react-timeago'

export const ThoughtCard = ({ thought, onLike }) => {
  return (
    <article className="thought">
      <p className="message">{thought.message}</p>
      <div className="meta">
        <button
          className="like-button"
          onClick={() => onLike && onLike(thought._id)}
          aria-label="Like"
        >
          <img src="./heart.png" alt="heart icon" className="hearts" />
        </button>
        <span className="likes">x{thought.hearts ?? 0}</span>
        <span className="thought-time">
          {thought.createdAt ? <ReactTimeAgo date={thought.createdAt} /> : ''}
        </span>
      </div>
    </article>
  )
}