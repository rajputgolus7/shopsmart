
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { title, price, image, category, rating } = product;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
      </div>

      <div className="product-info">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>

        

        <div className="product-footer">
          <span className="product-price"><b>₹{price}</b></span>
          <div className="product-rating">
          <span>⭐ {rating}</span>
        </div>
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
