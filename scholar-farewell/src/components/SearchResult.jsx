import { FileText } from 'lucide-react'

export default function SearchResult({ result, onOpen }) {
  const { title, authors, source, year, description, cited, featured } = result
  const open = (e) => { if (onOpen) { e.preventDefault(); onOpen() } }
  return (
    <article className={`result ${featured ? 'featured' : ''}`}>
      {featured && <span className="badge">Special edition</span>}
      <h3 className="result-title">
        <a href="#/publication" onClick={open}>{title}</a>
      </h3>
      <p className="result-meta">{authors} — {source}, {year}</p>
      <p className="result-desc">{description}</p>
      <p className="result-actions">
        {featured && (
          <a href="#/publication" className="pdf-link" onClick={open}><FileText size={15} aria-hidden="true" /> Open farewell publication · PDF</a>
        )}
        <span className="cited">{cited}</span>
      </p>
    </article>
  )
}
