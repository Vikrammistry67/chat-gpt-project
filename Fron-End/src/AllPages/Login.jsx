import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ContextUser } from '../context/UserContext';
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

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

      if (response.status === 200 || response.status === 201) {
        toast.success('Access Granted. Welcome back.', {
          position: "top-right",
          autoClose: 1500,
          theme: "dark",
        });

        setUser(response.data.user);

        setTimeout(() => {
          navigate('/gpt');
        }, 1600);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Authentication Failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    height: '60px',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '16px',
    color: '#fff',
    padding: '0 20px',
    fontSize: '15px',
    outline: 'none',
    marginBottom: '20px',
    boxSizing: 'border-box',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    fontFamily: '"Space Grotesk", sans-serif'
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      fontFamily: '"Space Grotesk", sans-serif',
      overflow: 'hidden'

    }}>

      {/* --- BACKGROUND MESH (Matches Home) --- */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', right: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }} />
      </div>

      <style>{`
        input:focus { border-color: rgba(59, 130, 246, 0.5) !important; background: rgba(59, 130, 246, 0.03) !important; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .login-card { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .submit-btn:active { transform: scale(0.98); }
      `}</style>

      {/* --- LOGIN CARD --- */}
      <div className="login-card" style={{
        width: '100%',
        maxWidth: '440px',
        marginTop: '80px',
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        backdropFilter: 'blur(40px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '35px',
        padding: isMobile ? '40px 24px' : '60px 50px',
        zIndex: 1,
        boxShadow: '0 40px 100px rgba(0, 0, 0, 0.8)',
        textAlign: 'center'
      }}>

        <div style={{
          width: '55px', height: '55px',
          background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
          borderRadius: '16px', margin: '0 auto 30px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: '950', fontSize: '22px', color: 'white',
          boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
        }}>V</div>

        <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '10px', color: 'white', letterSpacing: '-1.5px' }}>
          Welcome <span style={{ color: '#3b82f6' }}>Back</span>
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '40px', fontWeight: '500' }}>
          Resume your neural session.
        </p>

        <form onSubmit={submitHandler}>
          <input
            disabled={loading}
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder='Enter Email'
            required
          />

          <input
            disabled={loading}
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            placeholder='Enter Password'
            required
          />

          <button
            disabled={loading}
            className="submit-btn"
            type="submit"
            style={{
              width: '100%',
              height: '60px',
              background: loading ? '#1e293b' : 'linear-gradient(90deg, #3b82f6, #9333ea)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              fontWeight: '900',
              fontSize: '16px',
              letterSpacing: '1px',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 15px 35px rgba(59, 130, 246, 0.25)',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase'
            }}
          >
            {loading ? "AUTHENTICATING..." : " LOGIN"}
          </button>
        </form>

        <div style={{ marginTop: '40px', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
          New to the system? {' '}
          <span
            onClick={() => navigate('/registerUser')}
            style={{ color: '#3b82f6', cursor: 'pointer', marginLeft: '5px' }}
          >
            CREATE ID
          </span>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        toastStyle={{ borderRadius: '16px', background: '#0a0a0a', border: '1px solid #333' }}
      />
    </div>
  );
};

export default Login;