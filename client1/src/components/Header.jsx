import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src="/images/logo1.png" alt="SBfoods" />
        <span>
          SB<span className="red">foods</span>
        </span>
      </div>

      {/* Search */}
      <input
        className="search"
        type="text"
        placeholder="Search for food or restaurants..."
      />

      {/* Buttons */}
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      ) : (
        <div className="user-section">
          <button onClick={() => navigate('/cart')}>🛒 Cart</button>
          <button onClick={() => navigate('/profile')}>👤 Profile</button>
        </div>
      )}
    </header>
  );
};

export default Header;
