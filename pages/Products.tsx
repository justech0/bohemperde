import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Search } from 'lucide-react';

const Products: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const initialCat = query.get('category');
  const initialSearch = query.get('q');
  
  const [selectedCat, setSelectedCat] = useState<string>(initialCat || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch || '');
  
  // Sync local state when URL params change
  useEffect(() => {
    if (initialSearch !== null) {
      setSearchQuery(initialSearch);
    }
    if (initialCat) {
      setSelectedCat(initialCat);
    }
  }, [initialSearch, initialCat]);

  // Update URL when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    const params = new URLSearchParams(search);
    if(val) params.set('q', val);
    else params.delete('q');
    navigate({ search: params.toString() }, { replace: true });
  };
  
  // Filter by category then by search text (including category name)
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = selectedCat === 'all' || p.categoryId === selectedCat;
    
    // Find category name for search text comparison
    const productCategory = CATEGORIES.find(c => c.id === p.categoryId);
    const categoryName = productCategory ? productCategory.name.toLowerCase() : '';
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch = p.name.toLowerCase().includes(searchLower) || 
                          p.description.toLowerCase().includes(searchLower) ||
                          categoryName.includes(searchLower);

    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 min-h-screen bg-bohem-light dark:bg-black transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-bohem-stone dark:border-zinc-800 pb-8">
        <div>
          <h1 className="brand-font text-5xl md:text-6xl text-bohem-dark dark:text-white mb-4">Ürünlerimiz</h1>
          <p className="text-bohem-text dark:text-zinc-400 text-lg font-light">Mekanınıza değer katacak özel tasarımlar.</p>
        </div>
        
        {/* Filters Container */}
        <div className="mt-8 md:mt-0 w-full md:w-auto flex flex-col items-end gap-5">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72">
             <input 
               type="text" 
               placeholder="Filtrele..." 
               className="w-full pl-11 pr-5 py-3 bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 rounded-full text-sm text-bohem-dark dark:text-white focus:outline-none focus:border-bohem-gold dark:focus:border-white focus:ring-1 focus:ring-bohem-gold/50 dark:focus:ring-white/50 placeholder-bohem-text/40 dark:placeholder-zinc-500 shadow-sm transition-all"
               value={searchQuery}
               onChange={handleSearchChange}
             />
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-bohem-text/50 dark:text-zinc-500" />
          </div>

          {/* Category Pills */}
          <div className="w-full md:w-auto overflow-hidden">
            <style>{`
              .scrollbar-hide::-webkit-scrollbar {
                  display: none;
              }
            `}</style>
            <div 
              className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <button 
                onClick={() => setSelectedCat('all')}
                className={`px-6 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all border ${selectedCat === 'all' ? 'bg-bohem-dark dark:bg-white text-white dark:text-black border-bohem-dark dark:border-white shadow-md' : 'bg-bohem-paper dark:bg-zinc-900 text-bohem-text dark:text-zinc-400 border-bohem-stone dark:border-zinc-700 hover:border-bohem-gold dark:hover:border-white hover:text-bohem-gold dark:hover:text-white'}`}
              >
                Tümü
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id)}
                  className={`px-6 py-2.5 text-sm font-medium whitespace-nowrap rounded-full transition-all border ${selectedCat === cat.id ? 'bg-bohem-dark dark:bg-white text-white dark:text-black border-bohem-dark dark:border-white shadow-md' : 'bg-bohem-paper dark:bg-zinc-900 text-bohem-text dark:text-zinc-400 border-bohem-stone dark:border-zinc-700 hover:border-bohem-gold dark:hover:border-white hover:text-bohem-gold dark:hover:text-white'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map(product => (
          <Link to={`/products/${product.id}`} key={product.id} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-bohem-paper dark:bg-zinc-900 rounded-[1.5rem] mb-5 shadow-sm border border-bohem-stone/50 dark:border-zinc-800 group-hover:shadow-md transition-all">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-bohem-gold text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-bohem-stone">
                  Yeni
                </span>
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-bohem-dark/0 dark:bg-white/0 group-hover:bg-bohem-dark/5 dark:group-hover:bg-white/5 transition-colors duration-300" />
            </div>
            <h3 className="font-serif text-2xl text-bohem-dark dark:text-white group-hover:text-bohem-gold dark:group-hover:text-gray-300 transition-colors mb-2">{product.name}</h3>
            <p className="text-sm text-bohem-text dark:text-zinc-400 mb-4 line-clamp-2 leading-relaxed font-light">{product.description}</p>
            <div className="flex gap-2">
              {product.colors.slice(0, 3).map((c, i) => (
                <span key={i} className="text-[10px] font-medium text-bohem-text/80 dark:text-zinc-400 bg-bohem-paper dark:bg-zinc-900 px-3 py-1 rounded-full border border-bohem-stone dark:border-zinc-800 uppercase tracking-wide">{c}</span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] font-medium text-bohem-text/60 dark:text-zinc-600 px-1 py-1">+ {product.colors.length - 3}</span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-bohem-text/60 dark:text-zinc-600">
          <Search size={48} className="mb-4 opacity-20 text-bohem-dark dark:text-white" />
          <p className="text-lg">Bu kriterlere uygun ürün bulunamadı.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCat('all');}}
            className="mt-4 text-bohem-gold dark:text-white underline hover:text-bohem-dark dark:hover:text-gray-300 transition-colors"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;