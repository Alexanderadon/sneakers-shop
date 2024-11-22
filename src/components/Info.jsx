import React from "react";
import AppContext from "../AppContext";

const Info = ({ image, title, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cart--empty">
      <img className="empty__img" src={image} alt="box" />
      <h3 className="empty__title">{title}</h3>
      <p>{description}</p>
      <button
        className="drawer__bottom__btn empty__btn"
        onClick={() => setCartOpened(false)}
      >
        Вернуться назад
        <span>
          <img src="img/arow.svg" alt="arow" />
        </span>
      </button>
    </div>
  );
};

export default Info;
