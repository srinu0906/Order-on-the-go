// File: src/pages/Profile.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
    <Header/>
    <br /><br />
    <div className="profile-page">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Username:</strong> {user?.userName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
