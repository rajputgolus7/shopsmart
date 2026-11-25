
import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Fetch products
  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=50&skip=10')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(err => console.error('Product fetch error:', err));
  }, []);

  // Add to cart
  const handleAddToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(p => p.id === item.id);

      if (existing) {
        return prevCart.map(p =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });

    setShowCart(false);
  };

  // Remove from cart
  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Change quantity
  const handleQuantityChange = (id, change) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // Cart calculations
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  // Search functionality
  const filteredProducts = products.filter(product => {
    const term = search.toLowerCase().trim();

    return (
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      (product.brand && product.brand.toLowerCase().includes(term))
    );
  });

  return (
    <div className="app">

      {/* NAVBAR */}
      <div className="navbar">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3081/3081648.png"
          alt="ShopSmart Logo"
          className="logo"/>

        <span className="heading">ShopSmart</span>

        <span
          className="cartlogo"
          onClick={() => setShowCart(!showCart)}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://static.thenounproject.com/png/2968-200.png"
            alt="Cart"
            className="img-cart"
          />
        </span>

        <span
          className="text"
          onClick={() => setShowCart(!showCart)}
          style={{ cursor: 'pointer' }}
        >
          Cart ({cartCount})
        </span>

        <span className="text normal">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </span>

        <span className="text">Search</span>

        <span className="text normal">
          Golu Kumar Singh
        </span>

      </div>

      {/* CART SECTION */}
      {showCart && (
        <div className="cart-container">

          <h2>Your Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>

                  <img
                    src={item.image}
                    alt={item.title}
                    width="60"
                  />

                  <div>
                    <h4>{item.title}</h4>
                    <p>Price: ${item.price}</p>

                    <div>
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        -
                      </button>

                      <span style={{ margin: '0 12px' }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

                  </div>

                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>
              ))}

              <h3>Total: ${cartTotal.toFixed(2)}</h3>
              <p>Total Items: {cartCount}</p>
            </>
          )}

          <button onClick={() => setShowCart(false)}>
            Close Cart
          </button>

        </div>
      )}

      {/* PRODUCT SECTION */}
      <div className="products">

        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (

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

          ))
        ) : (
          <h2>No products found.</h2>
        )}

      </div>

    </div>
  );
}

export default App;
