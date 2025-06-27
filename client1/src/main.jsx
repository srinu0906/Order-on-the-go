import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { RestaurantAuthProvider } from './context/RestaurantAuthContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx'; // ✅ import

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RestaurantAuthProvider>
      <AdminAuthProvider> {/* ✅ wrap your app */}
        <App />
      </AdminAuthProvider>
    </RestaurantAuthProvider>
  </AuthProvider>
);
