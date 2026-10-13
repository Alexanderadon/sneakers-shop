import React from "react";

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("kicks-orders");
      setOrders(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setOrders([]);
    }
  }, []);

  if (!orders.length) {
    return (
      <div>
        <section className="main p-40">
          <div className="main__top">
            <h1 className="main__title">Мои заказы</h1>
          </div>
          <div className="orders__empty">
            <img src="/img/order.svg" alt="orders" />
            <h3>У вас пока нет заказов</h3>
            <p>Оформите хотя бы один заказ — он появится здесь.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="main p-40">
        <div className="main__top">
          <h1 className="main__title">Мои заказы</h1>
        </div>
        <div className="orders__list">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <div key={order.id} className="order">
                <div className="order__head">
                  <div>
                    <p className="order__id">Заказ №{order.id}</p>
                    <p className="order__date">
                      {new Date(order.createdAt).toLocaleString("ru-RU")}
                    </p>
                  </div>
                  <div className="order__status">Доставляется</div>
                </div>
                <div className="order__items">
                  {order.items.map((it) => (
                    <div key={it.id} className="order__item">
                      <img src={it.imgUrl} alt="cross" />
                      <div>
                        <p>{it.title}</p>
                        <span>{it.price} тг.</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order__total">
                  Итого: <b>{order.total} тг.</b>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Orders;
