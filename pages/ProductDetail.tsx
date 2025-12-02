import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS, SITE_CONFIG } from '../constants';
import { ArrowLeft, Check, Phone, ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 1 = normal, 2 = zoomed
  const imageRef = useRef<HTMLImageElement>(null);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLightBoxOpen) return;
    
    if (e.key === 'ArrowRight') {
      nextImage(e);
    } else if (e.key === 'ArrowLeft') {
      prevImage(e);
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  }, [isLightBoxOpen, product]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isLightBoxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, isLightBoxOpen]);

  // Handle Pan on Zoom
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel === 1 || !imageRef.current) return;

    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width * 100;
    const y = (e.clientY - top) / height * 100;

    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  const toggleZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomLevel(prev => prev === 1 ? 2.5 : 1);
  };

  const closeLightbox = () => {
    setIsLightBoxOpen(false);
    setZoomLevel(1);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col bg-bohem-light dark:bg-black">
        <h2 className="text-3xl font-serif mb-4 text-bohem-dark dark:text-white">Ürün bulunamadı</h2>
        <Link to="/products" className="text-bohem-gold dark:text-white underline hover:text-bohem-dark dark:hover:text-gray-300 transition-colors">Ürünlere Dön</Link>
      </div>
    );
  }

  const nextImage = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setActiveImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Merhaba, ${product.name} (Kod: ${product.id}) hakkında bilgi almak istiyorum.`)}`;

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 container mx-auto px-4 md:px-8 bg-bohem-light dark:bg-black min-h-screen transition-colors duration-300">
      
      {/* Full Screen Lightbox Modal */}
      {isLightBoxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button - Fixed high z-index and click handling */}
          <button 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer"
          >
            <X size={28} />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
          >
            <img 
              ref={imageRef}
              src={product.images[activeImage]} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            />
            
            {/* Nav Buttons (Lightbox) - Hide if zoomed to prevent accidental clicks */}
            {product.images.length > 1 && zoomLevel === 1 && (
               <>
                 <button 
                   onClick={prevImage}
                   className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 md:p-4 rounded-full transition-all backdrop-blur-sm z-[105]"
                 >
                   <ChevronLeft size={32} />
                 </button>
                 <button 
                   onClick={nextImage}
                   className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 p-3 md:p-4 rounded-full transition-all backdrop-blur-sm z-[105]"
                 >
                   <ChevronRight size={32} />
                 </button>
               </>
            )}

            {/* Helper Text */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full pointer-events-none transition-opacity ${zoomLevel > 1 ? 'opacity-0' : 'opacity-100'}`}>
              <span className="flex items-center gap-1"><ZoomIn size={14}/> Yakınlaştırmak için tıkla</span>
            </div>
            
             {/* Counter */}
            <div className="absolute top-4 left-4 text-white/90 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md font-medium tracking-widest text-sm border border-white/10 pointer-events-none">
              {activeImage + 1} / {product.images.length}
            </div>
          </div>
        </div>
      )}

      <Link to="/products" className="inline-flex items-center text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white mb-6 md:mb-8 transition-colors font-medium">
        <ArrowLeft size={18} className="mr-2" />
        Tüm Ürünler
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        {/* Images Gallery */}
        <div className="space-y-4 md:space-y-6">
          <div 
            className="aspect-[4/5] bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-800 overflow-hidden rounded-2xl relative group shadow-lg cursor-zoom-in"
            onClick={() => setIsLightBoxOpen(true)}
          >
             <img 
               src={product.images[activeImage]} 
               alt={`${product.name} - Görsel ${activeImage + 1}`}
               className="w-full h-full object-cover transition-all duration-700"
             />
             
             {/* Zoom Indicator */}
             <div className="absolute top-4 right-4 bg-black/20 text-white p-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize2 size={20} />
             </div>

             {/* Navigation Arrows (Inline) */}
             {product.images.length > 1 && (
               <>
                 <button 
                   onClick={prevImage}
                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-bohem-paper/90 dark:bg-black/80 hover:bg-white dark:hover:bg-white text-bohem-dark dark:text-white dark:hover:text-black p-2 md:p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm transform hover:scale-110 border border-bohem-stone dark:border-zinc-700 z-10"
                   aria-label="Önceki görsel"
                 >
                   <ChevronLeft size={20} />
                 </button>
                 <button 
                   onClick={nextImage}
                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-bohem-paper/90 dark:bg-black/80 hover:bg-white dark:hover:bg-white text-bohem-dark dark:text-white dark:hover:text-black p-2 md:p-3 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm transform hover:scale-110 border border-bohem-stone dark:border-zinc-700 z-10"
                   aria-label="Sonraki görsel"
                 >
                   <ChevronRight size={20} />
                 </button>
               </>
             )}
             
             {/* Image counter indicator */}
             <div className="absolute bottom-4 right-4 bg-bohem-dark/60 dark:bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
               {activeImage + 1} / {product.images.length}
             </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="w-full overflow-hidden">
               <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                  }
               `}</style>
               <div 
                 className="flex space-x-3 md:space-x-4 overflow-x-auto pb-2 scrollbar-hide px-1"
                 style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
               >
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 relative rounded-xl overflow-hidden transition-all duration-300 border ${activeImage === idx ? 'border-bohem-gold dark:border-white scale-105 shadow-md' : 'border-bohem-stone dark:border-zinc-800 opacity-70 hover:opacity-100 hover:border-bohem-dark dark:hover:border-white'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 className="brand-font text-4xl md:text-5xl text-bohem-dark dark:text-white mb-4 md:mb-6 leading-tight">{product.name}</h1>
          <p className="text-bohem-text dark:text-zinc-300 leading-relaxed mb-8 md:mb-10 text-base md:text-lg font-light">
            {product.description}
          </p>

          <div className="mb-8 md:mb-10">
            <h4 className="text-sm font-bold uppercase tracking-wider text-bohem-dark dark:text-white mb-4">Renk Seçenekleri</h4>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {product.colors.map(color => (
                <span key={color} className="flex items-center gap-2 px-3 md:px-4 py-2 border border-bohem-stone dark:border-zinc-700 rounded-full text-sm text-bohem-text dark:text-zinc-300 bg-bohem-paper dark:bg-zinc-900 hover:border-bohem-gold dark:hover:border-white transition-colors cursor-default shadow-sm">
                  <span className="w-3 h-3 rounded-full bg-bohem-border dark:bg-zinc-600 shadow-inner"></span>
                  {color}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8 md:mb-12">
            <h4 className="text-sm font-bold uppercase tracking-wider text-bohem-dark dark:text-white mb-4">Özellikler</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-bohem-text dark:text-zinc-300 group text-sm md:text-base">
                <span className="w-6 h-6 rounded-full bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 flex items-center justify-center mr-3 group-hover:border-bohem-gold dark:group-hover:border-white transition-colors">
                  <Check size={14} className="text-bohem-gold dark:text-white" />
                </span>
                Özel ölçüye göre üretim
              </li>
              <li className="flex items-center text-bohem-text dark:text-zinc-300 group text-sm md:text-base">
                <span className="w-6 h-6 rounded-full bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 flex items-center justify-center mr-3 group-hover:border-bohem-gold dark:group-hover:border-white transition-colors">
                  <Check size={14} className="text-bohem-gold dark:text-white" />
                </span>
                Leke tutmaz kumaş seçenekleri
              </li>
              <li className="flex items-center text-bohem-text dark:text-zinc-300 group text-sm md:text-base">
                <span className="w-6 h-6 rounded-full bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-700 flex items-center justify-center mr-3 group-hover:border-bohem-gold dark:group-hover:border-white transition-colors">
                  <Check size={14} className="text-bohem-gold dark:text-white" />
                </span>
                Ücretsiz montaj (Batman içi)
              </li>
            </ul>
          </div>

          <div className="bg-bohem-paper dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-bohem-stone dark:border-zinc-800 shadow-sm">
            <p className="text-bohem-text dark:text-zinc-400 mb-6 text-center leading-relaxed font-light text-sm md:text-base">
              Fiyatlar ölçü ve pile sıklığına göre değişmektedir. <br/>Detaylı bilgi için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-[#128C7E] transition-all font-medium shadow-lg shadow-green-500/20 transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                WhatsApp İle Sor
              </a>
              <a 
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-bohem-gold dark:bg-white text-white dark:text-black px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-bohem-dark dark:hover:bg-gray-200 transition-all font-medium shadow-lg shadow-bohem-gold/20 dark:shadow-white/10 transform hover:-translate-y-0.5 text-sm md:text-base"
              >
                <Phone size={20} />
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;