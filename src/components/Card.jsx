import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../AppContext";

const BRANDS = ["Nike", "Asics", "Puma", "Adidas", "Jordan", "New Balance", "Reebok"];

function detectBrand(title = "") {
  const t = title.toLowerCase();
  return BRANDS.find((b) => t.includes(b.toLowerCase())) || "Sneakers";
}

function Card({
  id,
  imgUrl,
  title,
  price,
  brand: brandProp,
  onFavorites,
  onPlus,
  favorited = true,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [favorites, setFavorites] = React.useState(favorited);

  const added = isItemAdded(id);
  const brand = brandProp || detectBrand(title);

  const onClickPlus = () => {
    onPlus({ id, imgUrl, title, price });
  };

  const onFavorite = () => {
    onFavorites({ id, imgUrl, title, price });
    setFavorites(!favorites);
  };

  return (
    <div className={"card" + (added ? " card--added" : "")}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={250}
          viewBox="0 0 210 250"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebff"
        >
          <rect x="0" y="0" rx="18" ry="18" width="210" height="140" />
          <rect x="0" y="155" rx="4" ry="4" width="160" height="14" />
          <rect x="0" y="180" rx="4" ry="4" width="110" height="14" />
          <rect x="0" y="215" rx="6" ry="6" width="90" height="22" />
          <rect x="160" y="210" rx="14" ry="14" width="50" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="card__media">
            <span className="card__brand">{brand}</span>
            <button
              type="button"
              className={
                "card__favorite" + (favorites ? "" : " card__favorite--active")
              }
              onClick={onFavorite}
              aria-label="favorite"
            >
              <img
                src={favorites ? "/img/heart-line.svg" : "/img/heart-fill.svg"}
                alt="heart"
              />
            </button>
            <img className="card__cross" src={imgUrl} alt={title} />
          </div>
          <div className="card__title">{title}</div>
          <div className="card--price">
            <div className="price__left">
              <span>{price.toLocaleString("ru-RU")} ₸</span>
            </div>
            <button
              type="button"
              className={"card__cta" + (added ? " card__cta--added" : "")}
              onClick={onClickPlus}
              aria-label={added ? "В корзине" : "В корзину"}
            >
              <img
                src={added ? "/img/check-white.svg" : "/img/plus-white.svg"}
                alt="img"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
