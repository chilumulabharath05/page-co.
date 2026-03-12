import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './BookCard.css';

export default function BookCard({ book, size = 'md' }) {
  const { isWishlisted, toggleWishlist, addToCart } = useApp();
  const wishlisted = isWishlisted(book.id);

  return (
    <div className={`book-card book-card--${size}`}>
      <Link to={`/book/${book.id}`} className="book-card__image-wrap">
        <img src={book.cover} alt={book.title} className="book-card__cover" loading="lazy" />
        <div className="book-card__overlay">
          <span className="book-card__quick-view">View Details</span>
        </div>
        {book.bestseller && <span className="book-card__badge book-card__badge--best">Bestseller</span>}
        {book.new && <span className="book-card__badge book-card__badge--new">New</span>}
      </Link>

      <div className="book-card__body">
        <div className="book-card__meta">
          <span className="book-card__genre">{book.genre}</span>
          <div className="book-card__rating">
            <Star size={12} fill="currentColor" />
            <span>{book.rating}</span>
          </div>
        </div>

        <Link to={`/book/${book.id}`} className="book-card__title">{book.title}</Link>
        <p className="book-card__author">by {book.author}</p>

        <div className="book-card__footer">
          <span className="book-card__price">${book.price.toFixed(2)}</span>
          <div className="book-card__actions">
            <button
              className={`book-card__wish ${wishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(book.id)}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button
              className="book-card__cart"
              onClick={() => addToCart(book)}
              aria-label="Add to cart"
            >
              <ShoppingBag size={14} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
