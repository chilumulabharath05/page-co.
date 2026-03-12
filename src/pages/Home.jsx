import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Star, BookOpen, Users, Award, Truck } from 'lucide-react';
import { books, getFeaturedBooks, getBestsellers, getNewArrivals } from '../data/books';
import BookCard from '../components/BookCard';
import './Home.css';

export default function Home() {
  const [activeHero, setActiveHero] = useState(0);
  const featured = getFeaturedBooks();
  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHero(prev => (prev + 1) % featured.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const heroBook = featured[activeHero];

  return (
    <div className="home page-enter">
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg" style={{ backgroundImage: `url(${heroBook?.cover})` }} />
        <div className="hero__overlay" />
        <div className="hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">Featured Pick</span>
            <h1 className="hero__title">{heroBook?.title}</h1>
            <p className="hero__author">by {heroBook?.author}</p>
            <p className="hero__desc">{heroBook?.description}</p>
            <div className="hero__rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(heroBook?.rating || 0) ? 'currentColor' : 'none'} />
              ))}
              <span>{heroBook?.rating} ({heroBook?.reviews?.toLocaleString()} reviews)</span>
            </div>
            <div className="hero__actions">
              <Link to={`/book/${heroBook?.id}`} className="hero__btn hero__btn--primary">
                Read More <ArrowRight size={16} />
              </Link>
              <Link to="/browse" className="hero__btn hero__btn--ghost">
                Browse All
              </Link>
            </div>
          </div>

          <div className="hero__book-showcase">
            {featured.map((book, i) => (
              <div
                key={book.id}
                className={`hero__book-thumb ${i === activeHero ? 'active' : ''}`}
                onClick={() => setActiveHero(i)}
              >
                <img src={book.cover} alt={book.title} />
              </div>
            ))}
          </div>
        </div>

        <div className="hero__dots">
          {featured.map((_, i) => (
            <button
              key={i}
              className={`hero__dot ${i === activeHero ? 'active' : ''}`}
              onClick={() => setActiveHero(i)}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stats__inner">
          {[
            { icon: BookOpen, value: '10,000+', label: 'Books Available' },
            { icon: Users, value: '250K+', label: 'Happy Readers' },
            { icon: Award, value: '500+', label: 'Award Winners' },
            { icon: Truck, value: 'Free', label: 'Shipping Over $30' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="stats__item">
              <Icon size={22} className="stats__icon" />
              <span className="stats__value">{value}</span>
              <span className="stats__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="section">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">Readers' Favorites</span>
              <h2 className="section__title">Bestsellers</h2>
            </div>
            <Link to="/browse?filter=bestseller" className="section__more">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="books-grid books-grid--4">
            {bestsellers.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* BANNER */}
      <section className="banner">
        <div className="banner__inner">
          <div className="banner__text">
            <h2>New Arrivals This Month</h2>
            <p>Fresh stories, fresh perspectives. Discover what's just landed on our shelves.</p>
            <Link to="/browse?filter=new" className="banner__btn">
              Shop New Arrivals <ArrowRight size={16} />
            </Link>
          </div>
          <div className="banner__books">
            {newArrivals.map(book => (
              <Link to={`/book/${book.id}`} key={book.id} className="banner__book">
                <img src={book.cover} alt={book.title} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALL BOOKS GRID */}
      <section className="section">
        <div className="section__inner">
          <div className="section__head">
            <div>
              <span className="section__eyebrow">Explore the Collection</span>
              <h2 className="section__title">For Every Reader</h2>
            </div>
            <Link to="/browse" className="section__more">
              Browse All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="books-grid books-grid--4">
            {books.slice(4, 12).map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="quote-section">
        <div className="quote-section__inner">
          <blockquote>
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </blockquote>
          <cite>— George R.R. Martin</cite>
        </div>
      </section>
    </div>
  );
}
