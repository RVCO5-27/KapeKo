# 🚀 Backend Setup Guide for Kapeko Coffee

## 📋 Prerequisites
- Windows 10/11
- XAMPP (Apache + MySQL + PHP)
- Your React app running on `http://localhost:3000`

## 🔧 Step 1: Install XAMPP

1. **Download XAMPP:**
   - Go to https://www.apachefriends.org/download.html
   - Download XAMPP for Windows (PHP 8.0+ recommended)
   - Run the installer as Administrator

2. **Install XAMPP:**
   - Choose installation directory (default: `C:\xampp`)
   - Select Apache, MySQL, and PHP
   - Complete the installation

## 🗄️ Step 2: Database Setup

1. **Start XAMPP Services:**
   ```
   - Open XAMPP Control Panel
   - Click "Start" for Apache
   - Click "Start" for MySQL
   - Both should show green "Running" status
   ```

2. **Create Database:**
   - Open browser and go to `http://localhost/phpmyadmin`
   - Click "New" in the left sidebar
   - Database name: `kapeko_coffee`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"

3. **Import Database Schema:**
   - Select `kapeko_coffee` database
   - Click "Import" tab
   - Click "Choose File"
   - Select `database/kapeko_database.sql` from your project
   - Click "Go" to import

## 📁 Step 3: Backend File Setup

1. **Copy Backend Files:**
   ```
   Copy the entire 'backend' folder to: C:\xampp\htdocs\backend
   ```

2. **Verify File Structure:**
   ```
   C:\xampp\htdocs\backend\
   ├── Database.php
   ├── admin.php
   └── api/
       ├── orders.php
       ├── contact.php
       ├── feedback.php
       └── menu.php
   ```

## 🔗 Step 4: Test Backend APIs

1. **Test Database Connection:**
   - Go to `http://localhost/backend/admin.php`
   - You should see the admin panel with database data

2. **Test API Endpoints:**
   - Orders: `http://localhost/backend/api/orders.php`
   - Contact: `http://localhost/backend/api/contact.php`
   - Feedback: `http://localhost/backend/api/feedback.php`
   - Menu: `http://localhost/backend/api/menu.php`

## 🚀 Step 5: Start Your React App

1. **Open Terminal in Project Directory:**
   ```bash
   cd C:\Coffee
   npm start
   ```

2. **Verify React App:**
   - Go to `http://localhost:3000`
   - Navigate to Order page
   - Fill out the form and place an order

## 🔍 Step 6: Troubleshooting

### Common Issues:

1. **"Failed to connect to server" Error:**
   - Check if XAMPP Apache and MySQL are running
   - Verify backend files are in `C:\xampp\htdocs\backend`
   - Check browser console for CORS errors

2. **Database Connection Error:**
   - Verify database name is `kapeko_coffee`
   - Check if MySQL service is running
   - Verify database was imported correctly

3. **CORS Issues:**
   - Make sure backend files have proper CORS headers
   - Check if React app is running on port 3000

4. **Data Not Saving:**
   - Check browser Network tab for API call errors
   - Verify database tables exist
   - Check XAMPP error logs

### Debug Steps:

1. **Check XAMPP Logs:**
   ```
   C:\xampp\apache\logs\error.log
   C:\xampp\mysql\data\*.err
   ```

2. **Test API Manually:**
   ```bash
   curl -X POST http://localhost/backend/api/orders.php \
   -H "Content-Type: application/json" \
   -d '{"customer_name":"Test","customer_contact":"123","items":[],"total_amount":0}'
   ```

3. **Check Database:**
   - Go to `http://localhost/phpmyadmin`
   - Select `kapeko_coffee` database
   - Check if data is being inserted into tables

## ✅ Verification Checklist

- [ ] XAMPP Apache is running
- [ ] XAMPP MySQL is running
- [ ] Database `kapeko_coffee` exists
- [ ] Database schema imported successfully
- [ ] Backend files copied to `C:\xampp\htdocs\backend`
- [ ] Admin panel accessible at `http://localhost/backend/admin.php`
- [ ] React app running on `http://localhost:3000`
- [ ] Order form submits successfully
- [ ] Data appears in database

## 🎯 Expected Results

After successful setup:
- Orders will be saved to the `orders` and `order_items` tables
- Contact messages will be saved to the `contact_messages` table
- Feedback will be saved to the `feedback` table
- You can view all data in the admin panel
- React app will show success messages after form submission

## 📞 Support

If you encounter issues:
1. Check XAMPP error logs
2. Verify all services are running
3. Test API endpoints manually
4. Check browser console for errors
5. Ensure database connection is working

---

**Note:** Make sure to keep XAMPP running while using your React app, as it provides the backend services and database.
