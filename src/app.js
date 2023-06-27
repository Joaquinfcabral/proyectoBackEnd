const express = require('express');
const ProductManager = require('./productManager'); 

const app = express();
const port = 3000;

const productManager = new ProductManager('../data/products.json');

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit));
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
    try {
      const productId = parseInt(req.params.pid);
      const product = await productManager.getProductById(productId);
  
      if (!product) {
        res.status(404).json({ error: 'Producto no encontrado' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  });
  
app.listen(port, async () => {
  try {
    await productManager.loadProductsFromFile();
    console.log(`Servidor iniciado en http://localhost:${port}`);
  } catch (error) {
    console.log('Error al cargar los productos', error);
  }
});