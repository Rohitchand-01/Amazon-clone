import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Products API
export const fetchProducts = async (params = {}) => {
  try {
    console.log('📡 Fetching products with params:', params)
    const response = await api.get('/products', { params })
    console.log('✅ Products fetched:', response.data.products?.length || 0)
    return response.data.products || response.data
  } catch (error) {
    console.error('❌ Error fetching products:', error)
    throw error
  }
}

export const fetchProductById = async (id) => {
  try {
    console.log(`📡 Fetching product ${id}`)
    const response = await api.get(`/products/${id}`)
    console.log('✅ Product fetched:', response.data.name)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching product:', error)
    throw error
  }
}

export const searchProducts = async (params = {}) => {
  try {
    console.log('📡 Searching products with params:', params)
    const response = await api.get('/products/search', { params })
    console.log('✅ Search results:', response.data.length)
    return response.data
  } catch (error) {
    console.error('❌ Error searching products:', error)
    throw error
  }
}

export const fetchCategories = async () => {
  try {
    console.log('📡 Fetching categories')
    const response = await api.get('/categories')
    console.log('✅ Categories fetched:', response.data.length)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching categories:', error)
    throw error
  }
}

// Legacy export for backward compatibility
export const getCategories = fetchCategories

// Cart API
export const fetchCart = async () => {
  try {
    console.log('📡 Fetching cart')
    const response = await api.get('/cart')
    console.log('✅ Cart fetched:', response.data.length, 'items')
    return response.data
  } catch (error) {
    console.error('❌ Error fetching cart:', error)
    throw error
  }
}

export const addToCart = async (productId, quantity = 1) => {
  try {
    console.log(`📡 Adding product ${productId} to cart (quantity: ${quantity})`)
    const response = await api.post('/cart', {
      productId,
      quantity,
    })
    console.log('✅ Added to cart:', response.data.product.name)
    return response.data
  } catch (error) {
    console.error('❌ Error adding to cart:', error)
    throw error
  }
}

export const updateCartItem = async (cartItemId, quantity) => {
  try {
    console.log(`📡 Updating cart item ${cartItemId} (quantity: ${quantity})`)
    const response = await api.put(`/cart/${cartItemId}`, {
      quantity,
    })
    console.log('✅ Cart item updated')
    return response.data
  } catch (error) {
    console.error('❌ Error updating cart item:', error)
    throw error
  }
}

export const deleteCartItem = async (cartItemId) => {
  try {
    console.log(`📡 Deleting cart item ${cartItemId}`)
    const response = await api.delete(`/cart/${cartItemId}`)
    console.log('✅ Cart item deleted')
    return response.data
  } catch (error) {
    console.error('❌ Error deleting cart item:', error)
    throw error
  }
}

// Orders API
export const createOrder = async (orderData) => {
  try {
    console.log('📡 Creating order')
    const response = await api.post('/orders', orderData)
    console.log('✅ Order created:', response.data.orderNumber)
    return response.data
  } catch (error) {
    console.error('❌ Error creating order:', error)
    throw error
  }
}

export const fetchOrderById = async (orderId) => {
  try {
    console.log(`📡 Fetching order ${orderId}`)
    const response = await api.get(`/orders/${orderId}`)
    console.log('✅ Order fetched:', response.data.orderNumber)
    return response.data
  } catch (error) {
    console.error('❌ Error fetching order:', error)
    throw error
  }
}

// Legacy exports for backward compatibility
export const getProducts = fetchProducts
export const getProduct = fetchProductById
export const getCart = fetchCart
export const removeFromCart = deleteCartItem
export const getOrder = fetchOrderById

export default api
