import React from "react";
import Card from "../components/Card";

const BRANDS = ["Все", "Nike", "Asics", "Puma"];
const COLORS = [
  { key: "Все",    label: "Все",     swatch: "linear-gradient(135deg, #1f1f2e 0%, #1f1f2e 50%, #1f1f2e 50%, #1f1f2e 100%)" },
  { key: "Black",  label: "Чёрный",  swatch: "#1f1f2e" },
  { key: "White",  label: "Белый",   swatch: "#ffffff" },
  { key: "Red",    label: "Красный", swatch: "#ef4444" },
  { key: "Yellow", label: "Жёлтый",  swatch: "#fbbf24" },
  { key: "Green",  label: "Зелёный", swatch: "#10b981" },
  { key: "Blue",   label: "Синий",   swatch: "#3b82f6" },
  { key: "Pink",   label: "Розовый", swatch: "#ec4899" },
  { key: "Purple", label: "Фиолет.", swatch: "#8b5cf6" },
  { key: "Grey",   label: "Серый",   swatch: "#9ca3af" },
  { key: "Brown",  label: "Бежевый", swatch: "#c8a373" },
  { key: "Volt",   label: "Volt",    swatch: "#d3fc4a" },
  { key: "Mix",    label: "Микс",    swatch: "linear-gradient(135deg, #ff5e62, #6C5CE7 50%, #00B5FF)" },
];
const PRICE_BANDS = [
  { key: "all",   label: "Любая",     min: 0,     max: Infinity },
  { key: "u15",   label: "До 15 000 ₸",   min: 0,     max: 15000 },
  { key: "15-25", label: "15 000 – 25 000 ₸", min: 15000, max: 25000 },
  { key: "25-35", label: "25 000 – 35 000 ₸", min: 25000, max: 35000 },
  { key: "o35",   label: "Дороже 35 000 ₸",  min: 35000, max: Infinity },
];
const SORTS = [
  { key: "default", label: "По популярности",   icon: "★" },
  { key: "asc",     label: "Сначала дешёвые",   icon: "↑" },
  { key: "desc",    label: "Сначала дорогие",   icon: "↓" },
];

function detectColor(title = "") {
  const m = title.match(/\(([^)]+)\)/);
  return m ? m[1].trim() : null;
}

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const current = SORTS.find((s) => s.key === value) || SORTS[0];

  React.useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className={"sort" + (open ? " sort--open" : "")} ref={ref}>
      <button type="button" className="sort__button" onClick={() => setOpen((v) => !v)}>
        <span className="sort__hint">Сортировка:</span>
        <span className="sort__current">{current.label}</span>
        <svg className="sort__chevron" width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && (
        <div className="sort__menu">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={"sort__item" + (s.key === value ? " sort__item--active" : "")}
              onClick={() => { onChange(s.key); setOpen(false); }}
            >
              <em className="sort__icon">{s.icon}</em>
              {s.label}
              {s.key === value && (
                <svg className="sort__tick" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5 L10 17.5 L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Home({
  items,
  searcValue,
  setSearcValue,
  OnChangeSearchInput,
  onAddToFavorite,
  AddtoCard,
  isLoading,
}) {
  const [brand, setBrand] = React.useState("Все");
  const [color, setColor] = React.useState("Все");
  const [priceBand, setPriceBand] = React.useState("all");
  const [sort, setSort] = React.useState("default");

  const priceObj = PRICE_BANDS.find((p) => p.key === priceBand) || PRICE_BANDS[0];

  const filteredItems = React.useMemo(() => {
    let arr = items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searcValue.toLowerCase());
      const matchesBrand = brand === "Все" || item.brand === brand;
      const matchesColor = color === "Все" || (detectColor(item.title) || "").toLowerCase() === color.toLowerCase();
      const matchesPrice = item.price >= priceObj.min && item.price <= priceObj.max;
      return matchesSearch && matchesBrand && matchesColor && matchesPrice;
    });
    if (sort === "asc")  arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === "desc") arr = [...arr].sort((a, b) => b.price - a.price);
    return arr;
  }, [items, searcValue, brand, color, priceBand, sort, priceObj]);

  // counts for filter labels
  const countByBrand = (b) => items.filter((i) => b === "Все" || i.brand === b).length;
  const countByColor = (c) =>
    items.filter((i) => c === "Все" || (detectColor(i.title) || "").toLowerCase() === c.toLowerCase()).length;

  // active filters as removable chips
  const activeChips = [
    brand !== "Все" && { type: "brand", label: brand, clear: () => setBrand("Все") },
    color !== "Все" && {
      type: "color",
      label: (COLORS.find((c) => c.key === color) || {}).label,
      clear: () => setColor("Все"),
    },
    priceBand !== "all" && { type: "price", label: priceObj.label, clear: () => setPriceBand("all") },
  ].filter(Boolean);

  const resetAll = () => {
    setBrand("Все"); setColor("Все"); setPriceBand("all");
  };

  const renderItems = () => {
    if (!isLoading && filteredItems.length === 0) {
      return (
        <div className="cards__empty">
          <img src="/img/empty.svg" alt="empty" />
          <h3>Ничего не найдено</h3>
          <p>Попробуйте сбросить фильтры или другой запрос.</p>
        </div>
      );
    }
    return (isLoading ? [...Array(6)] : filteredItems).map((item, index) => (
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
      {/* hero */}
      <section className="hero">
        <div
          className="hero__banner"
          aria-hidden="true"
          style={{ backgroundImage: "url(/img/hero-banner.webp)" }}
        />
        <div className="hero__text">
          <h2 className="hero__title">
            Кроссовки<br />на каждый <span>день.</span>
          </h2>
          <p className="hero__subtitle">
            Подобранные пары Nike, Asics и Puma. Доставка по всему Казахстану.
          </p>
          <div className="hero__cta">
            <span className="hero__badge">Бесплатная доставка</span>
            <span className="hero__badge hero__badge--alt">Гарантия 30 дней</span>
          </div>
        </div>
      </section>

      {/* main: catalog with sidebar */}
      <section className="main p-40">
        <div className="main__top">
          <div className="main__top-left">
            <h1 className="main__title">
              {searcValue
                ? `Поиск: "${searcValue}"`
                : brand === "Все"
                ? "Каталог"
                : `Кроссовки ${brand}`}
            </h1>
          </div>
          <div className="main__top-right">
            <SortDropdown value={sort} onChange={setSort} />
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
        </div>

        {/* active filter chips */}
        {activeChips.length > 0 && (
          <div className="active-filters">
            {activeChips.map((c, i) => (
              <button key={i} className="active-chip" onClick={c.clear} type="button">
                {c.label}
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2 L10 10 M10 2 L2 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            ))}
            <button className="active-chip active-chip--reset" onClick={resetAll} type="button">
              Сбросить всё
            </button>
          </div>
        )}

        <div className="shop">
          {/* sidebar */}
          <aside className="shop__sidebar">
            <div className="filter-block">
              <h3 className="filter-block__title">Бренд</h3>
              <ul className="filter-list">
                {BRANDS.map((b) => (
                  <li key={b}>
                    <label className="filter-radio">
                      <input
                        type="radio"
                        name="brand"
                        checked={brand === b}
                        onChange={() => setBrand(b)}
                      />
                      <span className="filter-radio__mark"></span>
                      <span className="filter-radio__label">{b}</span>
                      <span className="filter-radio__count">{countByBrand(b)}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-block">
              <h3 className="filter-block__title">Цвет</h3>
              <ul className="filter-list filter-list--colors">
                {COLORS.map((c) => (
                  <li key={c.key}>
                    <button
                      type="button"
                      className={"filter-color" + (color === c.key ? " filter-color--active" : "")}
                      onClick={() => setColor(c.key)}
                      title={c.label}
                    >
                      <span
                        className="filter-color__swatch"
                        style={{ background: c.swatch }}
                      />
                      <span className="filter-color__label">
                        {c.label}
                        <em>{countByColor(c.key)}</em>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="filter-block">
              <h3 className="filter-block__title">Цена</h3>
              <ul className="filter-list">
                {PRICE_BANDS.map((p) => (
                  <li key={p.key}>
                    <label className="filter-radio">
                      <input
                        type="radio"
                        name="price"
                        checked={priceBand === p.key}
                        onChange={() => setPriceBand(p.key)}
                      />
                      <span className="filter-radio__mark"></span>
                      <span className="filter-radio__label">{p.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* product grid */}
          <div className="shop__grid">
            <div className="cards">{renderItems()}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function pluralize(n) {
  const last = n % 10;
  const tens = Math.floor(n / 10) % 10;
  if (tens === 1) return "моделей";
  if (last === 1) return "модель";
  if (last >= 2 && last <= 4) return "модели";
  return "моделей";
}

export default Home;
