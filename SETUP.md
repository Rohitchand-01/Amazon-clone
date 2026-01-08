# Amazon Clone - Setup Instructions

## 🚀 Quick Start Guide

Follow these steps to get your Amazon Clone up and running:

---

## Step 1: Install Required Packages

### Backend Packages
```bash
cd server
npm install express pg cors dotenv
```

### Frontend Packages
```bash
cd client
npm install react-router-dom
```

---

## Step 2: Database Setup

### 2.1 Create PostgreSQL Database

1. Open PostgreSQL command line (psql) or pgAdmin
2. Run the following command:
```sql
CREATE DATABASE amazon_clone;
```

**Or using command line:**
```bash
createdb amazon_clone
```

### 2.2 Create Database Tables

Run the SQL schema file to create all tables:

**Option A: Using psql Command Line**
```bash
psql -U postgres -d amazon_clone -f server/config/schema.sql
```

**Option B: Using pgAdmin**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on `amazon_clone` database → Query Tool
4. Open `server/config/schema.sql`
5. Execute the entire file

**Option C: Copy and paste the SQL**
1. Open `server/config/schema.sql`
2. Copy all contents
3. Connect to `amazon_clone` database in psql or pgAdmin
4. Paste and execute

### 2.3 Configure Database Connection

Create or update `server/.env` file:
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=amazon_clone
DB_PORT=5432
PORT=5000
DATABASE_URL=postgresql://postgres:your_postgres_password@localhost:5432/amazon_clone
```

**Note:** Replace `your_postgres_password` with your actual PostgreSQL password. If you don't have a password, you may need to set one or configure PostgreSQL authentication.

---

## Step 3: Seed Database with Products

Run the seed script to populate the database with 5 categories and 20 products:

```bash
cd server
node config/seed.js
```

You should see output like:
```
🌱 Starting database seeding...
✅ Cleared existing data
📦 Inserting categories...
   ✓ Inserted category: Electronics (ID: 1)
   ...
✅ Inserted 5 categories
📦 Inserting products...
   ✓ Inserted product: Apple iPhone 15 Pro Max...
   ...
✅ Inserted 20 products
🎉 Database seeding completed successfully!
```

---

## Step 4: Start the Backend Server

```bash
cd server
node server.js
```

You should see:
```
✅ PostgreSQL database connected successfully!
   Database: amazon_clone
   Host: localhost:5432
✅ Database connection verified
🚀 Server running on http://localhost:5000
📡 API endpoints available at http://localhost:5000/api
🧪 Test endpoint: http://localhost:5000/api/test
```

**Test the API:**
- Open browser: http://localhost:5000/api/test
- Should return: `{"success":true,"message":"Server is running successfully!"}`
- Test products: http://localhost:5000/api/products

---

## Step 5: Start the Frontend

Open a **new terminal window** and run:

```bash
cd client
npm run dev
```

The frontend should start on http://localhost:3000 (or another port if 3000 is busy).

---

## Step 6: Verify Everything Works

1. **Open browser:** http://localhost:3000
2. **You should see:**
   - Amazon-style header with navigation
   - Product grid showing 20 products
   - Products with images, prices, ratings
   - Search bar and category filters

3. **Test functionality:**
   - Click on a product → Should navigate to product detail page
   - Add product to cart → Should show in cart
   - Search for products → Should filter results
   - Filter by category → Should show filtered products

---

## 🔧 Troubleshooting

### Problem: Database connection failed

**Solution:**
1. Check PostgreSQL is running: `psql -U postgres` or check service status
2. Verify database exists: `\l` in psql or check pgAdmin
3. Check `.env` file has correct credentials
4. Ensure PostgreSQL is running on port 5432 (default)
5. Verify user has permissions: `GRANT ALL PRIVILEGES ON DATABASE amazon_clone TO postgres;`

### Problem: No products showing

**Solution:**
1. Check backend console for errors
2. Test API directly: http://localhost:5000/api/products
3. Verify database has data:
   ```sql
   \c amazon_clone;
   SELECT COUNT(*) FROM products;
   ```
   Should return 20
4. Check CORS is enabled in server.js
5. Check browser console for API errors

### Problem: Products API returns empty array

**Solution:**
1. Re-run seed script: `cd server && node config/seed.js`
2. Check products table: `SELECT * FROM products LIMIT 5;`
3. Verify category_id matches: `SELECT * FROM categories;`

### Problem: Port 5000 already in use

**Solution:**
1. Change PORT in `server/.env` to another port (e.g., 5001)
2. Update `client/src/services/api.js` API_BASE_URL if needed

### Problem: CORS errors in browser

**Solution:**
- Verify `app.use(cors())` is in server.js
- Check backend is running on correct port
- Ensure frontend is calling correct API URL

### Problem: Schema execution errors

**Solution:**
1. Make sure you're connected to the `amazon_clone` database before running schema.sql
2. If ENUM type already exists, you may need to drop it first: `DROP TYPE IF EXISTS order_status CASCADE;`
3. Check that all tables were created: `\dt` in psql

---

## 📋 Checklist

Before reporting issues, verify:

- [ ] PostgreSQL is installed and running
- [ ] Database `amazon_clone` exists
- [ ] All tables created (run schema.sql)
- [ ] Database seeded with products (run seed.js)
- [ ] `.env` file configured correctly
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] No errors in backend console
- [ ] No errors in browser console
- [ ] API test endpoint works: http://localhost:5000/api/test

---

## 🎯 Next Steps

Once everything is working:

1. **Customize products:** Edit `server/config/seed.js` to add your own products
2. **Add more categories:** Modify the categories array in seed.js
3. **Style customization:** Edit CSS files in `client/src/styles/`
4. **Add features:** Implement user authentication, payment, etc.

---

## 📞 Need Help?

If you're still having issues:

1. Check backend console logs for detailed error messages
2. Check browser console (F12) for frontend errors
3. Verify all steps above were completed
4. Test database connection manually: `psql -U postgres -d amazon_clone`
5. Test API endpoints directly in browser/Postman

---

## ✅ Success Indicators

You'll know everything is working when:

- ✅ Backend shows: "Server running on http://localhost:5000"
- ✅ Backend shows: "PostgreSQL database connected successfully!"
- ✅ Frontend loads at http://localhost:3000
- ✅ Products display in grid layout
- ✅ Product images load correctly
- ✅ Clicking products navigates to detail page
- ✅ Cart functionality works
- ✅ Search and filters work

---

**Happy coding! 🎉**
