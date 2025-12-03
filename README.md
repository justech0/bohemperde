# Bohem Perde - PHP + MySQL + React

Bu repo, Vite + React ile hazırlanmış Bohem Perde web sitesini gerçek bir PHP + MySQL backend ve yönetici paneli ile birlikte sunar.

## Kurulum Adımları

1. **Veritabanı**
   - `database.sql` dosyasını phpMyAdmin veya MySQL üzerinden içe aktarın. Şema otomatik olarak `u220042353_bohem_data` adlı veritabanını oluşturur ve daha önce React tarafında bulunan tüm kategoriler, ürünler, görseller, renkler ve hero slider içeriklerini hazır olarak ekler.
   - Varsayılan admin kullanıcı: `admin` / `admin123` (şifre `password_hash` ile üretilmiştir).

2. **PHP Backend**
   - `api/config/db.php` varsayılan olarak aşağıdaki bilgilerle gelir: veritabanı `u220042353_bohem_data`, kullanıcı `u220042353_bohem_admin`, şifre `Bohem7212.` (gerekirse ortam değişkenleri ile override edebilirsiniz).
   - `api` klasörünü PHP barındırma ortamınıza (örneğin `https://alanadiniz.com/api`) yükleyin.
   - `uploads/` klasörü yoksa PHP uçları otomatik oluşturur; yazma izinlerini verin.

3. **Frontend**
   - Geliştirme için: `npm install` ve `npm run dev`.
   - Canlıya almak için: `npm run build` çıktısını (oluşan `dist/` klasörü içindeki `index.html` ve `assets/` dosyalarıyla birlikte) sunucunuzun public dizinine gönderin. Tarayıcının `/admin` ve `/admin/dashboard` yollarını da çözebilmesi için Hostinger’da SPA yönlendirmesini (örn. .htaccess ile `RewriteRule . index.html [L]`) açmanız yeterlidir.
   - API adresini `.env` ile değiştirebilirsiniz: `VITE_API_BASE_URL=https://bohemperde.com/api` (aynı domaindeki `/api` path’ini kullanıyorsanız varsayılanı koruyabilirsiniz).

4. **Admin Paneli**
   - Giriş adresi: `/admin`
   - Yönetim paneli: `/admin/dashboard` (giriş sonrası yönlenir).

## API Endpoint Özeti

- Auth: `api/auth/login.php`, `api/auth/logout.php`, `api/auth/me.php`
- Kategori: `api/categories/list.php`, `get.php`, `create.php`, `update.php`, `delete.php`
- Ürün: `api/products/list.php`, `get.php`, `create.php`, `update.php`, `delete.php`
- Slider: `api/slides/list.php`, `create.php`, `update.php`, `delete.php`
- Upload: `api/upload/upload-image.php`

Tüm uçlar JSON döndürür: `{ success: boolean, data?, message?, errors? }` ve yönetici işlemleri için PHP session kontrolü yapılır.
