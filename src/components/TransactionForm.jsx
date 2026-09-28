import { useState } from "react";
import { categories } from "../utils/categories";
import useCustomCategories from "../hooks/useCustomCategories";
import "../style/TransactionForm.css";

const TransactionForm = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("еда");
  const [customCategory, setCustomCategory] = useState("");
  const [comment, setComment] = useState("");

  const { customCategories, addCustomCategory, deleteCustomCategory } =
    useCustomCategories();

  const allCategories = [...categories, ...customCategories];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const finalCategory =
      category === "другое" ? customCategory.trim().toLowerCase() : category;

    if (category === "другое" && !finalCategory) return;

    // Если использовали свою категорию — сохраняем её
    if (category === "другое") {
      addCustomCategory(finalCategory);
    }

    onAdd({
      id: Date.now(),
      type,
      amount: Number(amount),
      category: finalCategory,
      date: new Date().toISOString(),
      comment,
    });

    setAmount("");
    setComment("");
    setCustomCategory("");
    setCategory("еда");
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <input
        className="transaction-form__input"
        type="number"
        placeholder="Сумма"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <select
        className="transaction-form__select"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="expense">Расход</option>
        <option value="income">Доход</option>
      </select>

      <select
        className="transaction-form__select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {allCategories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      {customCategories.length > 0 && (
        <div className="transaction-form__chips transaction-form__input--wide">
          <span className="transaction-form__chips-label">Свои категории:</span>
          {customCategories.map((cat) => (
            <span key={cat.value} className="transaction-form__chip">
              {cat.label}
              <button
                type="button"
                className="transaction-form__chip-delete"
                onClick={() => deleteCustomCategory(cat.value)}
                aria-label={`Удалить категорию ${cat.label}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {category === "другое" && (
        <input
          className="transaction-form__input"
          type="text"
          placeholder="Своя категория"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          required
        />
      )}

      <input
        className="transaction-form__input transaction-form__input--wide"
        type="text"
        placeholder="Комментарий (необязательно)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="transaction-form__button" type="submit">
        Добавить
      </button>
    </form>
  );
};

export default TransactionForm;
