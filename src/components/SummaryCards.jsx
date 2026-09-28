import { getBalance, getMonthlyTotal } from "../utils/calculations";
import "../style/SummaryCards.css";

const SummaryCards = ({ transactions }) => {
  const Balance = getBalance(transactions);
  const monthlyIncome = getMonthlyTotal(transactions, "income");
  const monthlyExpense = getMonthlyTotal(transactions, "expense");

  return (
    <div className="summary-cards">
      <div className="summary-cards__card">
        <h3 className="summary-cards__label">Баланс</h3>
        <p className="summary-cards__value">{Balance.toFixed(2)} ₽</p>
      </div>
      <div className="summary-cards__card">
        <h3 className="summary-cards__label">Доходы за месяц</h3>
        <p className="summary-cards__value">{monthlyIncome.toFixed(2)} ₽</p>
      </div>
      <div className="summary-cards__card">
        <h3 className="summary-cards__label">Расходы за месяц</h3>
        <p className="summary-cards__value">{monthlyExpense.toFixed(2)} ₽</p>
      </div>
    </div>
  );
};
export default SummaryCards;
