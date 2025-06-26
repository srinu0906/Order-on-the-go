import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { RestaurantAuthProvider } from './context/RestaurantAuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RestaurantAuthProvider>
      <App />
    </RestaurantAuthProvider>
  </AuthProvider>
);
