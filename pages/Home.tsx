import React from 'react';
import HeroSlider from '../components/HeroSlider';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { Ruler, Truck, ShieldCheck, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in bg-bohem-light dark:bg-black transition-colors duration-300">
      <HeroSlider />

      {/* Categories Section */}
      <section className="py-24 container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="brand-font text-5xl md:text-6xl text-bohem-dark dark:text-white mb-6">Koleksiyonlar</h2>
          <p className="text-bohem-text dark:text-zinc-400 font-light text-xl max-w-2xl mx-auto leading-relaxed">
            Her mekana uyum sağlayan, estetik ve fonksiyonelliği birleştiren özel perde koleksiyonlarımız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link to={`/products?category=${cat.id}`} key={cat.id} className="group relative overflow-hidden h-96 rounded-[2rem] shadow-md hover:shadow-xl transition-all duration-500 border border-bohem-stone/50 dark:border-zinc-800">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bohem-dark/90 via-bohem-dark/20 to-transparent dark:from-black/90 dark:via-black/40 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="brand-font text-3xl mb-2 text-bohem-light">{cat.name}</h3>
                <p className="text-bohem-paper text-sm font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {cat.description}
                </p>
                <div className="h-0.5 w-12 bg-bohem-gold dark:bg-white mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Steps / Value Prop */}
      <section className="bg-bohem-paper dark:bg-zinc-950 py-24 border-y border-bohem-stone dark:border-zinc-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-bohem-light dark:bg-zinc-900 rounded-[2.5rem] shadow-sm border border-bohem-stone dark:border-zinc-800 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="w-20 h-20 bg-bohem-paper dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-bohem-gold dark:text-white border border-bohem-border dark:border-zinc-700 shadow-inner">
                <Ruler size={36} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-2xl mb-4 text-bohem-dark dark:text-white">Ücretsiz Keşif & Ölçü</h4>
              <p className="text-bohem-text dark:text-zinc-400 leading-relaxed">
                Uzman ekibimiz yerinde ölçü alarak mekana en uygun çözümleri profesyonelce sunar.
              </p>
            </div>
            <div className="text-center p-8 bg-bohem-light dark:bg-zinc-900 rounded-[2.5rem] shadow-sm border border-bohem-stone dark:border-zinc-800 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="w-20 h-20 bg-bohem-paper dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-bohem-gold dark:text-white border border-bohem-border dark:border-zinc-700 shadow-inner">
                <ShieldCheck size={36} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-2xl mb-4 text-bohem-dark dark:text-white">Kaliteli İşçilik</h4>
              <p className="text-bohem-text dark:text-zinc-400 leading-relaxed">
                Birinci sınıf kumaşlar ve titiz dikim ile uzun ömürlü, garantili perdeler.
              </p>
            </div>
            <div className="text-center p-8 bg-bohem-light dark:bg-zinc-900 rounded-[2.5rem] shadow-sm border border-bohem-stone dark:border-zinc-800 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
              <div className="w-20 h-20 bg-bohem-paper dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 text-bohem-gold dark:text-white border border-bohem-border dark:border-zinc-700 shadow-inner">
                <Truck size={36} strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-2xl mb-4 text-bohem-dark dark:text-white">Montaj & Teslimat</h4>
              <p className="text-bohem-text dark:text-zinc-400 leading-relaxed">
                Söz verdiğimiz tarihte teslimat ve evinizi kirletmeden profesyonel montaj hizmeti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 container mx-auto px-4 text-center bg-bohem-light dark:bg-black transition-colors duration-300">
        <div className="max-w-5xl mx-auto bg-bohem-paper dark:bg-zinc-900 text-bohem-dark dark:text-white rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-xl border border-bohem-stone dark:border-zinc-800">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/60 dark:bg-zinc-700/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-bohem-gold/10 dark:bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="brand-font text-5xl md:text-7xl mb-8 text-bohem-dark dark:text-white tracking-tight">Hayalinizdeki Perdeyi Tasarlayalım</h2>
            <p className="text-bohem-text dark:text-zinc-300 mb-12 max-w-xl mx-auto text-xl font-light leading-relaxed">
              Ev dekorasyonunda fark yaratmak için bizimle iletişime geçin, size özel seçenekleri sunalım.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-bohem-dark dark:bg-white text-white dark:text-black hover:bg-bohem-gold dark:hover:bg-zinc-200 transition-all duration-300 rounded-full font-bold tracking-wide shadow-lg transform hover:-translate-y-1 text-lg">
              <span>Hemen Teklif Al</span>
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;