import { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem.jsx";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter.jsx";
import ErrorModule from "./ErrorModule.jsx";
import InputModule from "./InputModel.jsx";

function Expenses({ ClusterType }) {
  const [expenses, setExpenses] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showInputBox, setShowInputBox] = useState(false);
  const [error, setError] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const items = expenses;

  console.log("ClusterType in Expenses:", ClusterType.title);

  const fetchExpenses = async () => {
    const cluster = ClusterType.title;
    try {
      const response = await fetch(
        `https://expenses-monitoring-system-1.onrender.com/api/expenses/${cluster}`
      );
      const data = await response.json();

      const processedData = data.map((item) => ({
        ...item,
        date: new Date(item.date),
      }));

      if (processedData.length > 0) {
        setSelectedYear(
          processedData[0].date.toLocaleString("default", { month: "long" })
        );
      }

      setExpenses(processedData);
      setIsLoading(false);

      console.log("Fetched expenses:", data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [ClusterType]);

  function handleYearChange(year) {
    setSelectedYear(year);
  }

  const filteredItems = items.filter(
    (item) =>
      item.date.toLocaleString("default", { month: "long" }) === selectedYear
  );

  useEffect(() => {
    if (isLoading) return;
    if (filteredItems.length === 0) {
      // setShowDialog(true);
      console.log("No items found for", selectedYear);
      setError(`No items found for ${selectedYear}.`);
    } else {
      // setShowDialog(false);
      //  setError('');
    }
  }, [filteredItems]);

  async function handleSave() {
    // Logic to save the new expense
    try {
      if (document.getElementById("Title").value === "") {
        throw new Error("Title fields are required!");
      }
      if (document.getElementById("Amount").value === "") {
        throw new Error("Amount fields are required!");
      }
      if (document.getElementById("date").value === "") {
        throw new Error("Date fields are required!");
      }
    } catch (error) {
      // setShowDialog(true);
      setError(error.message);
      return;
    }
    const ExpenseData = {
      title: document.getElementById("Title").value,
      amount: document.getElementById("Amount").value,
      date: new Date(document.getElementById("date").value),
      cluster: ClusterType.title,
    };
    setExpenses((pervExpenses) => [...pervExpenses, ExpenseData]);
    // console.log('Expense saved!');
    const response = await fetch(
      "https://expenses-monitoring-system-1.onrender.com/api/expenses/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ExpenseData),
      }
    );
    const data = await response.json();
    console.log("Saved:", data);
    setShowInputBox(false);
    fetchExpenses();

    return response.data;
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(
        `https://expenses-monitoring-system-1.onrender.com/api/expenses/${id}`,
        {
          method: "DELETE", // ✅ correct method
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      const data = await response.json();
      console.log("Deleted:", data);

      // ✅ Refresh the list after delete
      fetchExpenses();

      return data;
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  }

  useEffect(() => {
    console.log("Updated expenses:", expenses);
  }, [expenses]);

  const Totalamount = filteredItems.reduce(
    (total, item) => total + parseFloat(item.amount),
    0
  );
  const balance = ClusterType.balance - Totalamount;

  // if (isLoading) {
  //   // setShowDialog(false);
  //   return <div>Loading....</div>;
  // }
  return (
    <div className="expenses">
      <h1>{ClusterType.title}</h1>
      <button onClick={() => setShowInputBox(true)}>Add Expense</button>
      <div className="balance-display">Balance: {balance}</div>
      {showInputBox && (
        <InputModule
          open={showInputBox}
          onClose={() => setShowInputBox(false)}
          onSave={handleSave}
        >
          <h2>Input Expense Details Here</h2>
          <input id="Title" type="text" placeholder="Title" />
          <br />
          <input id="Amount" type="number" placeholder="Amount" />
          <br />
          <input id="date" type="date" />
          <br />
        </InputModule>
      )}

      <ExpensesFilter
        selected={selectedYear}
        selectedYear={handleYearChange}
        expensesData={expenses}
      />
      {showDialog && (
        <ErrorModule
          // message={`No items found for ${selectedYear}.`}
          message={error}
          open={showDialog}
          onClose={() => {
            setShowDialog(false);
            setSelectedYear(
              expenses[0].date.toLocaleString("default", { month: "long" })
            );
          }}
        />
      )}
      {filteredItems.map(
        (item) => (
          (item.date = new Date(item.date)),
          (
            <ExpenseItem
              key={item._id}
              title={item.title}
              amount={item.amount}
              date={item.date}
              onDelete={() => handleDelete(item._id)}
            />
          )
        )
      )}
      <div className="item__price">
        <h3>Total Expense in {selectedYear} :</h3>
        <h3>₹{Totalamount.toFixed(2)}</h3>
      </div>
    </div>
  );
}

export default Expenses;
