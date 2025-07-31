import { Link } from 'react-router-dom'
import './Header.css'

function Header({ searchTerm, setSearchTerm, onSearch }) {
  const handleSearch = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🍽️ FoodieBoard
        </Link>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>

        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/create" className="nav-link create-button">
            + Create Post
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header 