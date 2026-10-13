import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__col footer__brand">
          <img src="/img/logo.svg" alt="logo" width={36} height={36} />
          <div>
            <h4>TRACK 23</h4>
          </div>
        </div>
        <div className="footer__col">
          <h5>Магазин</h5>
          <ul>
            <li><Link to="/">Каталог</Link></li>
            <li><Link to="/favorites">Избранное</Link></li>
            <li><Link to="/orders">Мои заказы</Link></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Помощь</h5>
          <ul>
            <li><a href="#delivery">Доставка</a></li>
            <li><a href="#returns">Возврат</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h5>Контакты</h5>
          <ul>
            <li><a href="tel:+77001112233">+7 (700) 111-22-33</a></li>
            <li><a href="mailto:hi@kicks.kz">hi@kicks.kz</a></li>
            <li>Алматы, ул. Абая 150</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2023 TRACK 23. Все права защищены.</span>
        <span className="footer__pay">Visa · Mastercard · Kaspi</span>
      </div>
    </footer>
  );
}

export default Footer;
