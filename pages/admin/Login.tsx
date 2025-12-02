import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    // In a real PHP backend scenario, this would POST to /api/login.php
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl mb-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-bohem-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={32} className="text-white" />
          </div>
          <h1 className="brand-font text-3xl mb-2">Yönetici Girişi</h1>
          <p className="text-zinc-500 text-sm">Bohem Perde Yönetim Paneli</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:border-bohem-gold focus:outline-none transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-lg text-white focus:border-bohem-gold focus:outline-none transition-colors"
              placeholder="••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-bohem-gold hover:bg-white hover:text-black text-white py-3 rounded-lg font-bold transition-all duration-300"
          >
            Giriş Yap
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-zinc-600 hover:text-white text-sm transition-colors">← Siteye Dön</a>
        </div>
      </div>
      
      <a href="https://bilincreklam.com" target="_blank" rel="noreferrer" className="text-xs text-zinc-600 hover:text-bohem-gold transition-colors font-medium opacity-70 hover:opacity-100">
            Design & Development by Bilinç Reklam
      </a>
    </div>
  );
};

export default AdminLogin;