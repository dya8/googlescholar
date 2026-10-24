import { FileText } from 'lucide-react'

export default function SearchResult({ result }) {
  const { title, authors, source, year, description, cited, featured } = result
  return (
    <article className={`result ${featured ? 'featured' : ''}`}>
      {featured && <span className="badge">Special edition</span>}
      <h3 className="result-title">
        {featured ? <a href="#/publication">{title}</a> : <span className="plain-title">{title}</span>}
      </h3>
      <p className="result-meta">{authors} — {source}, {year}</p>
      <p className="result-desc">{description}</p>
      <p className="result-actions">
        {featured && (
          <a href="#/publication" className="pdf-link"><FileText size={15} aria-hidden="true" /> View farewell publication · PDF</a>
        )}
        <span className="cited">{cited}</span>
      </p>
    </article>
  )
}