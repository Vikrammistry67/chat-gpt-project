import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextUser } from "../../context/UserContext";
import axios from 'axios';

const Navbar = () => {
    const { user, logout } = useContext(ContextUser);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = async () => {
        try {
            // 1. Backend call
            await axios.post('https://chat-gpt-project-4iip.onrender.com/api/auth/logoutUser', {}, { withCredentials: true });

            // 2. Clear Frontend Context
            logout();
            setIsOpen(false);

            // 3. Navigate with a Message
            navigate('/loginUser', {
                state: { message: "User logged out! Please login first." }
            });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const navLinkStyle = {
        background: 'none', border: 'none', color: '#94a3b8',
        fontSize: '14px', fontWeight: '600', cursor: 'pointer', padding: '10px'
    };

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 1000, width: '100%', height: '64px',
            backgroundColor: 'rgba(5, 5, 5, 0.8)', backdropFilter: 'blur(15px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>

                {/* Brand */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>V</div>
                    <span style={{ fontWeight: '700', color: 'white' }}>VIKRAM <span style={{ color: '#10b981' }}>GPT</span></span>
                </div>

                {/* Desktop Menu - STEP 4 LOGIC INCLUDED */}
                {!isMobile ? (
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <button onClick={() => navigate('/')} style={navLinkStyle}>Home</button>
                        {!user ? (
                            <>
                                <button onClick={() => navigate('/registerUser')} style={navLinkStyle}>Register</button>
                                <button onClick={() => navigate('/loginUser')} style={{ ...navLinkStyle, color: 'white', backgroundColor: '#10b981', borderRadius: '8px', padding: '8px 16px' }}>Login</button>
                            </>
                        ) : (
                            <button onClick={handleLogout} style={{ ...navLinkStyle, color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '50px' }}>Log out</button>
                        )}
                    </div>
                ) : (
                    <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px' }}>{isOpen ? '✕' : '☰'}</button>
                )}
            </div>

            {/* Mobile Menu Overlay */}
            {isMobile && isOpen && (
                <div style={{ position: 'absolute', top: '64px', left: 0, width: '100%', backgroundColor: '#0a0a0a', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', borderBottom: '1px solid #333' }}>
                    <button onClick={() => { navigate('/'); setIsOpen(false) }} style={navLinkStyle}>Home</button>
                    {!user ? (
                        <>
                            <button onClick={() => { navigate('/registerUser'); setIsOpen(false) }} style={navLinkStyle}>Register</button>
                            <button onClick={() => { navigate('/loginUser'); setIsOpen(false) }} style={navLinkStyle}>Login</button>
                        </>
                    ) : (
                        <button onClick={handleLogout} style={{ color: '#ef4444', padding: '10px', fontWeight: 'bold' }}>Log out</button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;