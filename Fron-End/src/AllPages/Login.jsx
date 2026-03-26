import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ContextUser } from '../context/UserContext'; // Ensure this path is correct
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { setUser } = useContext(ContextUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const location = useLocation();

  // Responsive listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show messages from logout/redirects
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.info(location.state.message);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://chat-gpt-project-4iip.onrender.com/api/auth/loginUser', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      // Handle success for status 200 or 201
      if (response.status === 200 || response.status === 201) {

        // 1. Show the Toast message immediately
        toast.success('Logged in Successfully!', {
          position: "top-right",
          autoClose: 1500, // Show for 1.5 seconds
          theme: "dark",
        });

        // 2. Update the Global Context User
        setUser(response.data.user);

        // 3. WAIT before navigating (This is why it wasn't showing before)
        setTimeout(() => {
          navigate('/gpt');
        }, 1600);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid Email or Password";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    height: '55px',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    color: '#fff',
    padding: '0 20px',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '20px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      backgroundColor: '#050505',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      fontFamily: '"Inter", sans-serif',
      overflow: 'hidden'
    }}>
      {/* Aesthetic Background Glow */}
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: 'rgba(16, 185, 129, 0.15)', filter: 'blur(100px)', zIndex: 0 }}></div>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'rgba(15, 15, 15, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '32px',
        padding: isMobile ? '40px 24px' : '50px 40px',
        zIndex: 1,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
      }}>

        <div style={{
          width: '50px', height: '50px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          borderRadius: '14px', margin: '0 auto 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '24px', color: 'white'
        }}>V</div>

        <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px', color: 'white', letterSpacing: '-1px' }}>
          Welcome <span style={{ color: '#10b981' }}>Back</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '32px' }}>
          Access your secure AI workspace
        </p>

        <form onSubmit={submitHandler}>
          <input
            disabled={loading}
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder='Email Address'
            required
          />

          <input
            disabled={loading}
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder='Password'
            required
          />

          <button
            disabled={loading}
            type="submit"
            style={{
              width: '100%',
              height: '55px',
              backgroundColor: loading ? '#064e3b' : '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div style={{ marginTop: '32px', fontSize: '14px', color: '#64748b' }}>
          Don't have an account? {' '}
          <span
            onClick={() => navigate('/registerUser')}
            style={{ color: '#10b981', fontWeight: '700', cursor: 'pointer' }}
          >
            Sign Up
          </span>
        </div>
      </div>

      {/* The Toast Container MUST be present here */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;