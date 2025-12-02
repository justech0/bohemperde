import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';

// Scroll to top on route change component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const About: React.FC = () => (
  <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 text-center min-h-[60vh] bg-bohem-light dark:bg-black transition-colors duration-300">
    <div className="max-w-3xl mx-auto bg-bohem-paper dark:bg-zinc-900 p-10 md:p-16 rounded-[3rem] shadow-sm border border-bohem-stone dark:border-zinc-800">
      <h1 className="brand-font text-5xl mb-8 text-bohem-dark dark:text-white">Hakkımızda</h1>
      <div className="w-24 h-1 bg-bohem-gold dark:bg-white mx-auto mb-10"></div>
      <p className="text-bohem-text dark:text-zinc-300 leading-loose text-lg font-light">
        Bohem Perde olarak Batman'da yıllardır müşterilerimize en kaliteli perde sistemleri ve dekorasyon çözümlerini sunuyoruz. 
        <br/><br/>
        Misyonumuz, yaşam ve çalışma alanlarınızın ruhunu yansıtan, hem estetik hem de işlevsel ürünleri en uygun fiyatlarla sizlerle buluşturmak.
        Sadece evleriniz için değil; ofisler, oteller, okullar ve kurumsal projeler için de profesyonel çözümler üretiyoruz.
        <br/><br/>
        Doğal dokular, sıcak tonlar ve modern tasarımları bir araya getirerek mekanlarınıza huzur ve prestij katıyoruz.
        Uzman montaj ekibimiz ve satış sonrası desteğimizle her zaman yanınızdayız.
      </p>
    </div>
  </div>
);

// Layout wrapper for public pages to include Navbar/Footer
const PublicLayout: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-bohem-light dark:bg-black transition-colors duration-300">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes - No Public Navbar/Footer */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
        <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      </Routes>
    </Router>
  );
};

export default App;