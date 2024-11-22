import React from "react";
import AppContext from "../AppContext";
import Card from "../components/Card";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);

  return (
    <div>
      <section className="main p-40">
        <div className="main__top">
          <h1 className="main__title">Избранное</h1>
        </div>
        <div className="cards">
          {favorites.map((item, index) => (
            <Card
              key={index}
              onClickFavorite={() => console.log("Убрать с закладок")}
              favorited={false}
              onFavorites={onAddToFavorite}
              {...item}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Favorites;
