import { prisma } from '../utils/prisma.js';

const categories = [
  { name: 'Electronics' },
  { name: 'Books' },
  { name: 'Clothing' },
  { name: 'Home & Kitchen' },
  { name: 'Sports & Outdoors' }
];

const products = [
  {
    name: 'Apple iPhone 15 Pro Max (256GB) - Natural Titanium',
    description: 'The iPhone 15 Pro Max features a titanium design, A17 Pro chip, and advanced camera system with 5x Telephoto zoom.',
    price: 1199.00,
    listPrice: 1199.00,
    category: 'Electronics',
    brand: 'Apple',
    stockQuantity: 50,
    rating: 4.7,
    reviewCount: 1234,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81SigpJN1KL._AC_SX679_.jpg'
  },
  {
    name: 'Samsung 55-Inch Class QLED 4K Q80C Series Smart TV',
    description: 'Quantum HDR 8X, Dolby Atmos, Object Tracking Sound, Gaming Hub, Alexa Built-in',
    price: 899.99,
    listPrice: 1099.99,
    category: 'Electronics',
    brand: 'Samsung',
    stockQuantity: 30,
    rating: 4.5,
    reviewCount: 856,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/71v9Jf+a-tL._AC_SX679_.jpg'
  },
  {
    name: 'Sony WH-1000XM5 Wireless Premium Noise Canceling Headphones',
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.',
    price: 399.99,
    listPrice: 449.99,
    category: 'Electronics',
    brand: 'Sony',
    stockQuantity: 75,
    rating: 4.8,
    reviewCount: 2156,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg'
  },
  {
    name: 'Nintendo Switch - OLED Model w/ White Joy-Con',
    description: '7-inch OLED screen, 64GB internal storage, enhanced audio, wide adjustable stand',
    price: 349.99,
    listPrice: 349.99,
    category: 'Electronics',
    brand: 'Nintendo',
    stockQuantity: 100,
    rating: 4.6,
    reviewCount: 3421,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg'
  },
  {
    name: 'The Seven Husbands of Evelyn Hugo: A Novel',
    description: 'Reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.',
    price: 12.99,
    listPrice: 16.99,
    category: 'Books',
    brand: 'Atria Books',
    stockQuantity: 200,
    rating: 4.6,
    reviewCount: 45678,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    description: 'Tiny Changes That Make Remarkable Results. An easy & proven way to build good habits & break bad ones.',
    price: 11.98,
    listPrice: 14.99,
    category: 'Books',
    brand: 'Avery',
    stockQuantity: 500,
    rating: 4.8,
    reviewCount: 67890,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'It Ends with Us: A Novel',
    description: 'A work of fiction that explores the complexities of love, loss, and the choices we make.',
    price: 9.99,
    listPrice: 12.99,
    category: 'Books',
    brand: 'Atria Books',
    stockQuantity: 300,
    rating: 4.5,
    reviewCount: 123456,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'The Midnight Library: A Novel',
    description: 'A novel about a library that opens at midnight, where you can try out different versions of your life.',
    price: 13.99,
    listPrice: 16.99,
    category: 'Books',
    brand: 'Viking',
    stockQuantity: 250,
    rating: 4.3,
    reviewCount: 34567,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Nike Men\'s Air Max 90 Sneakers',
    description: 'Classic running shoes with visible Air cushioning, durable rubber outsole, and breathable mesh upper.',
    price: 89.99,
    listPrice: 120.00,
    category: 'Clothing',
    brand: 'Nike',
    stockQuantity: 150,
    rating: 4.4,
    reviewCount: 23456,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Levi\'s Men\'s 511 Slim Fit Jeans',
    description: 'Classic fit jeans with stretch comfort, available in multiple washes and sizes.',
    price: 49.99,
    listPrice: 69.99,
    category: 'Clothing',
    brand: 'Levi\'s',
    stockQuantity: 200,
    rating: 4.5,
    reviewCount: 45678,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Adidas Men\'s Ultraboost 22 Running Shoes',
    description: 'High-performance running shoes with Boost midsole technology and Primeknit upper.',
    price: 129.99,
    listPrice: 180.00,
    category: 'Clothing',
    brand: 'Adidas',
    stockQuantity: 100,
    rating: 4.6,
    reviewCount: 12345,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'The North Face Men\'s Resolve 2 Jacket',
    description: 'Waterproof and breathable jacket with DryVent technology, perfect for outdoor adventures.',
    price: 99.99,
    listPrice: 149.99,
    category: 'Clothing',
    brand: 'The North Face',
    stockQuantity: 80,
    rating: 4.5,
    reviewCount: 9876,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'KitchenAid Stand Mixer - 5 Quart',
    description: 'Powerful stand mixer with 10 speeds, includes dough hook, flat beater, and wire whip.',
    price: 229.99,
    listPrice: 379.99,
    category: 'Home & Kitchen',
    brand: 'KitchenAid',
    stockQuantity: 60,
    rating: 4.8,
    reviewCount: 34567,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
    description: '7-in-1 multi-use cooker: pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker, and warmer.',
    price: 79.99,
    listPrice: 119.99,
    category: 'Home & Kitchen',
    brand: 'Instant Pot',
    stockQuantity: 120,
    rating: 4.7,
    reviewCount: 45678,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Dyson V15 Detect Cordless Vacuum Cleaner',
    description: 'Powerful cordless vacuum with laser technology to reveal microscopic dust and advanced filtration.',
    price: 599.99,
    listPrice: 749.99,
    category: 'Home & Kitchen',
    brand: 'Dyson',
    stockQuantity: 40,
    rating: 4.6,
    reviewCount: 23456,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Ninja Foodi 8-in-1 Digital Air Fryer',
    description: '8-in-1 cooking system: air fry, roast, bake, reheat, dehydrate, and more. Large capacity for family meals.',
    price: 149.99,
    listPrice: 199.99,
    category: 'Home & Kitchen',
    brand: 'Ninja',
    stockQuantity: 90,
    rating: 4.5,
    reviewCount: 34567,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'YETI Rambler 30 oz Tumbler',
    description: 'Durable stainless steel tumbler with double-wall vacuum insulation, keeps drinks cold or hot for hours.',
    price: 35.00,
    listPrice: 45.00,
    category: 'Home & Kitchen',
    brand: 'YETI',
    stockQuantity: 300,
    rating: 4.8,
    reviewCount: 56789,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Wilson Pro Staff RF97 Autograph Tennis Racket',
    description: 'Professional tennis racket used by Roger Federer, precision-balanced for control and power.',
    price: 199.99,
    listPrice: 249.99,
    category: 'Sports & Outdoors',
    brand: 'Wilson',
    stockQuantity: 50,
    rating: 4.7,
    reviewCount: 12345,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Coleman Sundome 4-Person Tent',
    description: 'Weatherproof tent with WeatherTec system, large windows for ventilation, and easy setup in 10 minutes.',
    price: 59.99,
    listPrice: 89.99,
    category: 'Sports & Outdoors',
    brand: 'Coleman',
    stockQuantity: 150,
    rating: 4.4,
    reviewCount: 23456,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Hydro Flask 32 oz Water Bottle',
    description: 'Premium water bottle with TempShield insulation, keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 39.99,
    listPrice: 49.99,
    category: 'Sports & Outdoors',
    brand: 'Hydro Flask',
    stockQuantity: 400,
    rating: 4.6,
    reviewCount: 45678,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/81Z5NvMjK-L._AC_UL320_SR320,320_.jpg'
  },
  {
    name: 'Patagonia Men\'s Better Sweater Jacket',
    description: 'Fleece jacket made from recycled polyester, warm and comfortable for outdoor activities.',
    price: 99.00,
    listPrice: 149.00,
    category: 'Sports & Outdoors',
    brand: 'Patagonia',
    stockQuantity: 70,
    rating: 4.5,
    reviewCount: 34567,
    isPrime: true,
    image_url: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UL320_SR320,320_.jpg'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    await prisma.orderItem.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    console.log('✅ Cleared existing data\n');

    // Insert categories
    console.log('📦 Inserting categories...');
    const categoryMap = {};
    for (const category of categories) {
      const created = await prisma.category.create({
        data: { name: category.name },
      });
      categoryMap[category.name] = created.id;
      console.log(`   ✓ Inserted category: ${category.name} (ID: ${created.id})`);
    }
    console.log(`✅ Inserted ${categories.length} categories\n`);

    // Insert products
    console.log('📦 Inserting products...');
    let productCount = 0;
    for (const product of products) {
      const categoryId = categoryMap[product.category];
      const created = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          listPrice: product.listPrice,
          categoryId: categoryId,
          brand: product.brand,
          stockQuantity: product.stockQuantity,
          rating: product.rating,
          reviewCount: product.reviewCount,
          isPrime: product.isPrime,
          images: {
            create: {
              imageUrl: product.image_url,
              isPrimary: true,
              displayOrder: 0,
            },
          },
        },
      });

      productCount++;
      console.log(`   ✓ Inserted product: ${product.name.substring(0, 50)}... (ID: ${created.id})`);
    }
    console.log(`✅ Inserted ${productCount} products\n`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`   - ${categories.length} categories`);
    console.log(`   - ${productCount} products`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
} else {
  seedDatabase();
}
