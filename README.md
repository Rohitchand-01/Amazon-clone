# Amazon Clone - E-Commerce Platform

A pixel-perfect Amazon clone built with React, Node.js, Express, and PostgreSQL. This project replicates Amazon's UI/UX design with full e-commerce functionality including product browsing, search, shopping cart, and checkout.

## Tech Stack

- **Frontend**: React 18+ with Vite
- **Backend**: Node.js + Express.js
- **Database**: PostgreSQL with pg (node-postgres)
- **ORM**: Prisma
- **Styling**: Custom CSS with Amazon design system

## Features

✅ Product browsing with search and filters  
✅ Product detail page with image carousel  
✅ Shopping cart with CRUD operations  
✅ Checkout flow with order placement  
✅ Responsive design (mobile, tablet, desktop)  
✅ Amazon-inspired UI/UX  
✅ Loading states and error handling  
✅ Smooth animations and transitions

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- npm or yarn package manager

### Quick Setup

**See [SETUP.md](./SETUP.md) for detailed step-by-step instructions.**

### Quick Start

1. **Install packages:**
   ```bash
   # Backend
   cd server
   npm install express pg cors dotenv
   
   # Frontend
   cd client
   npm install react-router-dom
   ```

2. **Create database and tables:**
   ```sql
   CREATE DATABASE amazon_clone;
   ```
   Then run: `psql -U postgres -d amazon_clone -f server/config/schema.sql`

3. **Configure database** in `server/.env`:
   ```
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=amazon_clone
   DB_PORT=5432
   PORT=5000
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/amazon_clone
   ```

4. **Seed database:**
   ```bash
   cd server
   node config/seed.js
   ```

5. **Start servers:**
   ```bash
   # Terminal 1 - Backend
   cd server
   node server.js
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

6. **Open browser:** http://localhost:3000

## Project Structure

```
scalar-assignment/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── styles/        # CSS files
│   │   ├── contexts/      # React contexts
│   │   └── utils/         # Helper functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database config and schema
│   ├── routes/            # Express routes
│   ├── controllers/      # Business logic
│   └── server.js          # Entry point
└── README.md
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination, filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/search?q=keyword` - Search products
- `GET /api/products/categories` - Get all categories

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

## Database Schema

The database includes the following models:
- **Category** - Product categories
- **Product** - Product information
- **ProductImage** - Product images
- **CartItem** - Shopping cart items
- **Order** - Customer orders
- **OrderItem** - Order line items

## Design System

The project uses Amazon's exact color palette, typography, spacing, and shadows:
- Colors: Amazon orange (#FF9900), nav dark (#131921), etc.
- Typography: System font stack matching Amazon Ember
- Spacing: 4px base unit system
- Shadows: Amazon's exact shadow definitions

## Development

### Running in Development Mode

1. Start PostgreSQL database
2. Start backend: `cd server && npm run dev`
3. Start frontend: `cd client && npm run dev`
4. Open http://localhost:3000

### Building for Production

```bash
# Frontend
cd client
npm run build

# Backend
cd server
npm start
```

## License

ISC
