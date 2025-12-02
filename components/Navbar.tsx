import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Search, Sun, Moon } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  // Hide search on Home and Products page (since they have their own search/filter sections)
  const hideSearch = location.pathname === '/' || location.pathname === '/products';

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  const isTransparent = isHome && !scrolled;

  // Dynamic classes
  const navLinkClass = `text-sm font-medium uppercase tracking-wide transition-colors ${
    !isTransparent 
      ? 'text-bohem-dark hover:text-bohem-gold dark:text-gray-200 dark:hover:text-white' 
      : 'text-white/90 hover:text-white shadow-sm'
  }`;

  const logoClass = `brand-font text-3xl md:text-4xl tracking-widest font-normal transition-colors ${
    !isTransparent ? 'text-bohem-gold dark:text-white' : 'text-white drop-shadow-md'
  }`;

  const ctaButtonClass = `hidden lg:flex items-center gap-2 px-5 py-2 rounded-full transition-all text-xs font-semibold uppercase tracking-wider ${
    !isTransparent
      ? 'bg-bohem-gold text-white hover:bg-bohem-dark dark:bg-white dark:text-black dark:hover:bg-gray-200'
      : 'bg-white text-bohem-dark hover:bg-bohem-paper'
  }`;

  const mobileMenuButtonClass = `md:hidden p-2 transition-colors ${
    !isTransparent ? 'text-bohem-dark hover:text-bohem-gold dark:text-white' : 'text-white hover:text-bohem-paper'
  }`;

  const searchInputClass = `w-full md:w-48 lg:w-60 pl-9 pr-4 py-1.5 rounded-full text-sm focus:outline-none transition-all ${
    !isTransparent
      ? 'bg-white border border-bohem-stone text-bohem-dark placeholder-bohem-text/50 focus:border-bohem-gold dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-white'
      : 'bg-white/10 border border-white/30 text-white placeholder-white/70 focus:bg-white/20 focus:border-white'
  }`;

  const searchIconClass = `absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
    !isTransparent ? 'text-bohem-text/50 dark:text-gray-400' : 'text-white/70'
  }`;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        !isTransparent 
          ? 'bg-bohem-paper/95 dark:bg-zinc-950/95 shadow-md py-3 border-b border-bohem-stone dark:border-zinc-800' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className={`absolute inset-0 bg-bohem-paper/95 dark:bg-zinc-950/95 backdrop-blur-md transition-opacity duration-300 ${!isTransparent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex justify-between items-center gap-4">
          
          <button 
            className={mobileMenuButtonClass}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <nav className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            <Link to="/" className={navLinkClass}>Ana Sayfa</Link>
            <Link to="/about" className={navLinkClass}>Hakkımızda</Link>
          </nav>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/" className={logoClass}>
              Bohem
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {!hideSearch && (
              <form onSubmit={handleSearchSubmit} className="relative animate-fade-in">
                <Search className={searchIconClass} />
                <input 
                  type="text" 
                  placeholder="Ara..." 
                  className={searchInputClass}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            )}

            <nav className="flex items-center space-x-6 lg:space-x-8">
              <Link to="/products" className={navLinkClass}>Ürünler</Link>
              <Link to="/contact" className={navLinkClass}>İletişim</Link>
              
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${!isTransparent ? 'hover:bg-bohem-stone/30 dark:hover:bg-zinc-800 text-bohem-dark dark:text-white' : 'text-white hover:bg-white/10'}`}
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`} 
                target="_blank" 
                rel="noreferrer"
                className={ctaButtonClass}
              >
                <Phone size={14} />
                <span>Teklif Al</span>
              </a>
            </nav>
          </div>

          <div className="md:hidden flex items-center gap-3">
             <button 
                onClick={toggleTheme}
                className={mobileMenuButtonClass}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-bohem-paper dark:bg-zinc-900 border-b border-bohem-stone dark:border-zinc-800 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[500px] shadow-lg' : 'max-h-0'}`}>
        <div className="p-6 space-y-5">
           {!hideSearch && (
             <form onSubmit={handleSearchSubmit} className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bohem-text/50 dark:text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Ürün ara..." 
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-800 border border-bohem-border dark:border-zinc-700 rounded-xl text-bohem-dark dark:text-white focus:outline-none focus:border-bohem-gold dark:focus:border-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
           )}

          <nav className="flex flex-col space-y-4 text-center">
            <Link to="/" className="text-bohem-dark dark:text-white text-lg hover:text-bohem-gold font-medium">Ana Sayfa</Link>
            <Link to="/products" className="text-bohem-dark dark:text-white text-lg hover:text-bohem-gold font-medium">Ürünler</Link>
            <Link to="/about" className="text-bohem-dark dark:text-white text-lg hover:text-bohem-gold font-medium">Hakkımızda</Link>
            <Link to="/contact" className="text-bohem-dark dark:text-white text-lg hover:text-bohem-gold font-medium">İletişim</Link>
          </nav>

          <a 
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`} 
              className="flex items-center justify-center gap-2 bg-bohem-gold dark:bg-white text-white dark:text-black py-3.5 px-6 rounded-xl font-medium w-full shadow-lg shadow-bohem-gold/20 dark:shadow-white/10"
            >
              <Phone size={18} />
              WhatsApp'tan Ulaşın
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;