import { useState, useEffect, useCallback } from 'react'
import HomePage from './pages/HomePage.jsx'
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import PublicationPage from './pages/PublicationPage.jsx'
import { scholarConfig } from './data/scholarConfig.js'

// Tiny hash router: #/  ·  #/search?q=name  ·  #/publication
function parse() {
  const [path, qs = ''] = window.location.hash.replace(/^#/, '').split('?')
  return { path: path || '/', q: new URLSearchParams(qs).get('q') || '' }
}

export default function App() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const on = () => setRoute(parse())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  const go = (hash) => { window.location.hash = hash }
  const onSearch = (q) => go(`/search?q=${encodeURIComponent(q)}`)

  // Open the PDF in a new tab if it exists, else show the "being prepared" page.
  const openPdf = useCallback(async () => {
    const url = new URL(scholarConfig.pdfPath, document.baseURI).href
    const tab = window.open('', '_blank') // opened synchronously to avoid popup blockers
    let ok = false
    try {
      const res = await fetch(url, { method: 'HEAD' })
      ok = res.ok && (res.headers.get('content-type') || '').includes('pdf')
    } catch { ok = false }
    const fallback = new URL('#/publication', document.baseURI).href
    if (tab) tab.location.href = ok ? url : fallback
    else window.location.hash = '/publication'
  }, [])

  if (route.path === '/search' && route.q)
    return <SearchResultsPage query={route.q} onSearch={onSearch} onHome={() => go('/')} onOpenPdf={openPdf} />
  if (route.path === '/publication') return <PublicationPage onHome={() => go('/')} />
  return <HomePage onSearch={onSearch} />
}
