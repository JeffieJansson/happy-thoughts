import moment from 'moment'

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
          ❤️
        </button>
        <span className="hearts">x{thought.hearts}</span>
        <span className="thought-time">{moment(thought.createdAt).fromNow()}</span>
      </div>
    </article>
  )
}