import { categories } from "../utils/categories";
import useCustomCategories from "../hooks/useCustomCategories";
import "../style/Filters.css";

const Filters = ({
  typeFilter,
  categoryFilter,
  onTypeChange,
  onCategoryChange,
}) => {
  const { customCategories } = useCustomCategories();
  const allCategories = [...categories, ...customCategories];

  return (
    <div className="filters">
      <div className="filters__types">
        <button
          className={`filters__btn ${typeFilter === "all" ? "filters__btn--active" : ""}`}
          onClick={() => onTypeChange("all")}
        >
          Все
        </button>
        <button
          className={`filters__btn ${typeFilter === "income" ? "filters__btn--active" : ""}`}
          onClick={() => onTypeChange("income")}
        >
          Доходы
        </button>
        <button
          className={`filters__btn ${typeFilter === "expense" ? "filters__btn--active" : ""}`}
          onClick={() => onTypeChange("expense")}
        >
          Расходы
        </button>
      </div>

      <select
        className="filters__select"
        value={categoryFilter}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">Все категории</option>
        {allCategories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
