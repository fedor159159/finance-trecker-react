import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getExpensesByCategory, getDailyTotals } from "../utils/calculations";
import "../style/CategoryChart.css";

const COLORS = [
  "#4b7bec",
  "#26a65b",
  "#f7b731",
  "#e74c3c",
  "#a55eea",
  "#45aaf2",
];

const CategoryChart = ({ transactions }) => {
  const [chartType, setChartType] = useState("pie");

  const categoryData = getExpensesByCategory(transactions);
  const dailyData = getDailyTotals(transactions, 30);

  const renderChart = () => {
    if (chartType === "pie") {
      if (!categoryData.length) {
        return <p className="chart__empty">Нет расходов для отображения</p>;
      }
      return (
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "bar") {
      if (!categoryData.length) {
        return <p className="chart__empty">Нет расходов для отображения</p>;
      }
      return (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Bar dataKey="value" fill="#4b7bec" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#26a65b"
              name="Доходы"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#e74c3c"
              name="Расходы"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === "area") {
      return (
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} ₽`} />
            <Legend />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#26a65b"
              fill="#a5e6c1"
              name="Доходы"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#e74c3c"
              fill="#f5b7b1"
              name="Расходы"
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="chart">
      <h2 className="chart__title">Аналитика</h2>

      <div className="chart__tabs">
        <button
          className={`chart__tab ${chartType === "pie" ? "chart__tab--active" : ""}`}
          onClick={() => setChartType("pie")}
        >
          Круговая
        </button>
        <button
          className={`chart__tab ${chartType === "bar" ? "chart__tab--active" : ""}`}
          onClick={() => setChartType("bar")}
        >
          Столбчатая
        </button>
        <button
          className={`chart__tab ${chartType === "line" ? "chart__tab--active" : ""}`}
          onClick={() => setChartType("line")}
        >
          Линейная
        </button>
        <button
          className={`chart__tab ${chartType === "area" ? "chart__tab--active" : ""}`}
          onClick={() => setChartType("area")}
        >
          Область
        </button>
      </div>

      <div className="chart__wrapper">{renderChart()}</div>
    </div>
  );
};

export default CategoryChart;
