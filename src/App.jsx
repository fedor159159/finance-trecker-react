import { useState, useMemo, useEffect } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Filters from "./components/Filters";
import SummaryCards from "./components/SummaryCards";
import CategoryChart from "./components/CategoryChart";
import useTransaction from "./hooks/useTransactions.js";
import useTheme from "./hooks/useTheme";
import "./style/App.css";

function App() {
  const { transactions, addTransaction, deleteTransaction } = useTransaction();
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const { theme, toggleTheme } = useTheme();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = typeFilter === "all" || t.type === typeFilter;
      const matchesCategory =
        categoryFilter === "all" || t.category === categoryFilter;
      return matchesType && matchesCategory;
    });
  }, [transactions, typeFilter, categoryFilter]);

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="app__title">Финансовый трекер</h1>
        <button className="app__theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Тёмная" : "☀️ Светлая"}
        </button>
      </div>

      <SummaryCards transactions={transactions} />
      <CategoryChart transactions={transactions} />
      <TransactionForm onAdd={addTransaction} />
      <Filters
        typeFilter={typeFilter}
        categoryFilter={categoryFilter}
        onTypeChange={setTypeFilter}
        onCategoryChange={setCategoryFilter}
      />
      <TransactionList
        transactions={filteredTransactions}
        onDelete={deleteTransaction}
      />
    </div>
  );
}

export default App;
