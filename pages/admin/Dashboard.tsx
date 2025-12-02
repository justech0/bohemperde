import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Layers, Image as ImageIcon, Plus, Trash2, X, Save, Edit3, ExternalLink } from 'lucide-react';
import { PRODUCTS, CATEGORIES, HERO_SLIDES } from '../../constants';
import { Product, Category, Slide } from '../../types';

// Tabs for the dashboard
type Tab = 'products' | 'categories' | 'hero';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  
  // Local state to simulate database (initialized with constant data)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [slides, setSlides] = useState<Slide[]>(HERO_SLIDES);

  // Form States
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | number | null>(null);
  
  // Generic form state holder
  const [formData, setFormData] = useState<any>({});
  // Specific state for color tag input
  const [colorInput, setColorInput] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const openEdit = (item: any, type: Tab) => {
    setFormData({ ...item });
    setEditId(item.id);
    setIsEditing(true);
  };

  const openNew = () => {
    // Reset form based on tab
    if (activeTab === 'products') {
      setFormData({
        id: `p${Date.now()}`,
        name: '',
        categoryId: categories[0]?.id || '1',
        description: '',
        images: ['', '', ''],
        colors: [],
        isNew: false
      });
    } else if (activeTab === 'categories') {
      setFormData({
        id: `${Date.now()}`,
        name: '',
        slug: '',
        image: '',
        description: ''
      });
    } else {
      setFormData({
        id: Date.now(),
        title: '',
        subtitle: '',
        image: '',
        ctaText: 'Ürünleri İncele',
        ctaLink: '/products'
      });
    }
    setEditId(null);
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real PHP app, this would be a fetch/axios POST call to your PHP API
    // e.g. formData sent to /api/save_product.php
    
    if (activeTab === 'products') {
      if (editId) {
        setProducts(prev => prev.map(p => p.id === editId ? formData : p));
      } else {
        setProducts(prev => [formData, ...prev]);
      }
    } else if (activeTab === 'categories') {
      if (editId) {
        setCategories(prev => prev.map(c => c.id === editId ? formData : c));
      } else {
        setCategories(prev => [formData, ...prev]);
      }
    } else {
       if (editId) {
        setSlides(prev => prev.map(s => s.id === editId ? formData : s));
      } else {
        setSlides(prev => [formData, ...prev]);
      }
    }
    setIsEditing(false);
    alert("Kayıt Başarılı! (Simülasyon)");
  };

  const handleDelete = (id: string | number) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return;
    
    if (activeTab === 'products') {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else if (activeTab === 'categories') {
      setCategories(prev => prev.filter(c => c.id !== id));
    } else {
      setSlides(prev => prev.filter(s => s.id !== id));
    }
  };

  // Helper for Product Colors
  const addColor = () => {
    if (colorInput.trim()) {
      setFormData({ ...formData, colors: [...(formData.colors || []), colorInput.trim()] });
      setColorInput('');
    }
  };
  const removeColor = (idx: number) => {
    const newColors = [...formData.colors];
    newColors.splice(idx, 1);
    setFormData({ ...formData, colors: newColors });
  };

  // Helper for Images (Product has array of 3)
  const updateImage = (idx: number, val: string) => {
    const newImgs = [...(formData.images || [])];
    newImgs[idx] = val;
    setFormData({ ...formData, images: newImgs });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="brand-font text-2xl text-bohem-gold">Bohem Panel</div>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700">v1.0 PHP-Ready</span>
        </div>
        <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                <ExternalLink size={16} /> Siteyi Görüntüle
            </a>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <LogOut size={16} /> Çıkış Yap
            </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:block">
            <nav className="p-4 space-y-2">
                <button 
                    onClick={() => { setActiveTab('products'); setIsEditing(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-bohem-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                    <Package size={20} /> Ürün Yönetimi
                </button>
                <button 
                    onClick={() => { setActiveTab('categories'); setIsEditing(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'categories' ? 'bg-bohem-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                    <Layers size={20} /> Kategoriler
                </button>
                <button 
                    onClick={() => { setActiveTab('hero'); setIsEditing(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'hero' ? 'bg-bohem-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                    <ImageIcon size={20} /> Hero Slider
                </button>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-white">
                    {activeTab === 'products' && 'Ürün Listesi'}
                    {activeTab === 'categories' && 'Kategori Listesi'}
                    {activeTab === 'hero' && 'Slider Görselleri'}
                </h2>
                {!isEditing && (
                    <button onClick={openNew} className="flex items-center gap-2 bg-zinc-100 text-black px-5 py-2.5 rounded-full font-bold hover:bg-zinc-300 transition-colors">
                        <Plus size={18} /> Yeni Ekle
                    </button>
                )}
            </div>

            {/* EDITOR VIEW */}
            {isEditing ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl animate-fade-in">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-zinc-800">
                        <h3 className="text-xl font-bold">
                            {editId ? 'Düzenle' : 'Yeni Ekle'}
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors"><X size={20}/></button>
                    </div>

                    <div className="grid gap-6">
                        
                        {/* PRODUCT FORM */}
                        {activeTab === 'products' && (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Ürün Adı</label>
                                        <input className="admin-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Kategori</label>
                                        <select className="admin-input" value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})}>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Açıklama</label>
                                    <textarea className="admin-input h-24" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </div>
                                
                                {/* 3 Images */}
                                <div className="space-y-3">
                                    <label className="text-sm text-zinc-400">Ürün Görselleri (3 Adet URL)</label>
                                    {[0, 1, 2].map(i => (
                                        <input key={i} className="admin-input" placeholder={`Görsel URL ${i+1}`} value={formData.images?.[i] || ''} onChange={e => updateImage(i, e.target.value)} />
                                    ))}
                                </div>

                                {/* Colors Tag Input */}
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Renk Seçenekleri (örn: Zümrüt Yeşili)</label>
                                    <div className="flex gap-2">
                                        <input 
                                            className="admin-input flex-1" 
                                            placeholder="Renk adı yazın..." 
                                            value={colorInput} 
                                            onChange={e => setColorInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addColor()}
                                        />
                                        <button onClick={addColor} type="button" className="bg-zinc-700 px-4 rounded hover:bg-zinc-600">Ekle</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData.colors?.map((c: string, idx: number) => (
                                            <span key={idx} className="bg-bohem-gold/20 text-bohem-gold px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                {c} <button onClick={() => removeColor(idx)}><X size={12}/></button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-2">
                                    <input 
                                        type="checkbox" 
                                        id="isNew" 
                                        className="w-5 h-5 rounded accent-bohem-gold"
                                        checked={formData.isNew || false}
                                        onChange={e => setFormData({...formData, isNew: e.target.checked})}
                                    />
                                    <label htmlFor="isNew" className="text-white cursor-pointer select-none">Bu ürün "YENİ" etiketi ile gösterilsin</label>
                                </div>
                            </>
                        )}

                         {/* CATEGORY FORM */}
                         {activeTab === 'categories' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Kategori Adı</label>
                                    <input className="admin-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Slug (URL)</label>
                                    <input className="admin-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Kapak Görseli URL</label>
                                    <input className="admin-input" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Kısa Açıklama</label>
                                    <input className="admin-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </div>
                            </>
                        )}

                        {/* HERO FORM */}
                        {activeTab === 'hero' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Başlık</label>
                                    <input className="admin-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Alt Başlık</label>
                                    <input className="admin-input" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Arka Plan Görseli URL</label>
                                    <input className="admin-input" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Buton Metni</label>
                                        <input className="admin-input" value={formData.ctaText} onChange={e => setFormData({...formData, ctaText: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Buton Linki</label>
                                        <input className="admin-input" value={formData.ctaLink} onChange={e => setFormData({...formData, ctaLink: e.target.value})} />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-zinc-800">
                            <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg hover:bg-zinc-800 transition-colors">İptal</button>
                            <button onClick={handleSave} className="flex items-center gap-2 bg-bohem-gold hover:bg-white hover:text-black text-white px-8 py-2 rounded-lg font-bold transition-all shadow-lg shadow-bohem-gold/20">
                                <Save size={18} /> Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                /* LIST VIEW */
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-950 text-zinc-400 uppercase text-xs tracking-wider">
                                <tr>
                                    <th className="p-4">Görsel</th>
                                    <th className="p-4">Başlık / İsim</th>
                                    {activeTab === 'products' && <th className="p-4">Kategori</th>}
                                    {activeTab === 'products' && <th className="p-4">Renkler</th>}
                                    <th className="p-4 text-right">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {activeTab === 'products' && products.map(p => (
                                    <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="p-4">
                                            <img src={p.images[0]} alt="" className="w-12 h-12 rounded object-cover bg-zinc-800" />
                                        </td>
                                        <td className="p-4 font-medium text-white">{p.name} {p.isNew && <span className="ml-2 text-[10px] bg-bohem-gold text-black px-2 py-0.5 rounded-full">YENİ</span>}</td>
                                        <td className="p-4 text-zinc-400">{categories.find(c => c.id === p.categoryId)?.name || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-1 flex-wrap max-w-xs">
                                                {p.colors.map(c => <span key={c} className="text-[10px] border border-zinc-700 px-2 rounded bg-zinc-900">{c}</span>)}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => openEdit(p, 'products')} className="p-2 bg-zinc-800 hover:bg-blue-900/50 text-blue-400 rounded transition-colors"><Edit3 size={16}/></button>
                                            <button onClick={() => handleDelete(p.id)} className="p-2 bg-zinc-800 hover:bg-red-900/50 text-red-400 rounded transition-colors"><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}

                                {activeTab === 'categories' && categories.map(c => (
                                    <tr key={c.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="p-4">
                                            <img src={c.image} alt="" className="w-12 h-12 rounded object-cover bg-zinc-800" />
                                        </td>
                                        <td className="p-4 font-medium text-white">{c.name}</td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => openEdit(c, 'categories')} className="p-2 bg-zinc-800 hover:bg-blue-900/50 text-blue-400 rounded transition-colors"><Edit3 size={16}/></button>
                                            <button onClick={() => handleDelete(c.id)} className="p-2 bg-zinc-800 hover:bg-red-900/50 text-red-400 rounded transition-colors"><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}

                                {activeTab === 'hero' && slides.map(s => (
                                    <tr key={s.id} className="hover:bg-zinc-800/50 transition-colors">
                                        <td className="p-4">
                                            <img src={s.image} alt="" className="w-24 h-12 rounded object-cover bg-zinc-800" />
                                        </td>
                                        <td className="p-4 font-medium text-white">
                                            {s.title}
                                            <div className="text-xs text-zinc-500">{s.subtitle}</div>
                                        </td>
                                        <td className="p-4 text-right space-x-2">
                                            <button onClick={() => openEdit(s, 'hero')} className="p-2 bg-zinc-800 hover:bg-blue-900/50 text-blue-400 rounded transition-colors"><Edit3 size={16}/></button>
                                            <button onClick={() => handleDelete(s.id)} className="p-2 bg-zinc-800 hover:bg-red-900/50 text-red-400 rounded transition-colors"><Trash2 size={16}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
      </div>
      
      {/* Admin Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-4 px-6 text-right">
        <a href="https://bilincreklam.com" target="_blank" className="text-xs text-zinc-600 hover:text-bohem-gold transition-colors font-medium opacity-70 hover:opacity-100">
            Design & Development by Bilinç Reklam
        </a>
      </footer>

      <style>{`
        .admin-input {
            width: 100%;
            background-color: #18181b; /* zinc-950 */
            border: 1px solid #27272a; /* zinc-800 */
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            color: white;
            transition: all 0.2s;
        }
        .admin-input:focus {
            outline: none;
            border-color: #c5a065;
            box-shadow: 0 0 0 1px #c5a065;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;