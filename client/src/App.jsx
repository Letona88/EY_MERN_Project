import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from "./components/NotFoundPage";
import NavBar from "./components/NavBar"; 
import AccountView from './components/AccountView';
import Info from "./components/Info.jsx";
import {NewPurchase} from "./components/Purchase.jsx";
import {NewSale} from "./components/Sale.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ManageStock from "./components/ManageStock.jsx";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-white">
        <NavBar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/purchase" element={<NewPurchase />} />
            <Route path='/newsale' element={<NewSale/>} />
            <Route path='/account' element={<AccountView/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/manage' element={<ManageStock/>} />
            <Route path='/info' element={<Info/>} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<Dashboard/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
