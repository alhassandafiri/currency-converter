import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import Header from "./components/Header/Header";
import RatesTable from "./components/RatesTable/RatesTable";
import NavBar from "./components/NavBar/NavBar";
import './App.css';

function AnimatedRoutes() {
  return(
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<CurrencyConverter />} />
        <Route path='/rates' element={<RatesTable />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return(
  <div className="App">
    <div className="page-header">
      <Header />
      <NavBar />
    </div>
    <div className="main-content">
      <AnimatedRoutes />
    </div>
  </div>)
}

export default App;
