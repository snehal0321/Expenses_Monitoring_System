import { useEffect,useState } from 'react';    
import ExpenseItem from './ExpenseItem.jsx';
import './Expenses.css';
import ExpensesFilter from './ExpensesFilter.jsx';
import ErrorModule from './ErrorModule.jsx';
import InputModule from './InputModel.jsx';
import expensesData   from '../data/expenses.js';

function Expenses() {

    const [selectedYear ,setSelectedYear] = useState(expensesData[0].date.toLocaleString('default', { month: 'long' }));
    const [showDialog, setShowDialog] = useState(false);
    const [showInputBox, setShowInputBox] = useState(false);
    const [expenses, setExpenses] = useState(expensesData);
    const [error, setError] = useState('');  

    const items = expenses;

    function handleYearChange(year){
        setSelectedYear(year);
    }

  const filteredItems = items.filter(
    (item) => item.date.toLocaleString('default', { month: 'long' }) === selectedYear
  );

  useEffect(() => {
    if (filteredItems.length === 0) {
      setShowDialog(true);
      setError(`No items found for ${selectedYear}.`);
    } else {
      // setShowDialog(false);
      // setError('');
    }
  }, [filteredItems]); 

  async function handleSave() {
    // Logic to save the new expense
    try   {
      if(document.getElementById('Title').value === ''){
        throw new Error('Title fields are required!');}
      if(document.getElementById('Amount').value === ''){
        throw new Error('Amount fields are required!');}
      if(document.getElementById('date').value === ''){
        throw new Error('Date fields are required!');
      }
    } catch (error) {
      setShowDialog(true);
      setError(error.message);
      return;
    }
    const ExpenseData = {
      id: Math.random().toString(),
      title: document.getElementById('Title').value,
      amount: document.getElementById('Amount').value,
      date: new Date(document.getElementById('date').value)
    };
     setExpenses(pervExpenses => [...pervExpenses,ExpenseData]);
    // console.log('Expense saved!');
     const response = await fetch('https://expenses-monitoring-system-1.onrender.com/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },  
        body: JSON.stringify(ExpenseData)
      });
      const data = await response.json();
      console.log('Saved:', data);
      setShowInputBox(false);
              
        return response.data;
       
  }

  function handleDelete(id) {
    const ExpenseData = expenses.filter((item) => item.id !== id);
    setExpenses(ExpenseData);
  }

  useEffect(() => {
      console.log('Updated expenses:', expenses);
    }, [expenses]);

  const Totalamount = filteredItems.reduce((total, item) => total + parseFloat(item.amount), 0);


  return (
    <div className="expenses">
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

      <ExpensesFilter selected={selectedYear} selectedYear={handleYearChange} expensesData={expenses} />
       {showDialog && (
        <ErrorModule
          // message={`No items found for ${selectedYear}.`}
          message={error}
          open={showDialog}
          onClose={() => {setShowDialog(false)
            setSelectedYear(expenses[0].date.toLocaleString('default', { month: 'long' }));
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
      <div className="item__price">
        <h3>Total Expense in {selectedYear} :</h3>
        <h3>₹{Totalamount.toFixed(2)}</h3>
      </div>

    </div>
  );
 
}

export default Expenses;