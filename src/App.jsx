import Errormodule from './components/Errormodule.jsx';
import Expenses from './components/Expenses.jsx';
import './App.css';
import expenses from './data/expenses.js';

function App() { 

  return (
    <>
      <div>
        <img src="src/assets/react.svg" alt="React Logo" className='logo' width="100" />
        <h2>Let's get started!</h2>
        <Expenses />
      </div>
    </>
  );
}

export default App;