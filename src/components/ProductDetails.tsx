import React from 'react';
import './ProductDetails.css';

interface ProductDetailsProps {
  product: {
    title: string;
    subtitle: string;
    image: string;
    tags: string[];
  };
}

// Product info card showing image, title, subtitle and tags
// Displays in the left sidebar of the application
// All product metadata comes from the Redux store
const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="product-details">
      <div className="product-header">
        <img src={product.image} alt={product.title} className="product-image" />
        <h2 className="product-title">{product.title}</h2>
        <p className="product-subtitle">{product.subtitle}</p>
      </div>
      <div className="product-tags">
        {product.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails; 