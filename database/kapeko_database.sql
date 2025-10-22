<<<<<<< HEAD
-- Kapeko Coffee Database Schema
-- Run this in phpMyAdmin or MySQL command line

CREATE DATABASE IF NOT EXISTS kapeko_coffee;
USE kapeko_coffee;

-- Customers table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    ingredients TEXT,
    sizes JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_contact VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Order items table (for multiple items per order)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    coffee_name VARCHAR(100) NOT NULL,
    size VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    status ENUM('new', 'reviewed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, image_url, ingredients, sizes) VALUES
('Barako Coffee', 'Authentic Filipino coffee beans from Batangas', 80.00, 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&auto=format&fit=crop&q=60', 'Barako beans, water', '["Small", "Medium", "Large"]'),
('Cafe Latte', 'Smooth espresso with steamed milk', 120.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, steamed milk, foam', '["Small", "Medium", "Large"]'),
('Cappuccino', 'Classic Italian coffee with equal parts espresso, steamed milk, and foam', 110.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, steamed milk, foam', '["Small", "Medium", "Large"]'),
('Mocha', 'Rich chocolate coffee drink', 130.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, chocolate syrup, steamed milk', '["Small", "Medium", "Large"]'),
('Cold Brew', 'Smooth cold coffee concentrate', 140.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Coffee beans, cold water', '["Small", "Medium", "Large"]'),
('Caffe Americano', 'Espresso with hot water', 100.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, hot water', '["Small", "Medium", "Large"]');

-- Create indexes for better performance
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_feedback_rating ON feedback(rating);
=======
-- Kapeko Coffee Database Schema
-- Run this in phpMyAdmin or MySQL command line

CREATE DATABASE IF NOT EXISTS kapeko_coffee;
USE kapeko_coffee;

-- Customers table
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(255),
    ingredients TEXT,
    sizes JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    customer_name VARCHAR(100) NOT NULL,
    customer_contact VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled') DEFAULT 'pending',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL
);

-- Order items table (for multiple items per order)
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    coffee_name VARCHAR(100) NOT NULL,
    size VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    status ENUM('new', 'reviewed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, image_url, ingredients, sizes) VALUES
('Barako Coffee', 'Authentic Filipino coffee beans from Batangas', 80.00, 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&auto=format&fit=crop&q=60', 'Barako beans, water', '["Small", "Medium", "Large"]'),
('Cafe Latte', 'Smooth espresso with steamed milk', 120.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, steamed milk, foam', '["Small", "Medium", "Large"]'),
('Cappuccino', 'Classic Italian coffee with equal parts espresso, steamed milk, and foam', 110.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, steamed milk, foam', '["Small", "Medium", "Large"]'),
('Mocha', 'Rich chocolate coffee drink', 130.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, chocolate syrup, steamed milk', '["Small", "Medium", "Large"]'),
('Cold Brew', 'Smooth cold coffee concentrate', 140.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Coffee beans, cold water', '["Small", "Medium", "Large"]'),
('Caffe Americano', 'Espresso with hot water', 100.00, 'https://images.unsplash.com/photo-1572442388796-295e182a8d3b?w=500&auto=format&fit=crop&q=60', 'Espresso, hot water', '["Small", "Medium", "Large"]');

-- Create indexes for better performance
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_feedback_rating ON feedback(rating);
>>>>>>> 289777a7789e9e825f38c158b92b8748c62eae01
