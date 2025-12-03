import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin, ChevronRight, MessageCircle } from 'lucide-react';
import { SITE_CONFIG, API_BASE_URL } from '../constants';
import { Category } from '../types';

const Footer: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/categories/list.php`);
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error('Kategoriler yüklenirken hata oluştu', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <footer className="bg-bohem-paper dark:bg-zinc-950 border-t border-bohem-stone dark:border-zinc-800 pt-20 pb-10 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="brand-font text-4xl text-bohem-gold dark:text-white mb-6 tracking-wider">
              Bohem
            </Link>
            <p className="text-bohem-text dark:text-zinc-400 mb-8 leading-relaxed text-sm md:text-base">
              {SITE_CONFIG.tagline} <br/>
              Batman ve çevresinde modern, minimalist ve size özel perde çözümleri.
            </p>
            <div className="flex space-x-5">
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bohem-stone/50 dark:bg-zinc-800 flex items-center justify-center text-bohem-dark dark:text-white hover:bg-bohem-gold hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                <Instagram size={20} />
              </a>
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bohem-stone/50 dark:bg-zinc-800 flex items-center justify-center text-bohem-dark dark:text-white hover:bg-bohem-gold hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                <Facebook size={20} />
              </a>
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-bohem-stone/50 dark:bg-zinc-800 flex items-center justify-center text-bohem-dark dark:text-white hover:bg-bohem-gold hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-medium mb-6 text-bohem-dark dark:text-white relative inline-block">
              Hızlı Bağlantılar
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-bohem-gold dark:bg-white md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1"><ChevronRight size={14} /> Ana Sayfa</Link></li>
              <li><Link to="/about" className="text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1"><ChevronRight size={14} /> Hakkımızda</Link></li>
              <li><Link to="/products" className="text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1"><ChevronRight size={14} /> Tüm Ürünler</Link></li>
              <li><Link to="/contact" className="text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1"><ChevronRight size={14} /> İletişim</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-medium mb-6 text-bohem-dark dark:text-white relative inline-block">
              Koleksiyonlar
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-bohem-gold dark:bg-white md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2"></span>
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link to={`/products?category=${cat.id}`} className="text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white transition-colors flex items-center justify-center md:justify-start gap-1">
                    <ChevronRight size={14} /> {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact - Enhanced Visibility */}
          <div className="text-center md:text-left">
            <h4 className="font-serif text-xl font-medium mb-6 text-bohem-dark dark:text-white relative inline-block">
              Bize Ulaşın
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-bohem-gold dark:bg-white md:left-0 left-1/2 md:translate-x-0 -translate-x-1/2"></span>
            </h4>
            <ul className="space-y-6">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-bohem-light dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 flex items-center justify-center text-bohem-gold dark:text-white shrink-0 group-hover:bg-bohem-gold dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <MapPin size={18} />
                </div>
                <span className="text-bohem-text dark:text-zinc-400 text-sm md:text-base">{SITE_CONFIG.address}</span>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-bohem-light dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 flex items-center justify-center text-bohem-gold dark:text-white shrink-0 group-hover:bg-bohem-gold dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                   <a href={`tel:${SITE_CONFIG.phone}`} className="text-bohem-dark dark:text-zinc-200 font-medium hover:text-bohem-gold dark:hover:text-white">{SITE_CONFIG.phone}</a>
                   <span className="text-xs text-bohem-text/60 dark:text-zinc-500">Haftaiçi 09:00 - 19:00</span>
                </div>
              </li>
              <li className="flex flex-col md:flex-row items-center md:items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-bohem-light dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 flex items-center justify-center text-bohem-gold dark:text-white shrink-0 group-hover:bg-bohem-gold dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                  <Mail size={18} />
                </div>
                <a href="mailto:bohemperdee@gmail.com" className="text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white mt-2 md:mt-0">bohemperdee@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-bohem-stone/60 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center text-bohem-text/60 dark:text-zinc-600 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-1 md:gap-4 mb-4 md:mb-0 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları saklıdır.</p>
            <span className="hidden md:inline text-bohem-stone dark:text-zinc-700">|</span>
            <a href="https://bilincreklam.com" target="_blank" rel="noreferrer" className="hover:text-bohem-gold dark:hover:text-white transition-colors font-medium">
              Design & Development by Bilinç Reklam
            </a>
          </div>
          <div className="flex space-x-6">
            <span className="hover:text-bohem-gold dark:hover:text-white cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-bohem-gold dark:hover:text-white cursor-pointer">Kullanım Şartları</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;