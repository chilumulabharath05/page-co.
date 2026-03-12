import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, ArrowLeft, BookOpen, Calendar, Hash, Users, ChevronRight } from 'lucide-react';
import { getBookById, books } from '../data/books';
import { useApp } from '../context/AppContext';
import BookCard from '../components/BookCard';
import './BookDetail.css';

export default function BookDetail() {
  const { id } = useParams();
  const book = getBookById(id);
  const { isWishlisted, toggleWishlist, addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const wishlisted = book ? isWishlisted(book.id) : false;

  const related = books
    .filter(b => b.genre === book?.genre && b.id !== book?.id)
    .slice(0, 4);

  if (!book) {
    return (
      <div className="not-found page-enter">
        <BookOpen size={56} />
        <h2>Book not found</h2>
        <p>This story seems to have wandered off the shelf.</p>
        <Link to="/browse">← Back to Browse</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(book);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="book-detail page-enter">
      {/* BREADCRUMB */}
      <div className="book-detail__breadcrumb">
        <div className="book-detail__breadcrumb-inner">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/browse">Browse</Link>
          <ChevronRight size={14} />
          <span>{book.title}</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="book-detail__main">
        <div className="book-detail__inner">
          {/* LEFT: Cover */}
          <div className="book-detail__cover-wrap">
            <div className="book-detail__cover-stack">
              <div className="book-detail__cover-shadow" />
              <img src={book.cover} alt={book.title} className="book-detail__cover" />
            </div>
            {book.bestseller && <div className="book-detail__stamp">Bestseller</div>}
          </div>

          {/* RIGHT: Info */}
          <div className="book-detail__info">
            <span className="book-detail__genre">{book.genre}</span>
            <h1 className="book-detail__title">{book.title}</h1>
            <p className="book-detail__author">by <strong>{book.author}</strong></p>

            <div className="book-detail__rating">
              <div className="book-detail__stars">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={16} fill={i <= Math.round(book.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="book-detail__rating-val">{book.rating}</span>
              <span className="book-detail__reviews">({book.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="book-detail__tags">
              {book.tags.map(tag => (
                <span key={tag} className="book-detail__tag">{tag}</span>
              ))}
            </div>

            <p className="book-detail__description">{book.description}</p>

            <div className="book-detail__meta-grid">
              <div className="book-detail__meta-item">
                <BookOpen size={16} />
                <span>{book.pages} pages</span>
              </div>
              <div className="book-detail__meta-item">
                <Calendar size={16} />
                <span>Published {book.year}</span>
              </div>
              <div className="book-detail__meta-item">
                <Hash size={16} />
                <span>{book.isbn}</span>
              </div>
              <div className="book-detail__meta-item">
                <Users size={16} />
                <span>{book.reviews.toLocaleString()} readers</span>
              </div>
            </div>

            <div className="book-detail__purchase">
              <span className="book-detail__price">${book.price.toFixed(2)}</span>

              <div className="book-detail__qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <div className="book-detail__ctas">
                <button
                  className={`book-detail__add-cart ${addedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={17} />
                  {addedToCart ? '✓ Added!' : 'Add to Cart'}
                </button>

                <button
                  className={`book-detail__wishlist ${wishlisted ? 'active' : ''}`}
                  onClick={() => toggleWishlist(book.id)}
                  aria-label="Toggle wishlist"
                >
                  <Heart size={17} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="book-detail__tabs-wrap">
        <div className="book-detail__tabs-inner">
          <div className="book-detail__tabs">
            {['description', 'details', 'reviews'].map(tab => (
              <button
                key={tab}
                className={`book-detail__tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="book-detail__tab-content">
            {activeTab === 'description' && (
              <div className="tab-desc">
                <p>{book.longDescription}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="tab-details">
                <div className="tab-details__row"><span>Title</span><span>{book.title}</span></div>
                <div className="tab-details__row"><span>Author</span><span>{book.author}</span></div>
                <div className="tab-details__row"><span>Genre</span><span>{book.genre}</span></div>
                <div className="tab-details__row"><span>Pages</span><span>{book.pages}</span></div>
                <div className="tab-details__row"><span>Published</span><span>{book.year}</span></div>
                <div className="tab-details__row"><span>ISBN</span><span>{book.isbn}</span></div>
                <div className="tab-details__row"><span>Price</span><span>${book.price.toFixed(2)}</span></div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="tab-reviews">
                <div className="review-summary">
                  <span className="review-big">{book.rating}</span>
                  <div className="review-stars">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={20} fill={i <= Math.round(book.rating) ? 'currentColor' : 'none'} />
                    ))}
                    <span>{book.reviews.toLocaleString()} ratings</span>
                  </div>
                </div>
                {[
                  { name: "Priya R.", stars: 5, text: "Absolutely mesmerizing. One of the most memorable books I've read this year." },
                  { name: "James T.", stars: 4, text: "Beautiful prose and a unique concept. A few slow sections but overall exceptional." },
                  { name: "Sarah M.", stars: 5, text: "I couldn't put it down. Moved me to tears more than once. Highly recommend." },
                ].map((r, i) => (
                  <div key={i} className="review-card">
                    <div className="review-card__header">
                      <div className="review-card__avatar">{r.name[0]}</div>
                      <div>
                        <p className="review-card__name">{r.name}</p>
                        <div className="review-card__stars">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={12} fill={s <= r.stars ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="review-card__text">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="book-detail__related">
          <div className="book-detail__related-inner">
            <h2>You Might Also Like</h2>
            <div className="books-grid books-grid--4">
              {related.map(b => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
