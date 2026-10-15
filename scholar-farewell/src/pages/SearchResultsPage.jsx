import SiteHeader from '../components/SiteHeader.jsx'
import SearchResult from '../components/SearchResult.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { scholarConfig } from '../data/scholarConfig.js'
import { dummyResults } from '../data/dummyResults.js'

const norm = (s) => s.toLowerCase().replace(/[\[\]\.,]/g, '').replace(/\s+/g, ' ').trim()

function matches(query) {
  const q = norm(query)
  if (q.length < 2) return false
  const targets = [scholarConfig.scholarName, ...scholarConfig.searchAliases].map(norm)
  return targets.some((t) => t.includes(q) || q.includes(t))
}

export default function SearchResultsPage({ query, onSearch, onHome, onOpenPdf }) {
  const name = scholarConfig.scholarName
  const fill = (s) => s.replaceAll('{name}', name)
  const found = matches(query)
  const p = scholarConfig.publication
  const results = found
    ? [{ ...p, title: fill(p.title), featured: true }, ...dummyResults.map((r) => ({ ...r, title: fill(r.title) }))]
    : []
  const count = results.length

  return (
    <div className="results-page page-enter">
      <SiteHeader query={query} onSearch={onSearch} onHome={onHome} />
      <main className="results-main">
        {found ? (
          <>
            <p className="count" aria-live="polite">About {count} results (0.03 sec)</p>
            {results.map((r, i) => <SearchResult key={i} result={r} onOpen={r.featured ? onOpenPdf : undefined} />)}
          </>
        ) : <EmptyState query={query} />}
      </main>
    </div>
  )
}
