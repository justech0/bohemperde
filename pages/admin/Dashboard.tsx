import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Layers, Image as ImageIcon, Plus, Trash2, X, Save, Edit3, ExternalLink } from 'lucide-react';
import { Product, Category, Slide } from '../../types';
import { API_BASE_URL } from '../../constants';

type Tab = 'products' | 'categories' | 'hero';

type ProductForm = {
  id?: number;
  name: string;
  slug: string;
  category_id: number | '';
  description: string;
  price?: number | '';
  is_new: boolean;
  is_active: boolean;
  colors: string[];
  images: string[];
};

type CategoryForm = {
  id?: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  is_active: boolean;
};

type SlideForm = {
  id?: number;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  sort_order?: number;
  is_active: boolean;
  image_path?: string;
  file?: File | null;
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProductForm | CategoryForm | SlideForm | any>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [colorInput, setColorInput] = useState('');
  const [message, setMessage] = useState('');

  const fetchAll = async () => {
    try {
      const [catRes, prodRes, slideRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories/list.php`, { credentials: 'include' }),
        fetch(`${API_BASE_URL}/products/list.php`, { credentials: 'include' }),
        fetch(`${API_BASE_URL}/slides/list.php`, { credentials: 'include' })
      ]);
      const catJson = await catRes.json();
      const prodJson = await prodRes.json();
      const slideJson = await slideRes.json();
      if (catJson.success) setCategories(catJson.data || []);
      if (prodJson.success) setProducts(prodJson.data || []);
      if (slideJson.success) setSlides(slideJson.data || []);
    } catch (error) {
      console.error('Veri çekilemedi', error);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/auth/logout.php`, { method: 'POST', credentials: 'include' });
    localStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  const openEdit = (item: any, type: Tab) => {
    if (type === 'products') {
      const imgPaths = (item.images || []).map((img: any) => img.image_path || img);
      setFormData({
        id: item.id,
        name: item.name,
        slug: item.slug,
        category_id: item.category_id,
        description: item.description,
        price: item.price ?? '',
        is_new: Boolean(item.is_new),
        is_active: Boolean(item.is_active),
        colors: item.colors || [],
        images: imgPaths
      });
    } else if (type === 'categories') {
      setFormData({
        id: item.id,
        name: item.name,
        slug: item.slug,
        image: item.image,
        description: item.description,
        is_active: Boolean(item.is_active)
      });
    } else {
      setFormData({
        id: item.id,
        title: item.title,
        subtitle: item.subtitle,
        cta_text: item.cta_text,
        cta_link: item.cta_link,
        sort_order: item.sort_order,
        is_active: Boolean(item.is_active),
        image_path: item.image_path,
        file: null
      });
    }
    setEditId(item.id);
    setIsEditing(true);
  };

  const openNew = () => {
    if (activeTab === 'products') {
      setFormData({
        name: '',
        slug: '',
        category_id: categories[0]?.id || '',
        description: '',
        price: '',
        is_new: false,
        is_active: true,
        colors: [],
        images: ['', '', '']
      } as ProductForm);
    } else if (activeTab === 'categories') {
      setFormData({ name: '', slug: '', image: '', description: '', is_active: true } as CategoryForm);
    } else {
      setFormData({ title: '', subtitle: '', cta_text: 'Ürünleri İncele', cta_link: '/products', sort_order: 1, is_active: true, image_path: '', file: null } as SlideForm);
    }
    setEditId(null);
    setIsEditing(true);
    setMessage('');
  };

  const addColor = () => {
    if (colorInput.trim()) {
      setFormData({ ...formData, colors: [...(formData.colors || []), colorInput.trim()] });
      setColorInput('');
    }
  };
  const removeColor = (idx: number) => {
    const newColors = [...(formData.colors || [])];
    newColors.splice(idx, 1);
    setFormData({ ...formData, colors: newColors });
  };
  const updateImage = (idx: number, val: string) => {
    const newImgs = [...(formData.images || [])];
    newImgs[idx] = val;
    setFormData({ ...formData, images: newImgs });
  };

  const handleSave = async () => {
    setMessage('');
    try {
      if (activeTab === 'products') {
        const payload = {
          ...formData,
          is_new: formData.is_new ? 1 : 0,
          is_active: formData.is_active ? 1 : 0,
          category_id: Number(formData.category_id),
          price: formData.price === '' ? null : Number(formData.price)
        };
        const url = editId ? `${API_BASE_URL}/products/update.php` : `${API_BASE_URL}/products/create.php`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...payload, id: editId })
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Ürün kaydedilemedi');
        await fetchAll();
      } else if (activeTab === 'categories') {
        const payload = { ...formData, is_active: formData.is_active ? 1 : 0 };
        const url = editId ? `${API_BASE_URL}/categories/update.php` : `${API_BASE_URL}/categories/create.php`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...payload, id: editId })
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Kategori kaydedilemedi');
        await fetchAll();
      } else {
        const url = editId ? `${API_BASE_URL}/slides/update.php` : `${API_BASE_URL}/slides/create.php`;
        const form = new FormData();
        form.append('title', formData.title || '');
        if (formData.subtitle) form.append('subtitle', formData.subtitle);
        if (formData.cta_text) form.append('cta_text', formData.cta_text);
        if (formData.cta_link) form.append('cta_link', formData.cta_link);
        form.append('sort_order', String(formData.sort_order || 1));
        form.append('is_active', formData.is_active ? '1' : '0');
        if (editId) form.append('id', String(editId));
        if (formData.image_path) form.append('image_path', formData.image_path);
        if (formData.file) form.append('image', formData.file);

        const res = await fetch(url, { method: 'POST', credentials: 'include', body: form });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || 'Slide kaydedilemedi');
        await fetchAll();
      }
      setMessage('Kayıt başarılı');
      setIsEditing(false);
      setEditId(null);
    } catch (error: any) {
      alert(error.message || 'Kayıt sırasında hata oluştu');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Silmek istediğinize emin misiniz?')) return;
    const url = activeTab === 'products' ? `${API_BASE_URL}/products/delete.php`
      : activeTab === 'categories' ? `${API_BASE_URL}/categories/delete.php` : `${API_BASE_URL}/slides/delete.php`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ id })
    });
    const json = await res.json();
    if (!json.success) {
      alert(json.message || 'Silme işlemi başarısız');
    } else {
      await fetchAll();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <header className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
            <div className="brand-font text-2xl text-bohem-gold">Bohem Panel</div>
            <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700">v1.0 PHP</span>
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
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 hidden md:block">
            <nav className="p-4 space-y-2">
                <button
                    onClick={() => { setActiveTab('products'); setIsEditing(false); setMessage(''); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-bohem-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                    <Package size={20} /> Ürün Yönetimi
                </button>
                <button
                    onClick={() => { setActiveTab('categories'); setIsEditing(false); setMessage(''); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'categories' ? 'bg-bohem-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                    <Layers size={20} /> Kategoriler
                </button>
                <button
                    onClick={() => { setActiveTab('hero'); setIsEditing(false); setMessage(''); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'hero' ? 'bg-bohem-gold text-black font-bold' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                >
                    <ImageIcon size={20} /> Hero Slider
                </button>
            </nav>
        </aside>

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

            {message && <div className="mb-4 text-emerald-400">{message}</div>}

            {isEditing ? (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl animate-fade-in">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-zinc-800">
                        <h3 className="text-xl font-bold">
                            {editId ? 'Düzenle' : 'Yeni Ekle'}
                        </h3>
                        <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-zinc-800 rounded-full transition-colors"><X size={20}/></button>
                    </div>

                    <div className="grid gap-6">
                        {activeTab === 'products' && (
                            <>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Ürün Adı</label>
                                        <input className="admin-input" value={(formData as ProductForm).name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Slug</label>
                                        <input className="admin-input" value={(formData as ProductForm).slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Kategori</label>
                                        <select className="admin-input" value={(formData as ProductForm).category_id} onChange={e => setFormData({...formData, category_id: e.target.value})}>
                                            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Fiyat (opsiyonel)</label>
                                        <input className="admin-input" type="number" value={(formData as ProductForm).price as any} onChange={e => setFormData({...formData, price: e.target.value})} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Açıklama</label>
                                    <textarea className="admin-input h-24" value={(formData as ProductForm).description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm text-zinc-400">Ürün Görselleri (en fazla 3 URL)</label>
                                    {[0,1,2].map(i => (
                                      <input key={i} className="admin-input" placeholder={`Görsel URL ${i+1}`} value={(formData as ProductForm).images?.[i] || ''} onChange={e => updateImage(i, e.target.value)} />
                                    ))}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Renk Seçenekleri</label>
                                    <div className="flex gap-2">
                                        <input className="admin-input flex-1" placeholder="Renk adı yazın..." value={colorInput} onChange={e => setColorInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addColor()} />
                                        <button onClick={addColor} type="button" className="bg-zinc-700 px-4 rounded hover:bg-zinc-600">Ekle</button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {(formData as ProductForm).colors?.map((c, idx) => (
                                            <span key={idx} className="bg-bohem-gold/20 text-bohem-gold px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                {c} <button onClick={() => removeColor(idx)}><X size={12}/></button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="isNew" className="w-5 h-5 rounded accent-bohem-gold" checked={(formData as ProductForm).is_new} onChange={e => setFormData({...formData, is_new: e.target.checked})} />
                                    <label htmlFor="isNew" className="text-white cursor-pointer select-none">Bu ürün "YENİ" etiketi ile gösterilsin</label>
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="isActive" className="w-5 h-5 rounded accent-bohem-gold" checked={(formData as ProductForm).is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                                    <label htmlFor="isActive" className="text-white cursor-pointer select-none">Ürün yayında olsun</label>
                                </div>
                            </>
                        )}

                         {activeTab === 'categories' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Kategori Adı</label>
                                    <input className="admin-input" value={(formData as CategoryForm).name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Slug (URL)</label>
                                    <input className="admin-input" value={(formData as CategoryForm).slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Kapak Görseli URL</label>
                                    <input className="admin-input" value={(formData as CategoryForm).image} onChange={e => setFormData({...formData, image: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Kısa Açıklama</label>
                                    <input className="admin-input" value={(formData as CategoryForm).description} onChange={e => setFormData({...formData, description: e.target.value})} />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" id="catActive" className="w-5 h-5 rounded accent-bohem-gold" checked={(formData as CategoryForm).is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                                    <label htmlFor="catActive" className="text-white cursor-pointer select-none">Kategori yayında olsun</label>
                                </div>
                            </>
                        )}

                        {activeTab === 'hero' && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Başlık</label>
                                    <input className="admin-input" value={(formData as SlideForm).title} onChange={e => setFormData({...formData, title: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Alt Başlık</label>
                                    <input className="admin-input" value={(formData as SlideForm).subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Arka Plan Görseli URL</label>
                                    <input className="admin-input" value={(formData as SlideForm).image_path} onChange={e => setFormData({...formData, image_path: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-zinc-400">Veya Görsel Yükle</label>
                                    <input type="file" accept="image/*" className="admin-input" onChange={e => setFormData({...formData, file: e.target.files?.[0] || null})} />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Buton Metni</label>
                                        <input className="admin-input" value={(formData as SlideForm).cta_text} onChange={e => setFormData({...formData, cta_text: e.target.value})} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Buton Linki</label>
                                        <input className="admin-input" value={(formData as SlideForm).cta_link} onChange={e => setFormData({...formData, cta_link: e.target.value})} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm text-zinc-400">Sıra</label>
                                        <input className="admin-input" type="number" value={(formData as SlideForm).sort_order} onChange={e => setFormData({...formData, sort_order: Number(e.target.value)})} />
                                    </div>
                                    <div className="flex items-center gap-3 pt-6">
                                        <input type="checkbox" id="slideActive" className="w-5 h-5 rounded accent-bohem-gold" checked={(formData as SlideForm).is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
                                        <label htmlFor="slideActive" className="text-white cursor-pointer select-none">Slide yayında olsun</label>
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
                                            <img src={p.images?.[0]?.image_path} alt="" className="w-12 h-12 rounded object-cover bg-zinc-800" />
                                        </td>
                                        <td className="p-4 font-medium text-white">{p.name} {p.is_new ? <span className="ml-2 text-[10px] bg-bohem-gold text-black px-2 py-0.5 rounded-full">YENİ</span> : null}</td>
                                        <td className="p-4 text-zinc-400">{categories.find(c => c.id === p.category_id)?.name || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex gap-1 flex-wrap max-w-xs">
                                                {p.colors?.map((c, idx) => <span key={idx} className="text-[10px] border border-zinc-700 px-2 rounded bg-zinc-900">{c}</span>)}
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
                                            <img src={s.image_path} alt="" className="w-24 h-12 rounded object-cover bg-zinc-800" />
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

      <footer className="bg-zinc-950 border-t border-zinc-900 py-4 px-6 text-right">
        <a href="https://bilincreklam.com" target="_blank" className="text-xs text-zinc-600 hover:text-bohem-gold transition-colors font-medium opacity-70 hover:opacity-100">
            Design & Development by Bilinç Reklam
        </a>
      </footer>
    </div>
  );
};

export default AdminDashboard;
