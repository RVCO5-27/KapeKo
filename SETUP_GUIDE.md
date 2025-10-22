# Kapeko Coffee - Database Setup Guide

## Prerequisites
- XAMPP installed and running
- MySQL service running in XAMPP
- phpMyAdmin accessible

## Setup Steps

### 1. Start XAMPP Services
1. Open XAMPP Control Panel
2. Start **Apache** service
3. Start **MySQL** service

### 2. Create Database
1. Open phpMyAdmin (http://localhost/phpmyadmin)
2. Click "New" to create a new database
3. Name it: `kapeko_coffee`
4. Click "Create"

### 3. Import Database Schema
1. In phpMyAdmin, select the `kapeko_coffee` database
2. Click "Import" tab
3. Click "Choose File" and select `database/kapeko_database.sql`
4. Click "Go" to import

### 4. Setup Backend Files
1. Copy all files from `backend/` folder to `C:\xampp\htdocs\kapeko-backend\`
2. Your backend structure should be:
   ```
   C:\xampp\htdocs\kapeko-backend\
   ├── Database.php
   ├── admin.php
   └── api/
       ├── orders.php
       ├── contact.php
       ├── feedback.php
       └── menu.php
   ```

### 5. Test Backend
1. Open browser and go to: `http://localhost/kapeko-backend/admin.php`
2. You should see the admin panel with statistics
3. Test API endpoints:
   - `http://localhost/kapeko-backend/api/menu.php`
   - `http://localhost/kapeko-backend/api/orders.php`
   - `http://localhost/kapeko-backend/api/contact.php`
   - `http://localhost/kapeko-backend/api/feedback.php`

### 6. Update React App
The React app needs to be updated to use these API endpoints instead of simulated data.

## Database Tables Created

### customers
- Stores customer information
- Fields: id, name, contact, email, created_at

### menu_items
- Stores coffee menu items
- Fields: id, name, description, price, image_url, ingredients, sizes, is_active, created_at

### orders
- Stores order information
- Fields: id, customer_id, customer_name, customer_contact, total_amount, status, order_date

### order_items
- Stores individual items in each order
- Fields: id, order_id, coffee_name, size, quantity, unit_price, total_price

### contact_messages
- Stores contact form submissions
- Fields: id, name, email, message, status, created_at

### feedback
- Stores customer feedback
- Fields: id, name, email, rating, message, status, created_at

## API Endpoints

### Orders API (`/api/orders.php`)
- **POST**: Create new order
- **GET**: Get all orders
- **PUT**: Update order status

### Contact API (`/api/contact.php`)
- **POST**: Submit contact message
- **GET**: Get all messages
- **PUT**: Update message status

### Feedback API (`/api/feedback.php`)
- **POST**: Submit feedback
- **GET**: Get all feedback
- **PUT**: Update feedback status

### Menu API (`/api/menu.php`)
- **GET**: Get all menu items
- **POST**: Add new menu item
- **PUT**: Update menu item
- **DELETE**: Delete menu item

## Admin Panel
Access the admin panel at: `http://localhost/kapeko-backend/admin.php`

Features:
- View statistics dashboard
- Manage orders
- View contact messages
- Review customer feedback
- Manage menu items

## Next Steps
1. Test all API endpoints
2. Update React components to use real API calls
3. Add authentication to admin panel
4. Deploy to production server
