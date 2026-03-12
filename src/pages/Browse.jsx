import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Heart, Grid3X3, List } from 'lucide-react';
import { books, genres } from '../data/books';
import { useApp } from '../context/AppContext';
import BookCard from '../components/BookCard';
import './Browse.css';

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useApp();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [activeGenre, setActiveGenre] = useState(searchParams.get('genre') || 'All');
  const [sort, setSort] = useState('default');
  const [filterPanel, setFilterPanel] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const filter = searchParams.get('filter');

  const filtered = useMemo(() => {
    let result = [...books];

    if (filter === 'bestseller') result = result.filter(b => b.bestseller);
    if (filter === 'new') result = result.filter(b => b.new);
    if (filter === 'wishlist') result = result.filter(b => wishlist.includes(b.id));

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q) ||
        b.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    if (activeGenre !== 'All') {
      result = result.filter(b => b.genre === activeGenre);
    }

    result = result.filter(b => b.price >= priceRange[0] && b.price <= priceRange[1]);
    if (ratingFilter > 0) result = result.filter(b => b.rating >= ratingFilter);

    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'newest') result.sort((a, b) => b.year - a.year);

    return result;
  }, [books, search, activeGenre, sort, priceRange, ratingFilter, filter, wishlist]);

  const pageTitle = filter === 'bestseller' ? 'Bestsellers'
    : filter === 'new' ? 'New Arrivals'
    : filter === 'wishlist' ? 'My Wishlist'
    : 'Browse Books';

  return (
    <div className="browse page-enter">
      {/* HEADER */}
      <div className="browse__header">
        <div className="browse__header-inner">
          <div>
            <span className="browse__eyebrow">Explore</span>
            <h1 className="browse__title">{pageTitle}</h1>
            <p className="browse__count">{filtered.length} books found</p>
          </div>

          <div className="browse__controls">
            <div className="browse__search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search by title, author, genre…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch('')}><X size={14} /></button>
              )}
            </div>

            <select
              className="browse__sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title">Title A–Z</option>
              <option value="newest">Newest First</option>
            </select>

            <button
              className={`browse__filter-btn ${filterPanel ? 'active' : ''}`}
              onClick={() => setFilterPanel(!filterPanel)}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>

            <div className="browse__view-toggle">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>
                <Grid3X3 size={16} />
              </button>
              <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="browse__body">
        {/* SIDEBAR */}
        <aside className={`browse__sidebar ${filterPanel ? 'open' : ''}`}>
          <div className="filter-group">
            <h3>Genre</h3>
            <div className="filter-genres">
              {genres.map(g => (
                <button
                  key={g}
                  className={`filter-genre-btn ${activeGenre === g ? 'active' : ''}`}
                  onClick={() => setActiveGenre(g)}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="filter-price">
              <span>${priceRange[0]} — ${priceRange[1]}</span>
              <input
                type="range"
                min="0"
                max="30"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, Number(e.target.value)])}
              />
            </div>
          </div>

          <div className="filter-group">
            <h3>Minimum Rating</h3>
            <div className="filter-stars">
              {[0, 3, 3.5, 4, 4.5].map(r => (
                <button
                  key={r}
                  className={`filter-star-btn ${ratingFilter === r ? 'active' : ''}`}
                  onClick={() => setRatingFilter(r)}
                >
                  {r === 0 ? 'Any' : `★ ${r}+`}
                </button>
              ))}
            </div>
          </div>

          <button
            className="filter-reset"
            onClick={() => {
              setSearch('');
              setActiveGenre('All');
              setSort('default');
              setPriceRange([0, 30]);
              setRatingFilter(0);
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* RESULTS */}
        <main className="browse__results">
          {filter === 'wishlist' && filtered.length === 0 && (
            <div className="browse__empty">
              <Heart size={48} />
              <h3>Your wishlist is empty</h3>
              <p>Heart a book to save it here for later.</p>
            </div>
          )}

          {filtered.length === 0 && filter !== 'wishlist' && (
            <div className="browse__empty">
              <Search size={48} />
              <h3>No books found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}

          <div className={`books-grid ${viewMode === 'list' ? 'books-grid--list' : 'books-grid--3'}`}>
            {filtered.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
