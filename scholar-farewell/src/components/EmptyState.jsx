export default function EmptyState({ query }) {
  return (
    <div className="empty">
      <p>Your search <strong>“{query}”</strong> did not match any scholar in this collection.</p>
      <ul>
        <li>Check the spelling of the name.</li>
        <li>Try the scholar's full name.</li>
      </ul>
    </div>
  )
}
