import { useState, useEffect } from "react";

const STORAGE_KEY = "finance-treker-transaction";

const getInitialTransaction = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (error) {
      console.error("ошибка чтения localStorage", error);
      return [];
    }
  }
  return [];
};

const useTransaction = () => {
  const [transactions, setTransactions] = useState(getInitialTransaction);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transactionData) => {
    const newTransaction = {
      id: Date.now(),
      ...transactionData,
    };
    setTransactions((prev) => [...prev, newTransaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return { transactions, addTransaction, deleteTransaction };
};

export default useTransaction;
