import React from "react";
import Info from "./Info";
import axios from "axios";
import { useCart } from "../hooks/useCart";

function Drawer({ onCloseCard, onRemove, items = [] }) {
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const { setItemsCart, totalPrice } = useCart();

  const onClickOrder = async () => {
    try {
      const newOrder = {
        id: Date.now(),
        items,
        total: totalPrice,
        createdAt: new Date().toISOString(),
      };
      try {
        const raw = localStorage.getItem("kicks-orders");
        const prev = raw ? JSON.parse(raw) : [];
        localStorage.setItem(
          "kicks-orders",
          JSON.stringify([...prev, newOrder])
        );
      } catch (_) {}

      // best-effort: вычищаем корзину на mockapi
      try {
        await Promise.all(
          items.map((it) =>
            axios.delete(
              `https://6399acbf16b0fdad774515a9.mockapi.io/cart/${it.id}`
            )
          )
        );
      } catch (_) {}

      setOrderId(newOrder.id);
      setIsOrderComplete(true);
      setItemsCart([]);
    } catch (error) {
      alert("Не удалось оформить заказ, попробуйте ещё раз.");
    }
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="drawer__title">
          Корзина
          <button onClick={onCloseCard}>
            <img src="/img/cross.svg" alt="img" />
          </button>
        </h2>
        {items.length > 0 ? (
          <div>
            <div className="drawer__cards">
              {items.map((obj) => (
                <div key={obj.id} className="card drawer__card">
                  <img width={70} height={70} src={obj.imgUrl} alt="cross" />

                  <div className="card__content">
                    <p>{obj.title}</p>
                    <span>{obj.price} тг.</span>
                  </div>

                  <button onClick={() => onRemove(obj.id)}>
                    <img src="/img/cross.svg" alt="img" />
                  </button>
                </div>
              ))}
            </div>
            <div className="drawer__bottom">
              <ul className="cartTotalBlock">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} тг.</b>
                </li>
                <li>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} тг.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="drawer__bottom__btn">
                Оформить заказ
                <span>
                  <img src="img/arow.svg" alt="arow" />
                </span>
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке.`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "/img/order.svg" : "/img/empty.svg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
