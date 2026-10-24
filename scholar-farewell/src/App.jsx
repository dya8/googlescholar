import { useState, useEffect } from 'react'
import HomePage from './pages/HomePage.jsx'
import SearchResultsPage from './pages/SearchResultsPage.jsx'
import PublicationPage from './pages/PublicationPage.jsx'

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

  if (route.path === '/search' && route.q)
    return <SearchResultsPage query={route.q} onSearch={onSearch} onHome={() => go('/')} />
  if (route.path === '/publication')
    return <PublicationPage onSearch={onSearch} onHome={() => go('/')} />
  return <HomePage onSearch={onSearch} />
}