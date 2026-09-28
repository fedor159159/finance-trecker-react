import { categories } from "./categories";

export const getBalance = (transactions) => {
  return transactions.reduce((acc, t) => {
    if (t.type === "income") {
      return acc + t.amount;
    }
    return acc - t.amount;
  }, 0);
};

export const getMonthlyTotal = (transactions, type) => {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0 = январь
  const currentYear = now.getFullYear();

  return transactions
    .filter((t) => {
      const date = new Date(t.date);
      return (
        t.type === type &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((acc, t) => acc + t.amount, 0);
};
export const getExpensesByCategory = (transactions) => {
  // собираем суммы по кат.
  const totals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  //превращаем в массив
  return Object.entries(totals).map(([value, sum]) => {
    const cat = categories.find((c) => c.value === value);
    return {
      name: cat ? cat.label : value,
      value: sum,
    };
  });
};

export const getDailyTotals = (transactions, days = 30) => {
  const result = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const key = day.toISOString().slice(0, 10); // 'YYYY-MM-DD'
    const dayTransactions = transactions.filter(
      (t) => t.date.slice(0, 10) === key,
    );
    const income = dayTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = dayTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    result.push({
      date: `${String(day.getDate()).padStart(2, "0")}.${String(day.getMonth() + 1).padStart(2, "0")}`,
      income,
      expense,
    });
  }
  return result;
};
