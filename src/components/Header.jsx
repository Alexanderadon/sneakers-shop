import React from "react";
import { useCart } from "../hooks/useCart";

import { Link } from "react-router-dom";

function Header(props) {
  const { totalPrice, cartItems } = useCart();
  const cartCount = cartItems ? cartItems.length : 0;

  return (
    <header className="header p-40">
      <div className="header-left">
        <Link to={"/"}>
          <img className="header-left__logo" width={48} height={48} src="/img/logo.svg" alt="logo" />
        </Link>
        <div className="header-left__info">
          <Link to={"/"}>
            <h3 className="header-left__title">TRACK 23</h3>
            <p className="header-left__subtitle">кроссовки и беговая обувь</p>
          </Link>
        </div>
      </div>
      <ul className="header-right">
        <li className="header-right__cart" onClick={props.onClickCart}>
          <img src="/img/icon-cart.svg" alt="cart" />
          <span>{totalPrice.toLocaleString("ru-RU")} ₸</span>
          {cartCount > 0 && <em className="cart-badge">{cartCount}</em>}
        </li>
        <li className="header-right__icon" aria-label="Избранное">
          <Link to="/favorites">
            <img src="/img/icon-heart.svg" alt="like" />
          </Link>
        </li>
        <li className="header-right__icon" aria-label="Профиль">
          <Link to="/orders">
            <img src="/img/icon-user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
