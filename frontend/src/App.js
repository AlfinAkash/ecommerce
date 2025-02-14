import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import ProductList from './components/Products/ProductList';
import Payment from './components/Payment/Payment';
import Home from './Pages/Home';  // Ensure correct casing (P in Pages)
import Dashboard from './Pages/Dashboard';  // Ensure correct casing
import './styles.css';  // Ensure styles.css is correctly located

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/products">Products</Link>
                <Link to="/payment">Payment</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
        </Router>
    );
}

export default App;
