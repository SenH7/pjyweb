// src/pages/api/products/[id].js
import { getContentfulProductBySlug, getContentfulProductById } from '../../../utils/improvedContentful';

/**
 * API handler for product operations
 * @param {Object} req - Next.js request object
 * @param {Object} res - Next.js response object
 */
export default async function handler(req, res) {
  const { id } = req.query;
  
  // Get product data
  if (req.method === 'GET') {
    try {
      // First try to get by slug
      let product = await getContentfulProductBySlug(id);
      
      // If not found, try by ID
      if (!product) {
        product = await getContentfulProductById(id);
      }
      
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      return res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }
  }
  
  // Update product data
  // Note: In a real app, this would use the Contentful Management API
  // This is just a mock implementation for the demo
  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      // Check for authentication - in a real app, use proper auth
      // This is just a basic check for demo purposes
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      // Get product data from request body
      const productData = req.body;
      
      // Validate required fields
      if (!productData.title || !productData.title.en || !productData.title.zh) {
        return res.status(400).json({ error: 'Title is required in both languages' });
      }
      
      // In a real app, this would update the product in Contentful
      // For this demo, we'll just return success
      
      return res.status(200).json({ 
        success: true,
        message: 'Product updated successfully',
        product: productData
      });
    } catch (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'Failed to update product' });
    }
  }
  
  // Method not allowed
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}