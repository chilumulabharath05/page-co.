import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import BookDetail from './pages/BookDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
