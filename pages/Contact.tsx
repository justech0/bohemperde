import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 md:px-8 bg-bohem-light dark:bg-black transition-colors duration-300">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="brand-font text-5xl md:text-6xl text-bohem-dark dark:text-white mb-4">İletişim</h1>
        <p className="text-bohem-text dark:text-zinc-400 text-lg font-light max-w-2xl mx-auto">Mağazamızı ziyaret edin, hayalinizdeki perdeleri birlikte tasarlayalım.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Info Cards */}
        <div className="grid grid-cols-1 gap-6">
          <div className="p-8 bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-800 shadow-sm rounded-2xl flex items-start gap-5 hover:shadow-md transition-shadow">
            <div className="bg-bohem-light dark:bg-zinc-800 border border-bohem-stone dark:border-zinc-700 p-4 rounded-full text-bohem-gold dark:text-white shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-2 text-bohem-dark dark:text-white">Adresimiz</h3>
              <p className="text-bohem-text dark:text-zinc-400 leading-relaxed mb-4">
                {SITE_CONFIG.address}
              </p>
              <a 
                href="https://www.google.com/maps/dir//Bohem+Perde,+Belde,+%C3%96mer+Muhtar+Blv.+Tirman+Park+Sitesi+E+blok+Alt%C4%B1,+72000+Batman+Merkez%2FBatman/@37.902468,41.138066,16z/data=!4m17!1m7!3m6!1s0x400b473dd2977bff:0x3c92cee9c9d4307b!2sBohem+Perde!8m2!3d37.9024683!4d41.1380663!16s%2Fg%2F1w3452wk!4m8!1m0!1m5!1m1!1s0x400b473dd2977bff:0x3c92cee9c9d4307b!2m2!1d41.1380663!2d37.9024683!3e1?hl=tr&entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noreferrer" 
                className="text-sm text-bohem-gold dark:text-white font-bold uppercase tracking-wide hover:text-bohem-dark dark:hover:text-gray-300 transition-colors"
              >
                Yol Tarifi Al →
              </a>
            </div>
          </div>

          <div className="p-8 bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-800 shadow-sm rounded-2xl flex items-start gap-5 hover:shadow-md transition-shadow">
            <div className="bg-bohem-light dark:bg-zinc-800 border border-bohem-stone dark:border-zinc-700 p-4 rounded-full text-bohem-gold dark:text-white shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-2 text-bohem-dark dark:text-white">Telefon</h3>
              <p className="text-bohem-text dark:text-zinc-400 mb-4">
                Sorularınız, randevu veya keşif talepleriniz için bizi arayın.
              </p>
              <a href={`tel:${SITE_CONFIG.phone}`} className="text-xl font-medium text-bohem-dark dark:text-white hover:text-bohem-gold dark:hover:text-gray-300 transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </div>
          </div>

          <div className="p-8 bg-bohem-paper dark:bg-zinc-900 border border-bohem-stone dark:border-zinc-800 shadow-sm rounded-2xl flex items-start gap-5 hover:shadow-md transition-shadow">
            <div className="bg-bohem-light dark:bg-zinc-800 border border-bohem-stone dark:border-zinc-700 p-4 rounded-full text-bohem-gold dark:text-white shrink-0">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-serif text-2xl mb-2 text-bohem-dark dark:text-white">WhatsApp</h3>
              <p className="text-bohem-text dark:text-zinc-400 mb-4">
                Ölçülerinizi veya pencere fotoğraflarınızı gönderin, fiyat verelim.
              </p>
              <a href={`https://wa.me/${SITE_CONFIG.whatsapp}`} className="text-xl font-medium text-bohem-dark dark:text-white hover:text-bohem-gold dark:hover:text-gray-300 transition-colors">
                WhatsApp Hattı
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-[500px] bg-bohem-stone/30 dark:bg-zinc-900 rounded-2xl overflow-hidden border border-bohem-stone dark:border-zinc-800 shadow-inner">
           <iframe 
             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.1965521525935!2d41.13549137516606!3d37.90246827195345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x400b473dd2977bff%3A0x3c92cee9c9d4307b!2sBohem%20Perde!5e0!3m2!1str!2str!4v1762338897252!5m2!1str!2str" 
             width="100%" 
             height="100%" 
             style={{ border: 0 }} 
             allowFullScreen 
             loading="lazy" 
             referrerPolicy="no-referrer-when-downgrade"
             title="Bohem Perde Location"
             className="grayscale-[20%] contrast-[0.9] dark:grayscale dark:contrast-125 dark:invert"
           ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;