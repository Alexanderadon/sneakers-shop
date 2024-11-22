import React from "react";
import Card from "../components/Card";

function Home({
  items,
  searcValue,
  setSearcValue,
  OnChangeSearchInput,
  onAddToFavorite,
  AddtoCard,
  isLoading,
}) {
  const renderItems = () => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searcValue.toLowerCase())
    );

    return (isLoading ? [...Array(10)] : filtered).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => AddtoCard(obj)}
        onFavorites={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div>
      {/* main */}
      <section className="main p-40">
        <div className="main__top">
          <h1 className="main__title">
            {searcValue ? `Поиск по запросу: "${searcValue}"` : "Все кроссовки"}
          </h1>
          <div className="main--search">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={OnChangeSearchInput}
              value={searcValue}
              className="search__input"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>

        <div className="cards">{renderItems()}</div>
      </section>
    </div>
  );
}

export default Home;
