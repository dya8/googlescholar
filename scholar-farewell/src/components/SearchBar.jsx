import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export default function SearchBar({ initialValue = '', onSearch, placeholder, compact = false, autoFocus = false }) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(false)
  useEffect(() => setValue(initialValue), [initialValue])

  const submit = (e) => {
    e.preventDefault()
    if (!value.trim()) { setError(true); return }
    setError(false)
    onSearch(value.trim())
  }

  return (
    <form className={`searchbar ${compact ? 'compact' : ''} ${error ? 'has-error' : ''}`} onSubmit={submit} role="search">
      <label htmlFor={compact ? 'q-compact' : 'q-main'} className="sr-only">Search for a scholar</label>
      <Search className="searchbar-icon" size={20} aria-hidden="true" />
      <input id={compact ? 'q-compact' : 'q-main'} type="text" value={value} autoFocus={autoFocus} autoComplete="off"
        placeholder={placeholder} aria-invalid={error}
        onChange={(e) => { setValue(e.target.value); setError(false) }} />
      {value && (
        <button type="button" className="icon-btn" aria-label="Clear search" onClick={() => setValue('')}><X size={18} /></button>
      )}
      <button type="submit" className="search-btn">Search</button>
      {error && <p className="searchbar-error" role="alert">Please enter a name to search.</p>}
    </form>
  )
}
