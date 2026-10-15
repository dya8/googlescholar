import logo from '../assets/logo.png'
import SearchBar from './SearchBar.jsx'
import { scholarConfig } from '../data/scholarConfig.js'

export default function SiteHeader({ query, onSearch, onHome }) {
  return (
    <header className="site-header">
      <a href="#/" className="wordmark" onClick={(e) => { e.preventDefault(); onHome() }} aria-label={`${scholarConfig.siteTitle} home`}>
        <img src={logo} alt={scholarConfig.siteTitle} />
      </a>
      <SearchBar compact initialValue={query} onSearch={onSearch} placeholder={scholarConfig.placeholderHint} />
    </header>
  )
}
