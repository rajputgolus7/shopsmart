
import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=50&skip=10')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (item) => {
    console.log("Added to cart:", item.title);
  };

  return (
    <div className="app">
      <div className='navbar'>
        <img src="https://cdn-icons-png.flaticon.com/512/3081/3081648.png" alt="" className='logo' />
        <span className='heading'>ShopSmart</span>
        <span className='cartlogo'><img src="https://static.thenounproject.com/png/2968-200.png" alt="Cart" className='img-cart'/></span>
        <span className='text'>Cart</span>
        <span className='text normal'><input type="text" name="" id="" /></span>
        <span className='text '>Search</span>
        <span className='text normal'>Golu Kumar Singh</span>
      </div>

      {products.map(product => (
        <ProductCard
          key={product.id}
          product={{
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.thumbnail,
            category: product.category,
            rating: product.rating,
          }}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default App;
