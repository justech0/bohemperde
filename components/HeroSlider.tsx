import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../constants';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-bohem-dark group">
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Removed backdrop-blur as requested */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform transition-transform duration-[10000ms] scale-105"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentIndex ? 'scale(110%)' : 'scale(100%)' 
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Centered Content Card */}
      <div className="absolute inset-0 flex items-center justify-center px-4 md:px-8 z-10">
        <div className="bg-bohem-paper/95 dark:bg-zinc-950/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl p-8 md:p-12 max-w-4xl w-full text-center border border-white/50 dark:border-zinc-800 animate-fade-in transition-colors duration-300">
          
          <h1 className="brand-font text-5xl md:text-7xl text-bohem-dark dark:text-white mb-6 tracking-tight transition-colors">
            Stil, ışıkla buluştu.
          </h1>
          
          <p className="text-bohem-text dark:text-zinc-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed transition-colors">
            Bohem Perde, Batman ve çevresinde modern, minimalist ve özelleştirilebilir perde çözümleri sunar. Ölçünüze göre üretim, uzman keşif ve montaj ile yanınızdayız.
          </p>

          {/* Features Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {['Özelleştirilebilir Modeller', 'Hızlı Teslimat', 'Keşif & Montaj'].map((tag, i) => (
              <span key={i} className="px-5 py-2 bg-bohem-light dark:bg-zinc-800 border border-bohem-stone dark:border-zinc-700 text-bohem-dark dark:text-zinc-200 rounded-full text-sm font-medium tracking-wide transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Actions: Button & Search aligned */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 max-w-2xl mx-auto h-auto md:h-14">
            <Link
              to="/products"
              className="flex items-center justify-center px-8 bg-bohem-gold hover:bg-bohem-dark dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-bohem-gold/20 whitespace-nowrap h-14 md:h-full"
            >
              Ürünleri İncele
            </Link>

            <form onSubmit={handleSearch} className="relative w-full md:flex-1 h-14 md:h-full">
              <input 
                type="text" 
                placeholder="Ürün veya kategori ara..." 
                className="w-full h-full px-6 bg-white dark:bg-zinc-900 border border-bohem-border dark:border-zinc-700 rounded-full text-bohem-dark dark:text-white focus:outline-none focus:border-bohem-gold dark:focus:border-white focus:ring-1 focus:ring-bohem-gold/50 dark:focus:ring-white/50 shadow-inner dark:placeholder-zinc-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-bohem-dark hover:bg-bohem-gold dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-full text-sm font-medium transition-colors"
              >
                Ara
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'w-12 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;