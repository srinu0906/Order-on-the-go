import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/Orders.css';

const Orders = () => {
  const { user } = useAuth();
  const [liveOrders, setLiveOrders] = useState([]);
  const [historyOrders, setHistoryOrders] = useState([]);
  const [productCache, setProductCache] = useState({}); // Cache for product info
  const [ratings, setRatings] = useState({}); // restaurantId -> rating


  const fetchProductDetails = async (productId) => {
    if (productCache[productId]) return productCache[productId];
    try {
      const res = await axios.get(`http://localhost:5000/api/products/fetch?id=${productId}`);
      if (res.data.length > 0) {
        const product = res.data[0];
        setProductCache(prev => ({ ...prev, [productId]: product }));
        return product;
      }
    } catch (err) {
      console.error('Error fetching product info:', err);
    }
    return null;
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/history?userId=${user._id}`);
      const allOrders = res.data;

      const live = allOrders.filter(o => o.status !== 'Delivered');
      const history = allOrders.filter(o => o.status == 'Delivered');

      setLiveOrders(live);
      setHistoryOrders(history);

      // Pre-fetch all product details
      const uniqueIds = [...new Set(allOrders.flatMap(order => order.items.map(i => i.productId)))];
      await Promise.all(uniqueIds.map(id => fetchProductDetails(id)));
    } catch (err) {
      console.error('Failed to fetch orders', err);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.post(`http://localhost:5000/api/orders/delete?orderId=${orderId}`);
      alert('Order cancelled.');
      fetchOrders(); // Refresh orders after cancellation
    } catch (err) {
      console.error('Error cancelling order:', err);
    }
  };

  const renderItems = (items) =>
    items.map(item => {
      const product = productCache[item.productId];
      return (
        <li key={item.productId} className="order-item">
          <img
            src={product?.imageUrl || '/images/default-food.png'}
            alt={product?.productName || item.productId}
          />
          <span>{product?.productName || item.productId} × {item.quantity}</span>
        </li>
      );
    });

  const handleRatingSubmit = async (restaurantId) => {
    const rating = ratings[restaurantId];
    if (!rating) {
      alert("Please select a rating first.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/restaurants/rating", {
        restaurantId,
        rating
      });
      alert("Rating submitted successfully!");
    } catch (err) {
      console.error("Failed to submit rating:", err);
      alert("Failed to submit rating.");
    }
  };


  return (
    <>
      <Header />
      <div className="orders-container">
        <h2>📦 Live Orders</h2>
        {liveOrders.length === 0 ? <p>No ongoing orders.</p> : (
          <div className="order-list">
            {liveOrders.map(order => (
              <div key={order._id} className="order-card">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> <span className="order-status">{order.status}</span></p>
                <p><strong>Items:</strong></p>
                <ul>{renderItems(order.items)}</ul>
                <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                <button onClick={() => handleCancelOrder(order._id)}>Cancel Order</button>
              </div>
            ))}
          </div>
        )}

        <h2>📜 Order History</h2>
        {historyOrders.map(order => (
          <div key={order._id} className="order-card">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> <span className="order-status">{order.status}</span></p>
            <p><strong>Items:</strong></p>
            <ul>{renderItems(order.items)}</ul>
            <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
            <p><strong>{new Date(order.createdAt).toDateString()} {new Date(order.createdAt).toLocaleTimeString()}</strong></p>

            {/* ⭐ Rating section */}
            <div style={{ marginTop: '10px' }}>
              <label htmlFor={`rating-${order.restaurantId}`}>Rate this order: </label>
              <select
                id={`rating-${order.restaurantId}`}
                value={ratings[order.restaurantId] || ''}
                onChange={(e) =>
                  setRatings(prev => ({ ...prev, [order.restaurantId]: parseInt(e.target.value) }))
                }
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button onClick={() => handleRatingSubmit(order.restaurantId)} style={{ marginLeft: '10px' }}>
                Submit Rating
              </button>
            </div>
          </div>
        ))}

      </div>
      <Footer />
    </>
  );
};

export default Orders;
