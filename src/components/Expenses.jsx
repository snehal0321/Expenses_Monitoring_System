import { useEffect,useState } from 'react';    
import ExpenseItem from './ExpenseItem.jsx';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter.jsx';
import ErrorModule from './Errormodule.jsx';
import InputModule from './InputModel.jsx';
import expensesData   from '../data/expenses.js';

function Expenses() {

    const [selectedYear ,setSelectedYear] = useState('2020');
    const [showDialog, setShowDialog] = useState(false);
    const [showInputBox, setShowInputBox] = useState(false);
    const [expenses, setExpenses] = useState(expensesData);

    const items = expenses;

    function handleYearChange(year){
        setSelectedYear(year);
    }

  const filteredItems = items.filter(
    (item) => item.date.getFullYear().toString() === selectedYear
  );

  useEffect(() => {
    if (filteredItems.length === 0) {
      setShowDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [filteredItems]); 

  function handleSave() {
    // Logic to save the new expense
    const ExpenseData = {
      id: Math.random().toString(),
      title: document.getElementById('Title').value,
      amount: document.getElementById('Amount').value,
      date: new Date(document.getElementById('date').value)
    };
    setExpenses(pervExpenses => [...pervExpenses,ExpenseData]);
    console.log('Expense saved!');
    setShowInputBox(false);
  }

  function handleDelete(id) {
    // Logic to save the new expense
    console.log(id);
    const ExpenseData = expenses.filter((item) => item.id !== id);
    setExpenses(ExpenseData);
    console.log('Expense Deteled!');
  }


  useEffect(() => {
      console.log('Updated expenses:', expenses);
    }, [expenses]);

  


  return (
    <div className="expenses">
      <ExpensesFilter selected={selectedYear} selectedYear={handleYearChange} expensesData={expenses} />
       {showDialog && (
        <ErrorModule
          message={`No items found for ${selectedYear}.`}
          open={showDialog}
          onClose={() => {setShowDialog(false)
            setSelectedYear(expenses[0].date.getFullYear().toString());
          }
          }
        />
      )}
      {filteredItems.map((item) => (
          <ExpenseItem
            key={item.id}
            title={item.title}
            amount={item.amount}
            date={item.date}
            onDelete= {() => handleDelete(item.id)}
          />
          
        ))
      }
      <button onClick={() => setShowInputBox(true)}>Add Expense</button>
      {showInputBox && (<InputModule
          open={showInputBox}
          onClose={() => setShowInputBox(false)}
          onSave={handleSave}
        >
          <h2>Input Expense Details Here</h2>
          <input  id="Title" type="text" placeholder="Title" /><br/>
          <input  id="Amount" type="number" placeholder="Amount" /><br/>
          <input  id="date" type="date" /><br/>  
        </InputModule>  
      )}

    </div>
  );
 
}

export default Expenses;