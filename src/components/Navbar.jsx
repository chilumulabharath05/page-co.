import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Heart, ShoppingBag, BookOpen, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme, wishlistCount, cartCount } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal('');
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <BookOpen size={20} className="navbar__brand-icon" />
          <span className="navbar__brand-name">Page<span>&</span>Co</span>
        </Link>

        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/browse" className={`navbar__link ${location.pathname === '/browse' ? 'active' : ''}`}>Browse</Link>
          <Link to="/browse?filter=bestseller" className="navbar__link">Bestsellers</Link>
          <Link to="/browse?filter=new" className="navbar__link">New Arrivals</Link>
        </div>

        <div className="navbar__actions">
          {searchOpen ? (
            <form onSubmit={handleSearch} className="navbar__search-form">
              <input
                autoFocus
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search books..."
                className="navbar__search-input"
              />
              <button type="button" onClick={() => setSearchOpen(false)} className="navbar__icon-btn">
                <X size={18} />
              </button>
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="navbar__icon-btn" aria-label="Search">
              <Search size={18} />
            </button>
          )}

          <button onClick={toggleTheme} className="navbar__icon-btn" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <Link to="/browse?filter=wishlist" className="navbar__icon-btn navbar__badge-wrap" aria-label="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="navbar__badge">{wishlistCount}</span>}
          </Link>

          <button className="navbar__icon-btn navbar__badge-wrap navbar__cart-btn" aria-label="Cart">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="navbar__badge">{cartCount}</span>}
          </button>
        </div>

        <button className="navbar__mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="navbar__mobile">
          <Link to="/" className="navbar__mobile-link">Home</Link>
          <Link to="/browse" className="navbar__mobile-link">Browse Books</Link>
          <Link to="/browse?filter=bestseller" className="navbar__mobile-link">Bestsellers</Link>
          <Link to="/browse?filter=new" className="navbar__mobile-link">New Arrivals</Link>
          <Link to="/browse?filter=wishlist" className="navbar__mobile-link">
            My Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
