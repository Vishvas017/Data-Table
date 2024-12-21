import './App.css';
import Navbar from './components/navbar'; // Ensure Navbar component is correctly imported
// import Privatepage from './components/Privatepage';
import Product from './components/Product';
import Allroutes from './Routes/Allroutes';

function App() {
  return (
    <>
      {/* <Privatepage/> */}

    <Navbar/>
    <Allroutes/>

    </>
  );
}

export default App;
