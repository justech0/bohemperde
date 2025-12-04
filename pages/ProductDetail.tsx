import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SITE_CONFIG, API_BASE_URL } from '../constants';
import { ArrowLeft, Check, Phone, ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from 'lucide-react';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/products/get.php?slug=${encodeURIComponent(id)}`);
      const json = await res.json();
      if (!json.success) {
        const fallback = await fetch(`${API_BASE_URL}/products/get.php?id=${encodeURIComponent(id)}`);
        const fallbackJson = await fallback.json();
        if (fallbackJson.success) {
          setProduct(fallbackJson.data);
        }
      } else {
        setProduct(json.data);
      }
    } catch (error) {
      console.error('Ürün yüklenemedi', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isLightBoxOpen) return;
    if (e.key === 'ArrowRight') { nextImage(e); }
    else if (e.key === 'ArrowLeft') { prevImage(e); }
    else if (e.key === 'Escape') { closeLightbox(); }
  }, [isLightBoxOpen, product]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = isLightBoxOpen ? 'hidden' : 'auto';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, isLightBoxOpen]);

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

  if (!product && loading) {
    return <div className="min-h-screen flex items-center justify-center bg-bohem-light dark:bg-black text-bohem-text dark:text-white">Yükleniyor...</div>;
  }

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
    setActiveImage((prev) => (prev + 1) % (product.images?.length || 1));
  };

  const prevImage = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setZoomLevel(1);
    setActiveImage((prev) => (prev === 0 ? (product.images?.length || 1) - 1 : prev - 1));
  };

  const whatsappLink = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(`Merhaba, ${product.name} hakkında bilgi almak istiyorum.`)}`;

  const imageUrls = product.images?.map(img => img.image_path) || [];

  return (
    <div className="pt-24 md:pt-32 pb-12 md:pb-20 container mx-auto px-4 md:px-8 bg-bohem-light dark:bg-black min-h-screen transition-colors duration-300">
      {isLightBoxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer"
          >
            <X size={28} />
          </button>

          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
          >
            <img
              ref={imageRef}
              src={imageUrls[activeImage]}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
            />

            {imageUrls.length > 1 && zoomLevel === 1 && (
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

            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full pointer-events-none transition-opacity ${zoomLevel > 1 ? 'opacity-0' : 'opacity-100'}`}>
              <span className="flex items-center gap-1"><ZoomIn size={14}/> Yakınlaştırmak için tıkla</span>
            </div>

            <div className="absolute top-4 left-4 text-white/90 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md font-medium tracking-widest text-sm border border-white/10 pointer-events-none">
              {activeImage + 1} / {imageUrls.length}
            </div>
          </div>
        </div>
      )}

      <Link to="/products" className="inline-flex items-center text-bohem-text dark:text-zinc-400 hover:text-bohem-gold dark:hover:text-white mb-6 md:mb-8 transition-colors font-medium">
        <ArrowLeft size={18} className="mr-2" />
        Tüm Ürünler
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
        <div className="space-y-4 md:space-y-6">
          <div
            className="aspect-[4/5] bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-800 overflow-hidden rounded-2xl relative group shadow-lg cursor-zoom-in"
            onClick={() => setIsLightBoxOpen(true)}
          >
             <img
               src={imageUrls[activeImage]}
               alt={`${product.name} - Görsel ${activeImage + 1}`}
               className="w-full h-full object-cover transition-all duration-700"
             />

             <div className="absolute top-4 right-4 bg-black/20 text-white p-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                <Maximize2 size={20} />
             </div>

             {imageUrls.length > 1 && (
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

             <div className="absolute bottom-4 right-4 bg-bohem-dark/60 dark:bg-black/70 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
               {activeImage + 1} / {imageUrls.length}
             </div>
          </div>

          {imageUrls.length > 1 && (
            <div className="w-full overflow-hidden">
               <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                      display: none;
                  }
               `}</style>
               <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                 {imageUrls.map((img, idx) => (
                   <button
                     key={idx}
                     onClick={() => setActiveImage(idx)}
                     className={`relative w-24 h-24 rounded-xl overflow-hidden border transition-all ${activeImage === idx ? 'border-bohem-gold scale-100' : 'border-bohem-stone/70 hover:border-bohem-gold/60 scale-[0.98]'}`}
                   >
                     <img src={img} alt={`${product.name} ${idx+1}`} className="w-full h-full object-cover" />
                   </button>
                 ))}
               </div>
            </div>
          )}
        </div>

        <div className="bg-bohem-paper dark:bg-zinc-900 rounded-[2rem] p-8 md:p-10 shadow-lg border border-bohem-stone/60 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            {product.is_new ? <span className="px-3 py-1 text-xs font-bold bg-bohem-gold/20 text-bohem-gold rounded-full border border-bohem-gold/40 uppercase tracking-wide">Yeni</span> : null}
            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${product.is_active ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'}`}>
              {product.is_active ? 'Yayında' : 'Pasif'}
            </span>
          </div>
          <h1 className="brand-font text-4xl md:text-5xl text-bohem-dark dark:text-white mb-4 leading-tight">{product.name}</h1>
          <p className="text-bohem-text dark:text-zinc-300 leading-relaxed text-lg mb-6 whitespace-pre-line">{product.description}</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm text-bohem-text/70 dark:text-zinc-400 mb-2 uppercase tracking-wide">Renk Seçenekleri</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, idx) => (
                  <span key={idx} className="px-3 py-1 text-sm bg-bohem-light dark:bg-black/40 border border-bohem-stone dark:border-zinc-800 rounded-full text-bohem-dark dark:text-white">{c}</span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 mb-8 text-sm text-bohem-text dark:text-zinc-400">
            <div className="flex items-center gap-2"><Check size={16} /> Ölçüye özel üretim</div>
            <div className="flex items-center gap-2"><Check size={16} /> Uzman keşif ve montaj</div>
            <div className="flex items-center gap-2"><Check size={16} /> Batman ve çevresine hızlı teslimat</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-bohem-gold hover:bg-white hover:text-black text-white px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-bohem-gold/30"
            >
              <Phone size={18} /> Whatsapp Sipariş
            </a>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-2 bg-bohem-dark hover:bg-black text-white px-6 py-3 rounded-full font-semibold transition-all border border-black/10"
            >
              <Phone size={18} /> Ara: {SITE_CONFIG.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
