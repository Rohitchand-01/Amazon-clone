import prisma from '../config/database.js';

const DEFAULT_USER_ID = 1;

export const getCart = async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: DEFAULT_USER_ID },
      include: {
        product: {
          include: {
            category: true,
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
      orderBy: { addedAt: 'desc' },
    });

    const formattedItems = cartItems.map(item => ({
      id: item.id,
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity,
      addedAt: item.addedAt,
      product: {
        id: item.product.id,
        name: item.product.name,
        description: item.product.description,
        price: parseFloat(item.product.price),
        listPrice: item.product.listPrice ? parseFloat(item.product.listPrice) : null,
        categoryId: item.product.categoryId,
        category: item.product.category ? { id: item.product.category.id, name: item.product.category.name } : null,
        brand: item.product.brand,
        stockQuantity: item.product.stockQuantity,
        rating: item.product.rating ? parseFloat(item.product.rating) : null,
        reviewCount: item.product.reviewCount,
        isPrime: item.product.isPrime,
        imageUrl: item.product.images[0]?.imageUrl || null,
        images: item.product.images.map(img => ({
          imageUrl: img.imageUrl,
          isPrimary: img.isPrimary,
        })),
      }
    }));

    console.log(`✅ Fetched ${formattedItems.length} cart items for user ${DEFAULT_USER_ID}`);

    res.json(formattedItems);
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: {
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: DEFAULT_USER_ID,
        productId: parseInt(productId),
      },
    });

    let cartItem;
    if (existingItem) {
      // Update quantity
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + parseInt(quantity),
        },
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: DEFAULT_USER_ID,
          productId: parseInt(productId),
          quantity: parseInt(quantity),
        },
      });
    }

    const formattedItem = {
      id: cartItem.id,
      userId: cartItem.userId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      addedAt: cartItem.addedAt,
      product: {
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
      }
    };

    console.log(`✅ Added product ${productId} to cart (quantity: ${formattedItem.quantity})`);

    res.json(formattedItem);
  } catch (error) {
    console.error('❌ Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    // Check if cart item exists and belongs to user
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        id: parseInt(id),
        userId: DEFAULT_USER_ID,
      },
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // Update quantity
    const cartItem = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity: parseInt(quantity) },
      include: {
        product: {
          include: {
            category: true,
            images: {
              where: { isPrimary: true },
              take: 1,
            },
          },
        },
      },
    });

    const formattedItem = {
      id: cartItem.id,
      userId: cartItem.userId,
      productId: cartItem.productId,
      quantity: cartItem.quantity,
      addedAt: cartItem.addedAt,
      product: {
        id: cartItem.product.id,
        name: cartItem.product.name,
        description: cartItem.product.description,
        price: parseFloat(cartItem.product.price),
        listPrice: cartItem.product.listPrice ? parseFloat(cartItem.product.listPrice) : null,
        categoryId: cartItem.product.categoryId,
        category: cartItem.product.category ? { id: cartItem.product.category.id, name: cartItem.product.category.name } : null,
        brand: cartItem.product.brand,
        stockQuantity: cartItem.product.stockQuantity,
        rating: cartItem.product.rating ? parseFloat(cartItem.product.rating) : null,
        reviewCount: cartItem.product.reviewCount,
        isPrime: cartItem.product.isPrime,
        imageUrl: cartItem.product.images[0]?.imageUrl || null,
        images: cartItem.product.images.map(img => ({
          imageUrl: img.imageUrl,
          isPrimary: img.isPrimary,
        })),
      }
    };

    console.log(`✅ Updated cart item ${id} (quantity: ${formattedItem.quantity})`);

    res.json(formattedItem);
  } catch (error) {
    console.error('❌ Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if cart item exists and belongs to user
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        id: parseInt(id),
        userId: DEFAULT_USER_ID,
      },
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.delete({
      where: { id: parseInt(id) },
    });

    console.log(`✅ Removed cart item ${id}`);

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('❌ Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
