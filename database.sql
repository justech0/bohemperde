CREATE DATABASE IF NOT EXISTS u220042353_bohem_data CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE u220042353_bohem_data;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255) NULL,
  description TEXT NULL,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NULL,
  is_new TINYINT(1) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_products_category_id (category_id),
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  sort_order TINYINT UNSIGNED DEFAULT 1,
  INDEX idx_product_images_product_id (product_id),
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Product colors table
CREATE TABLE IF NOT EXISTS product_colors (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  color_name VARCHAR(100) NOT NULL,
  INDEX idx_product_colors_product_id (product_id),
  CONSTRAINT fk_product_colors_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Hero slides table
CREATE TABLE IF NOT EXISTS hero_slides (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  image_path VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NULL,
  cta_text VARCHAR(100) NULL,
  cta_link VARCHAR(255) NULL,
  sort_order INT UNSIGNED DEFAULT 1,
  is_active TINYINT(1) DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed admin user
INSERT INTO admin_users (username, password_hash) VALUES
('admin', '$2y$12$7jTRAu0eqBzj57AtE5P9R.C/OdXLbo4uG8oSPahB0RKrlo87BPB46')
ON DUPLICATE KEY UPDATE username = VALUES(username);

-- Seed categories
INSERT INTO categories (id, name, slug, image, description, is_active) VALUES
(1, 'Tül Perdeler', 'tul-perde', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600', 'Zarif ve hafif dokular.', 1),
(2, 'Fon Perdeler', 'fon-perde', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=600', 'Mekana derinlik katan renkler.', 1),
(3, 'Stor & Zebra', 'stor-zebra', 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=600', 'Modern ve pratik çözümler.', 1),
(4, 'Ahşap Jaluzi', 'ahsap-jaluzi', 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=600', 'Doğal ve şık görünüm.', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name), image = VALUES(image), description = VALUES(description), is_active = VALUES(is_active);

-- Seed products
INSERT INTO products (id, category_id, name, slug, description, price, is_new, is_active) VALUES
(1, 1, 'Bohem Keten Dokulu Tül', 'bohem-keten-dokulu-tul', 'Doğal keten görünümü ile evinize sıcaklık katar. Ütü gerektirmeyen özel kumaş. Farklı pile seçenekleri ile modern veya klasik tarzda dikilebilir.', NULL, 1, 1),
(2, 2, 'Kadife Dokulu Fon', 'kadife-dokulu-fon', 'Yumuşak dokusu ve dökümlü yapısı ile salonlarınız için ideal. Güneş ışığını yumuşatır ve mekanın akustiğini düzenler.', NULL, 0, 1),
(3, 3, 'Bambu Zebra Perde', 'bambu-zebra-perde', 'Işık kontrolü sağlayan, kolay temizlenebilir mekanizmalı sistem. Doğal bambu görünümü ile ofis ve evler için uygundur.', NULL, 0, 1),
(4, 4, 'Rustik Ahşap Jaluzi 50mm', 'rustik-ahsap-jaluzi-50mm', 'Gerçek ağaç dokusu, uzun ömürlü mekanizma. 50mm bant genişliği ile lüks ve modern bir görünüm sağlar.', NULL, 0, 1),
(5, 1, 'Fransız Dantel Tül', 'fransiz-dantel-tul', 'Klasik sevenler için işlemeli özel tasarım. Işıltılı iplik detayları ile salonlarınıza saray havası katar.', NULL, 0, 1),
(6, 2, 'Blackout Karartma Fon', 'blackout-karartma-fon', '%100 ışık kesme özelliği ile yatak odaları için idealdir. Termal yalıtım özelliği sayesinde oda sıcaklığını korur.', NULL, 0, 1)
ON DUPLICATE KEY UPDATE category_id = VALUES(category_id), name = VALUES(name), description = VALUES(description), price = VALUES(price), is_new = VALUES(is_new), is_active = VALUES(is_active);

-- Seed product colors
INSERT INTO product_colors (product_id, color_name) VALUES
(1, 'Krem'),
(1, 'Beyaz'),
(1, 'Kum Beji'),
(2, 'Antrasit'),
(2, 'Zümrüt Yeşili'),
(2, 'Vizon'),
(2, 'Lacivert'),
(3, 'Beyaz'),
(3, 'Krem'),
(3, 'Gri'),
(4, 'Ceviz'),
(4, 'Meşe'),
(4, 'Siyah'),
(4, 'Beyaz'),
(5, 'Ekru'),
(6, 'Gri'),
(6, 'Siyah'),
(6, 'Bej');

-- Seed product images
INSERT INTO product_images (product_id, image_path, sort_order) VALUES
(1, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', 1),
(1, 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=800', 2),
(1, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800', 3),
(2, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800', 1),
(2, 'https://images.unsplash.com/photo-1550920854-c8c3e6205934?auto=format&fit=crop&q=80&w=800', 2),
(2, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800', 3),
(3, 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=800', 1),
(3, 'https://images.unsplash.com/photo-1588725026939-5034c5147854?auto=format&fit=crop&q=80&w=800', 2),
(3, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', 3),
(4, 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=800', 1),
(4, 'https://images.unsplash.com/photo-1596637330541-10d9f45f946e?auto=format&fit=crop&q=80&w=800', 2),
(4, 'https://images.unsplash.com/photo-1582236894056-b8db23f5b026?auto=format&fit=crop&q=80&w=800', 3),
(5, 'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&q=80&w=800', 1),
(5, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800', 2),
(5, 'https://images.unsplash.com/photo-1522771753035-484980f83c28?auto=format&fit=crop&q=80&w=800', 3),
(6, 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800', 1),
(6, 'https://images.unsplash.com/photo-1550920854-c8c3e6205934?auto=format&fit=crop&q=80&w=800', 2),
(6, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800', 3);

-- Seed hero slides
INSERT INTO hero_slides (id, image_path, title, subtitle, cta_text, cta_link, sort_order, is_active) VALUES
(1, 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop', 'Evinizin Işıltısı', 'Modern ve minimalist tasarımlarla yaşam alanlarınıza değer katın.', 'Koleksiyonu Keşfet', '/products', 1, 1),
(2, 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920&auto=format&fit=crop', 'Özel Tasarım Tüller', 'Her pencereye uygun, size özel dikim seçenekleri.', 'İletişime Geç', '/contact', 2, 1),
(3, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1920&auto=format&fit=crop', 'Ahşap & Rustik', 'Doğal dokunuşlarla sıcak bir atmosfer yaratın.', 'Ürünleri İncele', '/products', 3, 1)
ON DUPLICATE KEY UPDATE image_path = VALUES(image_path), title = VALUES(title), subtitle = VALUES(subtitle), cta_text = VALUES(cta_text), cta_link = VALUES(cta_link), sort_order = VALUES(sort_order), is_active = VALUES(is_active);
