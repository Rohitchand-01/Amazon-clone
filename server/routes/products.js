import express from 'express'
import {
  getAllProducts,
  getProductById,
  searchProducts,
  getCategories,
} from '../controllers/productController.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/search', searchProducts)
router.get('/categories', getCategories)
router.get('/:id', getProductById)

export default router
