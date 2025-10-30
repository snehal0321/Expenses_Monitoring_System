import Expenses from './components/Expenses.jsx';
import './App.css';
import reactLogo from './assets/FullLogo.png';

function App() { 

  return (
    <>
      <div>
        <img src={reactLogo} alt="React Logo" className='logo' width="100" />
        <Expenses />
      </div>
    </>
  );
}

export default App;