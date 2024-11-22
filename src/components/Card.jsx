import React from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../AppContext";

function Card({
  id,
  imgUrl,
  title,
  price,
  onFavorites,
  onPlus,
  favorited = true,
  loading = false,
}) {
  const { isItemAdded } = React.useContext(AppContext);
  const [favorites, setFavorites] = React.useState(favorited);

  console.log(title, isItemAdded(id));

  const onClickPlus = () => {
    onPlus({ id, imgUrl, title, price });
  };

  const onFavorite = () => {
    onFavorites({ id, imgUrl, title, price });
    setFavorites(!favorites);
  };

  React.useEffect(() => {
    console.log("Переменная извинилась");
  }, []);

  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={210}
          height={220}
          viewBox="0 0 210 220"
          backgroundColor="#f3f3f3"
          foregroundColor="#f2ece3"
        >
          <rect x="10" y="10" rx="10" ry="10" width="150" height="90" />
          <rect x="10" y="110" rx="3" ry="3" width="150" height="15" />
          <rect x="10" y="135" rx="3" ry="3" width="90" height="15" />
          <rect x="10" y="185" rx="3" ry="3" width="70" height="24" />
          <rect x="128" y="178" rx="3" ry="3" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="card__favorite" onClick={onFavorite}>
            <img
              src={favorites ? "/img/heard--opacity.svg" : "/img/heard.svg"}
              alt="heard"
            />
          </div>
          <img className="card__cross" height={112} src={imgUrl} alt="img" />
          <div className="card__title">{title}</div>
          <div className="card--price">
            <div className="price__left">
              <p>Цена:</p>
              <span>{price} тг.</span>
            </div>
            <img
              className="card--btn"
              onClick={onClickPlus}
              src={isItemAdded(id) ? "/img/cheks.svg" : "/img/plus.svg"}
              alt="img"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
