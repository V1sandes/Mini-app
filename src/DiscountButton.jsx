import React from 'react';
import './DiscountButton.css';

function DiscountButton({ discount, active, onClick }) {
  return (
    <button
      className={`discount-btn ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {active ? `Скидка ${discount}% активна` : `Скидка ${discount}%`}
    </button>
  );
}

export default DiscountButton;
