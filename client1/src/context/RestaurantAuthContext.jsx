import { createContext, useContext, useState, useEffect } from 'react';

const RestaurantAuthContext = createContext();

export const RestaurantAuthProvider = ({ children }) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('restaurant');
    if (stored) {
      setRestaurant(JSON.parse(stored));
    }
  }, []);

  const login = (data) => {
    setRestaurant(data);
    localStorage.setItem('restaurant', JSON.stringify(data));
  };

  const logout = () => {
    setRestaurant(null);
    localStorage.removeItem('restaurant');
    localStorage.removeItem('restaurantToken'); // Optional
  };

  return (
    <RestaurantAuthContext.Provider value={{ restaurant, login, logout }}>
      {children}
    </RestaurantAuthContext.Provider>
  );
};

export const useRestaurantAuth = () => useContext(RestaurantAuthContext);
