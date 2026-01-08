import { createContext, useContext, useState, useEffect } from 'react'
import { getCart, addToCart, updateCartItem, removeFromCart } from '../services/api'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const items = await getCart()
      setCartItems(items)
    } catch (error) {
      console.error('Failed to load cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addItem = async (productId, quantity = 1) => {
    try {
      const item = await addToCart(productId, quantity)
      await loadCart()
      return item
    } catch (error) {
      console.error('Failed to add item to cart:', error)
      throw error
    }
  }

  const updateItem = async (cartItemId, quantity) => {
    try {
      await updateCartItem(cartItemId, quantity)
      await loadCart()
    } catch (error) {
      console.error('Failed to update cart item:', error)
      throw error
    }
  }

  const removeItem = async (cartItemId) => {
    try {
      await removeFromCart(cartItemId)
      await loadCart()
    } catch (error) {
      console.error('Failed to remove cart item:', error)
      throw error
    }
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.product.price) * item.quantity)
    }, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addItem,
        updateItem,
        removeItem,
        getTotalPrice,
        getTotalItems,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
