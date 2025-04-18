// src/pages/api/products.js
import { getAllProducts, filterProductsByCategories, getPaginatedProducts } from '../../utils/search';

export default async function handler(req, res) {
  try {
    // Get query parameters
    const { page = 1, limit = 6, categories, locale = 'en' } = req.query;
    
    // Parse page and limit
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 6;
    
    // Parse categories
    const categoryList = categories ? categories.split(',') : [];
    
    // Get all products
    const allProducts = await getAllProducts();
    
    // Apply category filters if any
    const filteredProducts = categoryList.length > 0
      ? filterProductsByCategories(allProducts, categoryList, locale)
      : allProducts;
    
    // Apply pagination
    const paginatedData = getPaginatedProducts(filteredProducts, pageNum, limitNum);
    
    // Return results
    res.status(200).json({
      success: true,
      data: paginatedData,
    });
  } catch (error) {
    console.error('Products API error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products' 
    });
  }
}