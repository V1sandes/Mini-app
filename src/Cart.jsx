import React, { useState } from 'react';
import './Cart.css';

function Cart({ items, totalPrice, onRemove, onClear }) {
  const [open, setOpen] = useState(false);
  const totalItems = items.length;

  return (
    <div className="cart-wrap">
      <button className="cart-btn" onClick={() => setOpen((v) => !v)}>
        Корзина <span className="count">{totalItems}</span>
      </button>

      {open && (
        <aside className="cart-panel">
          {items.length === 0 ? (
            <p className="cart-empty">Корзина пуста</p>
          ) : (
            <>
              <ul className="cart-list">
                {items.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">
                        {item.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => onRemove(item.id)}
                      title="Убрать"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <span>Итого:</span>
                <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong>
              </div>

              <button className="clear-btn" onClick={onClear}>
                Очистить корзину
              </button>
            </>
          )}
        </aside>
      )}
    </div>
  );
}

export default Cart;