// ExpensesFilter.jsx
import "./ExpensesFilter.css";

const ExpensesFilter = ({ selected, selectedYear, expensesData }) => {
  function handleYearChange(event) {
    const year = event.target.value;

    selectedYear(year);
  }

  const expenseYears = expensesData.map((expense) =>
    expense.date.toLocaleString("default", { month: "long" })
  );
  const uniqueYears = [...new Set(expenseYears)];

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by Month</label>
        <select value={selected} onChange={handleYearChange}>
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
