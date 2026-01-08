import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SearchBar.css'

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}&category=${selectedCategory}`)
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-category-wrapper">
        <select
          className="search-category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="books">Books</option>
          <option value="home">Home & Kitchen</option>
          <option value="clothing">Clothing</option>
          <option value="sports">Sports & Outdoors</option>
        </select>
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Search Amazon"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="search-button">
        🔍
      </button>
    </form>
  )
}

export default SearchBar
