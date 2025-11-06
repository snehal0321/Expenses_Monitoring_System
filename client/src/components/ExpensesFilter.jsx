// ExpensesFilter.jsx
import "./ExpensesFilter.css";
import { useContext } from "react";
import { AuthContext } from "../AuthContext.jsx";

const ExpensesFilter = ({ selected, selectedYear, expensesData }) => {
  const { user } = useContext(AuthContext);
  function handleYearChange(event) {
    const year = event.target.value;

    selectedYear(year);
  }
  const data = expensesData.filter((item) => item.user === user);

  const expenseYears = data.map((expense) =>
    expense.date.toLocaleString("default", { month: "long" })
  );
  const uniqueYears = [...new Set(expenseYears)];

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <select
          placeholder="Filter By Month"
          value={selected}
          onChange={handleYearChange}
        >
          {uniqueYears.map((uniqueYears) => (
            <option value={uniqueYears} key={uniqueYears}>
              {uniqueYears}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
