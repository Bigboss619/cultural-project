-- Payments table for tracking Paystack transactions
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  reference VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'success', 'failed') DEFAULT 'pending',
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  description VARCHAR(500),
  payment_type ENUM('membership', 'donation', 'event', 'general') DEFAULT 'general',
  metadata TEXT,
  paystack_response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);