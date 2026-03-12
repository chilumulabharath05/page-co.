import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('pageandco-theme') || 'light';
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pageandco-wishlist') || '[]');
    } catch { return []; }
  });

  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pageandco-cart') || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pageandco-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('pageandco-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('pageandco-cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const toggleWishlist = (bookId) => {
    setWishlist(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const isWishlisted = (bookId) => wishlist.includes(bookId);

  const addToCart = (book) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) return prev.map(item =>
        item.id === book.id ? { ...item, qty: item.qty + 1 } : item
      );
      return [...prev, { ...book, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const wishlistCount = wishlist.length;

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      wishlist, toggleWishlist, isWishlisted, wishlistCount,
      cart, addToCart, cartCount
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
