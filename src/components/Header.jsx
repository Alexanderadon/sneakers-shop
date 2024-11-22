import React from "react";
import { useCart } from "../hooks/useCart";

import { Link } from "react-router-dom";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="header p-40">
      <div className="header-left">
        <Link to={"/"}>
          <img width={36} height={36} src="/img/image4.png" alt="logo" />
        </Link>
        <div className="header-left__info">
          <Link to={"/"}>
            <h3 className="header-left__title">REACT Shop</h3>
            <p className="header-left__subtitle">Магазин лучших кроссовок</p>
          </Link>
        </div>
      </div>
      <ul className="header-right">
        <li onClick={props.onClickCart}>
          <img src="/img/cart.svg" alt="cart" />

          <span>{totalPrice} тг.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="/img/header.svg" alt="like" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="/img/Union.svg" alt="union" />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
