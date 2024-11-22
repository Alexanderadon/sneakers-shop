import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./AppContext";

function App() {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartItems, setItemsCart] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [favorites, setIsFavorites] = React.useState([]);
  const [searcValue, setSearcValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fechData() {
      const setItemsResp = await axios.get(
        "https://6399acbf16b0fdad774515a9.mockapi.io/items"
      );
      const setItemsCartResp = await axios.get(
        "https://6399acbf16b0fdad774515a9.mockapi.io/cart"
      );
      const setFavoritesResp = await axios.get(
        "https://6399acbf16b0fdad774515a9.mockapi.io/favorites"
      );

      setIsLoading(false);

      setItemsCart(setItemsCartResp.data);
      setItems(setItemsResp.data);
      setIsFavorites(setFavoritesResp.data);
    }
    fechData();
  }, []);

  const AddtoCard = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://6399acbf16b0fdad774515a9.mockapi.io/cart/${obj.id}`
        );
        setItemsCart((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post("https://6399acbf16b0fdad774515a9.mockapi.io/cart", obj);
        setItemsCart((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("error");
    }
    console.log(obj);
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favobj) => Number(favobj.id) === Number(obj.id))) {
        axios.delete(
          `https://6399acbf16b0fdad774515a9.mockapi.io/favorites/${obj.id}`
        );
        setIsFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://6399acbf16b0fdad774515a9.mockapi.io/favorites",
          obj
        );
        setIsFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удалось добавить в favorite");
    }
    console.log(obj);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6399acbf16b0fdad774515a9.mockapi.io/cart/${id}`);
    setItemsCart((prev) => prev.filter((item) => item.id !== id));
  };

  const OnChangeSearchInput = (event) => {
    setSearcValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setItemsCart,
      }}
    >
      <div className="wrapper">
        <Header onClickCart={() => setCartOpened(true)} />
        {cartOpened && (
          <Drawer
            items={cartItems}
            onCloseCard={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searcValue={searcValue}
                setSearcValue={setSearcValue}
                OnChangeSearchInput={OnChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                AddtoCard={AddtoCard}
                cartItems={cartItems}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/Orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
