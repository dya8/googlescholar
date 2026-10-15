import { BookOpen } from 'lucide-react'
import { scholarConfig } from '../data/scholarConfig.js'

export default function PublicationPage({ onHome }) {
  return (
    <main className="home page-enter">
      <div className="home-inner pub">
        <BookOpen size={36} aria-hidden="true" className="pub-icon" />
        <h1 className="pub-title">The farewell publication is being prepared</h1>
        <p className="home-sub">A very special edition for {scholarConfig.scholarName} is on its way. Please check back soon.</p>
        <a href="#/" className="search-btn linkbtn" onClick={(e) => { e.preventDefault(); onHome() }}>Back to search</a>
      </div>
    </main>
  )
}
