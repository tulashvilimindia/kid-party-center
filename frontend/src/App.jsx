import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LanguageWrapper from './components/LanguageWrapper';

// Pages
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Calculator from './pages/Calculator';
import Calendar from './pages/Calendar';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app">
      <Header />
      <main style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          {/* Redirect root to /en */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* Language-based routes */}
          <Route path="/:lang" element={<LanguageWrapper />}>
            <Route index element={<Home />} />
            <Route path="packages" element={<Packages />} />
            <Route path="packages/:slug" element={<PackageDetail />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
          </Route>

          {/* Catch-all redirect to /en */}
          <Route path="*" element={<Navigate to="/en" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
