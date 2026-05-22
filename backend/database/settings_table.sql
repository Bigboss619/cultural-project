-- Site Settings Table
CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value) VALUES
-- Hero Section
('hero_image', NULL),
('hero_heading', 'Preserving Our Cultural Heritage'),
('hero_subheading', 'Celebrating the traditions, stories, and people of Ibadan'),

-- About Us
('about_heading', 'Our Story'),
('about_content', 'We are dedicated to preserving and promoting the rich cultural heritage of Ibadan, connecting communities through shared traditions and stories.'),
('about_image', NULL),

-- Contact Info
('contact_location', 'Ibadan, Oyo State, Nigeria'),
('contact_email', 'hello@ibadanheritage.org'),
('contact_phone', '+234 801 234 5678'),

-- Social Media Links
('social_facebook', 'https://facebook.com/'),
('social_twitter', 'https://twitter.com/'),
('social_instagram', 'https://instagram.com/'),
('social_youtube', 'https://youtube.com/')

ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);