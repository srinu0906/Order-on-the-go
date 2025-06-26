import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/fetch?id=${id}`);
        setProduct(res.data[0]); // Assuming single match
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async (productId) => {
    try {

      if (!user) {
        navigate('/login');
        return;
    }

      await axios.post('http://localhost:5000/api/cart/addItem', {
        userId: user._id,
        productId,
        quantity
      });
      alert(`Added ${quantity} item(s) to cart`);
    } catch (err) {
      console.error('Error adding item:', err);
      alert('Cart items can only contaain items from same restaurant');
    }
  };

const handleOrderNow = async () => {
  if (!user) {
    navigate('/login');
    return;
  }
  if (!user || !product) return;

  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const now = new Date();
      const createdAt = "📌 latitude : "+latitude +" longitude "+longitude+ " 🗓️ "+now.toDateString() + " ⏰ "+now.toLocaleTimeString();

      const orderPayload = {
        userId: user._id,
        items: [
          {
            productId: product._id,
            quantity: quantity
          }
        ],
        createdAt
        
      };

      const res = await axios.post('http://localhost:5000/api/orders/place', orderPayload);
      alert('Order placed successfully!');
    }, (error) => {
      console.error('Failed to get location:', error);
      alert('Please enable location access to place the order.');
    });
  } catch (err) {
    console.error('Order failed:', err);
    alert('Failed to place order. Please try again.');
  }
};



  const getFinalPrice = () => {
    if (!product) return 0;
    const discounted = product.price * (1 - product.discount / 100);
    return (discounted * quantity).toFixed(2);
  };

  return (
    <>
      <Header />
      <br /><br />
      <div className="product-detail-container">
        {product ? (
          <div className="product-detail-top">
            <img src={product.imageUrl} alt={product.productName} />

            <div className="product-detail-info">
              <h2>{product.productName}</h2>
              <p>{product.description}</p>
              <p className="price">
                ₹{product.price}{' '}
                <span className="discount">({product.discount}% off)</span>
              </p>

              {/* Quantity control */}
              <div className="quantity-control">
                <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>−</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
              </div>

              {/* Dynamic total price */}
              <p className="total">Total: ₹{getFinalPrice()}</p>

              {/* Action buttons */}
              <div className="product-detail-actions">
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                <button onClick={handleOrderNow}>Order Now</button>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
