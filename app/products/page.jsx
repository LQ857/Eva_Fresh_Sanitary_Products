'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../nav/page';
import "@/app/src/products.css"

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch product data
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/fetchProducts');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    setCart([...cart, selectedProduct]);
  };

  return (
    <div className="product-page">
        <Nav/>
      <h1>Product Page</h1>
      
      {/* Shopping cart icon */}
      <div className="cart-icon" onClick={() => console.log('Show shopping cart')}>
        🛒
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </div>

      {loading ? (
        // Skeleton loading while data is being fetched
        <div className="skeleton-loading"></div>
      ) : (
        // Display products once data is loaded
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span>${product.price}</span>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
