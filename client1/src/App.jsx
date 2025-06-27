// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import RestaurantRegister from './pages/restaurant/RestaurantRegister';
import RestaurantLogin from './pages/restaurant/RestaurantLogin';
import RestaurantDashboard from './pages/restaurant/RestaurantDashBoard';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/restaurant/register" element={<RestaurantRegister />} />
        <Route path="/restaurant/login" element={<RestaurantLogin />} />
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />

        <Route path="/admin" element={<AdminPage />} /> {/* ✅ add this line */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
