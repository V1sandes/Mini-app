import React, { useState } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import ProductCard from './ProductCard.jsx';
import Cart from './Cart.jsx';
import './App.css';

const moviesData = [
  { id: 1, name: 'Побег из Шоушенка', author: 'Фрэнк Дарабонт', price: 490, discount: 15, description: 'История надежды и дружбы в стенах тюрьмы.', fullDescription: 'Банкир Энди Дюфрейн осуждён за убийство жены и отправлен в тюрьму Шоушенк. За долгие годы он обретает друга, надежду и способ вырваться на свободу.', year: 1994, duration: '142 мин', genre: 'Драма' },
  { id: 2, name: 'Крёстный отец', author: 'Фрэнсис Форд Коппола', price: 550, discount: 10, description: 'Классика гангстерского кино о семье Корлеоне.', fullDescription: 'История семьи Корлеоне — одной из самых влиятельных мафиозных династий Нью-Йорка. Младший сын Майкл становится главой семьи.', year: 1972, duration: '175 мин', genre: 'Криминал' },
  { id: 3, name: 'Интерстеллар', author: 'Кристофер Нолан', price: 620, discount: 20, description: 'Космическая одиссея о любви и времени.', fullDescription: 'Земля погибает. Группа астронавтов отправляется через червоточину в поисках новой планеты для человечества.', year: 2014, duration: '169 мин', genre: 'Фантастика' },
  { id: 4, name: 'Матрица', author: 'Братья Вачовски', price: 450, discount: 0, description: 'Что есть реальность? Нео предстоит это узнать.', fullDescription: 'Хакер Нео узнаёт, что мир — симуляция, созданная машинами. Он присоединяется к сопротивлению и становится Избранным.', year: 1999, duration: '136 мин', genre: 'Фантастика' },
  { id: 5, name: 'Форрест Гамп', author: 'Роберт Земекис', price: 520, discount: 5, description: 'Жизнь простого человека на фоне истории США.', fullDescription: 'Форрест Гамп — человек с добрым сердцем и необычной судьбой. Он становится свидетелем ключевых событий XX века.', year: 1994, duration: '142 мин', genre: 'Драма' },
  { id: 6, name: 'Начало', author: 'Кристофер Нолан', price: 580, discount: 12, description: 'Ограбление внутри сна — многоуровневый триллер.', fullDescription: 'Дом Кобб — вор, проникающий в сны. Ему предлагают внедрить идею, а не украсть её. Задача требует сна внутри сна.', year: 2010, duration: '148 мин', genre: 'Триллер' },
];

const finalPrice = (m) =>
  m.discount > 0 ? Math.round(m.price * (1 - m.discount / 100)) : m.price;

function MoviePage({ onAddToCart, cartIds }) {
  const { id } = useParams();
  const movie = moviesData.find((m) => m.id === Number(id));

  if (!movie)
    return (
      <div className="movie-page">
        <p>Фильм не найден.</p>
        <Link to="/" className="back-link">← Назад</Link>
      </div>
    );

  const price = finalPrice(movie);
  const hasDiscount = movie.discount > 0;
  const inCart = cartIds.includes(movie.id);

  return (
    <div className="movie-page">
      <Link to="/" className="back-link">← Назад</Link>
      <h1 className="movie-page-name">{movie.name}</h1>
      <p className="movie-page-author">{movie.author}</p>
      <div className="movie-meta">
        <span>Год: {movie.year}</span>
        <span>{movie.duration}</span>
        <span>{movie.genre}</span>
      </div>
      <p className="movie-page-full">{movie.fullDescription}</p>
      <div className="movie-page-price">
        {hasDiscount ? (
          <>
            <span className="old-price">{movie.price.toLocaleString('ru-RU')} ₽</span>
            <span className="new-price">{price.toLocaleString('ru-RU')} ₽</span>
            <span className="discount-tag">−{movie.discount}%</span>
          </>
        ) : (
          <span className="current-price">{movie.price.toLocaleString('ru-RU')} ₽</span>
        )}
      </div>
      <button
        className="add-btn big"
        onClick={() => onAddToCart(movie)}
        disabled={inCart}
      >
        {inCart ? 'Уже в корзине' : 'Добавить в корзину'}
      </button>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (m) =>
    setCart((prev) => {
      if (prev.find((i) => i.id === m.id)) return prev;
      return [...prev, { id: m.id, name: m.name, price: finalPrice(m) }];
    });

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((s, i) => s + i.price, 0);
  const cartIds = cart.map((i) => i.id);

  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="title-link">
          <h1 className="title">Кинолавка</h1>
        </Link>

        <Cart
          items={cart}
          totalPrice={totalPrice}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <div className="catalog">
              {moviesData.map((m) => (
                <ProductCard
                  key={m.id}
                  product={m}
                  onAddToCart={addToCart}
                  inCart={cartIds.includes(m.id)}
                />
              ))}
            </div>
          }
        />
        <Route
          path="/movie/:id"
          element={<MoviePage onAddToCart={addToCart} cartIds={cartIds} />}
        />
      </Routes>
    </div>
  );
}

export default App;