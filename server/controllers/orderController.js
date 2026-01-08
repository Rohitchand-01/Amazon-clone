import prisma from '../config/database.js';

const DEFAULT_USER_ID = 1;

const generateOrderNumber = () => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export const createOrder = async (req, res) => {
  try {
    const { shippingAddress, totalAmount } = req.body;

    if (!shippingAddress || !totalAmount) {
      return res.status(400).json({ error: 'Shipping address and total amount are required' });
    }

    // Get cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: DEFAULT_USER_ID },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Create order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create order
      const orderNumber = generateOrderNumber();
      const newOrder = await tx.order.create({
        data: {
          userId: DEFAULT_USER_ID,
          orderNumber,
          totalAmount: parseFloat(totalAmount),
          status: 'pending',
          shippingAddress,
          items: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: parseFloat(item.product.price),
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    where: { isPrimary: true },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: DEFAULT_USER_ID },
      });

      return newOrder;
    });

    // Format order
    const formattedOrder = {
      id: order.id,
      userId: order.userId,
      orderNumber: order.orderNumber,
      totalAmount: parseFloat(order.totalAmount),
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: {
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          imageUrl: item.product.images[0]?.imageUrl || null,
        }
      }))
    };

    console.log(`✅ Created order ${order.orderNumber} with ${formattedOrder.items.length} items`);

    res.status(201).json(formattedOrder);
  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(id),
        userId: DEFAULT_USER_ID,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Format order
    const formattedOrder = {
      id: order.id,
      userId: order.userId,
      orderNumber: order.orderNumber,
      totalAmount: parseFloat(order.totalAmount),
      status: order.status,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      items: order.items.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.price),
        product: {
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand,
          description: item.product.description,
          imageUrl: item.product.images[0]?.imageUrl || null,
          images: item.product.images.map(img => ({
            imageUrl: img.imageUrl,
            isPrimary: img.isPrimary,
          })),
        }
      }))
    };

    console.log(`✅ Fetched order ${order.orderNumber}`);

    res.json(formattedOrder);
  } catch (error) {
    console.error('❌ Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};
