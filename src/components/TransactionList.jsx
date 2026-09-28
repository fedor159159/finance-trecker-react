import "../style/TransactionList.css";

const TransactionList = ({ transactions, onDelete }) => {
  const typeLabels = {
    income: "Доход",
    expense: "Расход",
  };

  if (!transactions.length) {
    return <p className="transaction-list__empty">Нет транзакций</p>;
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => (
        <li
          key={t.id}
          className={`transaction-list__item transaction-list__item--${t.type}`}
        >
          <div className="transaction-list__info">
            <div className="transaction-list__row">
              <span className="transaction-list__amount">
                {t.type === 'income' ? '+' : '−'} {t.amount} ₽
              </span>
              <span className="transaction-list__category">{t.category}</span>
              <span className="transaction-list__type">
                {typeLabels[t.type] || t.type}
              </span>
            </div>
            {t.comment && (
              <p className="transaction-list__comment">{t.comment}</p>
            )}
          </div>
          <button
            className="transaction-list__delete"
            onClick={() => onDelete(t.id)}
            aria-label="Удалить"
          >
            🗑
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;