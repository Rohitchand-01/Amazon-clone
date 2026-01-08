import prisma from '../config/database.js';

export const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      minPrice,
      maxPrice,
      minRating,
      isPrime,
      sortBy = 'relevance',
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const limitNum = parseInt(limit);

    // Build where clause for Prisma
    const where = {};

    if (category) {
      where.category = {
        name: {
          contains: category,
          mode: 'insensitive'
        }
      };
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) };
    }

    if (minRating) {
      where.rating = { ...where.rating, gte: parseFloat(minRating) };
    }

    if (isPrime === 'true') {
      where.isPrime = true;
    }

    // Build orderBy clause
    let orderBy = { createdAt: 'desc' };
    switch (sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Get products with category and images
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        orderBy,
        skip: offset,
        take: limitNum,
      }),
      prisma.product.count({ where }),
    ]);

    // Format products
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      listPrice: product.listPrice ? parseFloat(product.listPrice) : null,
      categoryId: product.categoryId,
      category: product.category ? { id: product.category.id, name: product.category.name } : null,
      brand: product.brand,
      stockQuantity: product.stockQuantity,
      rating: product.rating ? parseFloat(product.rating) : null,
      reviewCount: product.reviewCount,
      isPrime: product.isPrime,
      imageUrl: product.images[0]?.imageUrl || null,
      images: product.images.map(img => ({
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary,
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    console.log(`✅ Fetched ${formattedProducts.length} products (page ${page})`);

    res.json({
      products: formattedProducts,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        images: {
          orderBy: [
            { isPrimary: 'desc' },
            { displayOrder: 'asc' },
          ],
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      listPrice: product.listPrice ? parseFloat(product.listPrice) : null,
      categoryId: product.categoryId,
      category: product.category ? { id: product.category.id, name: product.category.name } : null,
      brand: product.brand,
      stockQuantity: product.stockQuantity,
      rating: product.rating ? parseFloat(product.rating) : null,
      reviewCount: product.reviewCount,
      isPrime: product.isPrime,
      imageUrl: product.images[0]?.imageUrl || null,
      images: product.images.map(img => ({
        id: img.id,
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary,
        displayOrder: img.displayOrder
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };

    console.log(`✅ Fetched product: ${formattedProduct.name} (ID: ${id})`);

    res.json(formattedProduct);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const {
      q = '',
      category,
      minPrice,
      maxPrice,
      minRating,
      isPrime,
      sortBy = 'relevance',
      limit = 50,
    } = req.query;

    // Build where clause for Prisma
    const where = {};

    // Search query
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { brand: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = {
        name: {
          contains: category,
          mode: 'insensitive'
        }
      };
    }

    if (minPrice) {
      where.price = { ...where.price, gte: parseFloat(minPrice) };
    }

    if (maxPrice) {
      where.price = { ...where.price, lte: parseFloat(maxPrice) };
    }

    if (minRating) {
      where.rating = { ...where.rating, gte: parseFloat(minRating) };
    }

    if (isPrime === 'true') {
      where.isPrime = true;
    }

    // Build orderBy clause
    let orderBy = { createdAt: 'desc' };
    switch (sortBy) {
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating':
        orderBy = { rating: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
      orderBy,
      take: parseInt(limit),
    });

    // Format products
    const formattedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: parseFloat(product.price),
      listPrice: product.listPrice ? parseFloat(product.listPrice) : null,
      categoryId: product.categoryId,
      category: product.category ? { id: product.category.id, name: product.category.name } : null,
      brand: product.brand,
      stockQuantity: product.stockQuantity,
      rating: product.rating ? parseFloat(product.rating) : null,
      reviewCount: product.reviewCount,
      isPrime: product.isPrime,
      imageUrl: product.images[0]?.imageUrl || null,
      images: product.images.map(img => ({
        imageUrl: img.imageUrl,
        isPrimary: img.isPrimary,
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }));

    console.log(`✅ Search results: ${formattedProducts.length} products found for query: "${q}"`);

    res.json(formattedProducts);
  } catch (error) {
    console.error('❌ Error searching products:', error);
    res.status(500).json({ error: 'Failed to search products' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });

    const formattedCategories = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      parentId: cat.parentId,
      createdAt: cat.createdAt,
      updatedAt: cat.updatedAt
    }));

    console.log(`✅ Fetched ${formattedCategories.length} categories`);

    res.json(formattedCategories);
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};
