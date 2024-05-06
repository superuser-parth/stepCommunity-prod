const express = require('express');
const jwtAuth = require('../lib/jwtAuth');
const { isAdmin } = require('../lib/typeAuth');
const Product = require('../db/Products');
const router = express.Router();

router.use(express.json());

router.post('/addProduct',  async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            minOrder: req.body.minOrder,
            contact: req.body.contact,
            productImages: req.body.productImages
        });

        const errors = newProduct.validateSync();
        if (errors) {
            const validationErrors = Object.values(errors.errors).map(err => err.message);
            return res.status(400).json({ message: validationErrors });
        }

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', savedProduct });
    
    } catch (error) {
        console.error('Error adding product:', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/getProductsAdmin', async(req,res)=>{
    try{
        const products = await Product.find({})
        return res.status(200).json(products)
    }catch(error){
        console.error(error)
        return res.status(500).json({message:'Internal Server Error'})
    }
})

router.put('/editProduct/:id',  async(req,res)=>{
    try{
        const productId = req.params.id;
        const updatedProduct=req.body;
  
        const product = await Product.findById(productId);
        if(!product){
          return res.status(404).json({message:'Product not found'})
        }
  
        Object.assign(product, updatedProduct);
        await product.save();
  
        return res.status(200).json({message:'Product updated succesfully'})
    }catch(error){
      console.error('Error updating product info', error)
      return res.status(500).json({message:'Internal Server Error'})
    }
  })

  router.delete('/deleteProduct/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Delete the product
      await product.deleteOne();
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  

module.exports = router;
