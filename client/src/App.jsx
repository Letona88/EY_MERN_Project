import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from "./components/NotFoundPage";
import NavBar from "./components/NavBar"; 
import DashboardHome from './components/DashboardHome';
import AccountView from './components/AccountView';
import Info from "./components/Info.jsx";
import {NewPurchase} from "./components/Purchase.jsx";
import {NewSale} from "./components/Sale.jsx";

function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-white">
        <NavBar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboardhome" element={<DashboardHome />} />
            <Route path="/purchase" element={<NewPurchase />} />
            <Route path='/newsale' element={<NewSale/>} />
            <Route path='/account' element={<AccountView/>} />
            <Route path='/info' element={<Info/>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
