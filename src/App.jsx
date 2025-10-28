import Expenses from './components/Expenses.jsx';
import './App.css';
import reactLogo from './assets/react.svg';

function App() { 

  return (
    <>
      <div>
        <img src={reactLogo} alt="React Logo" className='logo' width="100" />
        <h2>Let's get started!</h2>
        <Expenses />
      </div>
    </>
  );
}

export default App;