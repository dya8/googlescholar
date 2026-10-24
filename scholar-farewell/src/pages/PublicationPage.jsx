import { useEffect, useState } from 'react'
import { Download, ExternalLink, Quote, ArrowLeft, Copy, Check } from 'lucide-react'

import { scholarConfig } from '../data/scholarConfig.js'

export default function PublicationPage({ onSearch, onHome }) {
  const a = scholarConfig.article
  const [cite, setCite] = useState(false)
  const [copied, setCopied] = useState(false)
  useEffect(() => window.scrollTo(0, 0), [])

  const pdf = scholarConfig.pdfPath
  const citation = `${a.authors.join(', ')} (2026). ${a.title.split(':')[0]}: A farewell special edition. ${a.publisher}, Vol. 25.`
  const copy = async () => {
    try { await navigator.clipboard.writeText(citation); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* ignore */ }
  }

  return (
    <div className="article-page page-enter">
     
      <div className="article-wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="#/" onClick={(e) => { e.preventDefault(); window.history.back() }}><ArrowLeft size={15} aria-hidden="true" /> Back to results</a>
          <span aria-hidden="true">›</span><span>{a.publisher}, 2026</span>
        </nav>

        <section className="article-hero">
          <p className="eyebrow">{a.type}</p>
          <h1>{a.title}</h1>
          <p className="publisher">Publisher: <strong>{a.publisher}</strong> · {a.edition}</p>
          <div className="actions">
            <a className="btn primary" href={pdf} download={a.downloadName}><Download size={17} aria-hidden="true" /> Download PDF</a>
            <a className="btn" href={pdf} target="_blank" rel="noreferrer"><ExternalLink size={16} aria-hidden="true" /> Read online</a>
            <button className="btn" type="button" aria-expanded={cite} onClick={() => setCite(!cite)}><Quote size={16} aria-hidden="true" /> Cite this</button>
          </div>
          {cite && (
            <div className="cite-box">
              <p>{citation}</p>
              <button type="button" className="btn small" onClick={copy}>{copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}</button>
            </div>
          )}
          <p className="authors">{a.authors.map((n, i) => <span key={n}>{n}{i < a.authors.length - 1 ? '; ' : ''}</span>)}</p>
          <p className="affil">{a.affiliation}</p>
          <p className="status"><em>Manuscript status: {a.status}</em></p>
        </section>

        <div className="article-grid">
          <aside className="rail" aria-label="Document sections">
            <h2>Document Sections</h2>
            <ul>
              <li><a href="#abstract" onClick={(e) => jump(e, 'abstract')}>Abstract</a></li>
              {a.sections.map(([id, t]) => <li key={id}><a href={`#${id}`} onClick={(e) => jump(e, id)}>{t}</a></li>)}
            </ul>
          </aside>

          <main className="article-main">
            <section id="abstract">
              <h2>Abstract</h2>
              {a.abstract.map(([k, t]) => <p key={k}><em>{k}:</em> {t}</p>)}
              <p className="keywords"><strong>Keywords:</strong> {a.keywords.join('; ')}</p>
            </section>
            {a.sections.map(([id, t, d]) => (
              <section key={id} id={id} className="sec-card"><h3>{t}</h3><p>{d}</p></section>
            ))}
            <blockquote className="pull"><p>{a.quote}</p><cite>{a.quoteBy}</cite></blockquote>
            <a className="btn primary wide" href={pdf} download={a.downloadName}><Download size={17} aria-hidden="true" /> Download the full farewell edition (PDF)</a>
          </main>

          <aside className="side">
            <h2>Highlights</h2>
            <ul>
              {a.highlights.map(([t, m]) => <li key={t}><a href={pdf} target="_blank" rel="noreferrer">{t}</a><span>{m}</span></li>)}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  )
}

function jump(e, id) {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
}