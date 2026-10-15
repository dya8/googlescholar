import SearchBar from '../components/SearchBar.jsx'
import logo from '../assets/logo.png'
import { scholarConfig } from '../data/scholarConfig.js'

export default function HomePage({ onSearch }) {
  return (
    <main className="home page-enter">
      <div className="home-inner">
        <h1 className="home-logo"><img src={logo} alt={scholarConfig.siteTitle} /></h1>
        <SearchBar onSearch={onSearch} placeholder={scholarConfig.placeholderHint} autoFocus />
        <p className="home-sub">{scholarConfig.subtitle}</p>
      </div>
    </main>
  )
}
