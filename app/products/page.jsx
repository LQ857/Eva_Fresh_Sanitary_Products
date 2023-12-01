import axios from 'axios';
import Nav from '../nav/page';
import "@/app/src/products.css"
const fetchProducts = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/fetchProducts');
    return res.data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export default async function Products ()  {
  const {products} = await fetchProducts()

  return (
    <div className="product-page">
      <Nav />
      <br/>
      <h1>Product Page</h1>
      <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span>${product.price}</span>
              {/* <button onClick={() => addToCart(product.id)}>Add to Cart</button> */}
            </div>
          ))}
        </div>
    </div>
  );
};
