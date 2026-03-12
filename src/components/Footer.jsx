import { Link } from 'react-router-dom';
import { BookOpen, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <BookOpen size={20} />
            <span>Page<em>&</em>Co</span>
          </div>
          <p className="footer__tagline">
            A curated collection of stories that move, inspire, and linger.
          </p>
          <div className="footer__socials">
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="Email"><Mail size={16} /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Browse</h4>
          <Link to="/browse">All Books</Link>
          <Link to="/browse?filter=bestseller">Bestsellers</Link>
          <Link to="/browse?filter=new">New Arrivals</Link>
          <Link to="/browse?genre=Fiction">Fiction</Link>
          <Link to="/browse?genre=Science Fiction">Sci-Fi</Link>
        </div>

        <div className="footer__col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Our Story</a>
          <a href="#">Blog</a>
          <a href="#">Press</a>
          <a href="#">Careers</a>
        </div>

        <div className="footer__col">
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Privacy</a>
        </div>

        <div className="footer__newsletter">
          <h4>Stay in the story</h4>
          <p>Get curated book recommendations every month.</p>
          <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2024 Page&Co. All rights reserved. Made with love for readers.</p>
        <div className="footer__bottom-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
