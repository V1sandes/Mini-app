import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DiscountButton from './DiscountButton.jsx';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, inCart }) {
  const [showDiscount, setShowDiscount] = useState(false);

  const { name, author, price, discount, description } = product;
  const hasDiscount = discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(price * (1 - discount / 100))
    : price;

  const handleAdd = () => {
    onAddToCart({ ...product, discount: showDiscount ? discount : 0 });
  };

  return (
    <div className="product-card">
      <h2 className="product-name">{name}</h2>
      <p className="product-author">{author}</p>
      <p className="product-description">{description}</p>

      <div className="product-price-block">
        {showDiscount && hasDiscount ? (
          <>
            <span className="old-price">{price.toLocaleString('ru-RU')} ₽</span>
            <span className="new-price">
              {discountedPrice.toLocaleString('ru-RU')} ₽
            </span>
          </>
        ) : (
          <span className="current-price">
            {price.toLocaleString('ru-RU')} ₽
          </span>
        )}
      </div>

      <div className="product-actions">
        {hasDiscount && (
          <DiscountButton
            discount={discount}
            active={showDiscount}
            onClick={() => setShowDiscount((prev) => !prev)}
          />
        )}
        <Link to={`/movie/${product.id}`} className="details-btn">
          Подробнее
        </Link>
        <button
          className="add-btn"
          onClick={handleAdd}
          disabled={inCart}
        >
          {inCart ? 'В корзине' : 'В корзину'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;