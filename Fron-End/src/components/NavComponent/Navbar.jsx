import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextUser } from "../../context/UserContext";
import axios from 'axios';

const Navbar = () => {
    const { user, logout } = useContext(ContextUser);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        const handleScroll = () => setScrolled(window.scrollY);

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('https://chat-gpt-project-4iip.onrender.com/api/auth/logoutUser', {}, { withCredentials: true });
            logout();
            setIsOpen(false);
            navigate('/loginUser', { state: { message: "User logged out! Please login first." } });
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Shared Styles
    const glassStyle = {
        background: scrolled > 20 ? 'rgba(10, 10, 10, 0.8)' : 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    };

    const navLinkStyle = {
        background: 'none', border: 'none', color: '#94a3b8',
        fontSize: '13px', fontWeight: '700', cursor: 'pointer',
        padding: '8px 16px', letterSpacing: '1px', textTransform: 'uppercase',
        transition: '0.3s'
    };

    return (
        <>
            <style>{`
                @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
                .nav-link:hover { color: #fff !important; text-shadow: 0 0 10px rgba(255,255,255,0.5); }
                .logout-btn:hover { background: rgba(239, 68, 68, 0.1) !important; color: #ef4444 !important; border-color: #ef4444 !important; }
            `}</style>

            <nav style={{
                position: 'fixed',
                top: isMobile ? '10px' : '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '1200px',
                height: '64px',
                zIndex: 1000,
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'slideDown 0.8s ease-out forwards',
                ...glassStyle
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px'
                }}>

                    {/* Brand/Logo */}
                    <div
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        <div style={{
                            width: '32px', height: '32px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #9333ea 100%)',
                            borderRadius: '8px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', fontWeight: '900', fontSize: '14px', color: 'white'
                        }}>V</div>
                        <span style={{ fontWeight: '900', color: 'white', letterSpacing: '-1px', fontSize: '18px' }}>
                            VIKRAM<span style={{ color: '#3b82f6' }}>.GPT</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    {!isMobile ? (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <button onClick={() => navigate('/')} className="nav-link" style={navLinkStyle}>Home</button>
                            {!user ? (
                                <>
                                    <button onClick={() => navigate('/registerUser')} className="nav-link" style={navLinkStyle}>Register</button>
                                    <button
                                        onClick={() => navigate('/loginUser')}
                                        style={{
                                            background: '#fff', color: '#000', border: 'none',
                                            padding: '10px 24px', borderRadius: '100px',
                                            fontSize: '12px', fontWeight: '900', cursor: 'pointer',
                                            marginLeft: '10px', boxShadow: '0 10px 20px rgba(255,255,255,0.1)'
                                        }}
                                    >LOGIN</button>
                                </>
                            ) : (
                                <button
                                    onClick={handleLogout}
                                    className="logout-btn"
                                    style={{
                                        ...navLinkStyle,
                                        color: '#ef4444',
                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                        borderRadius: '50px',
                                        fontSize: '11px'
                                    }}
                                >LOGOUT</button>
                            )}
                        </div>
                    ) : (
                        /* Mobile Toggle */
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}
                        >
                            {isOpen ? '✕' : '☰'}
                        </button>
                    )}
                </div>

                {/* Mobile Menu Overlay */}
                {isMobile && isOpen && (
                    <div style={{
                        position: 'absolute', top: '75px', left: '0', width: '100%',
                        background: 'rgba(10, 10, 10, 0.95)', backdropFilter: 'blur(20px)',
                        padding: '30px', borderRadius: '30px', display: 'flex',
                        flexDirection: 'column', gap: '20px', border: '1px solid rgba(255, 255, 255, 0.05)',
                        textAlign: 'center'
                    }}>
                        <button onClick={() => { navigate('/'); setIsOpen(false) }} style={navLinkStyle}>Home</button>
                        {!user ? (
                            <>
                                <button onClick={() => { navigate('/registerUser'); setIsOpen(false) }} style={navLinkStyle}>Register</button>
                                <button
                                    onClick={() => { navigate('/loginUser'); setIsOpen(false) }}
                                    style={{ ...navLinkStyle, background: '#fff', color: '#000', borderRadius: '100px' }}
                                >Login</button>
                            </>
                        ) : (
                            <button onClick={handleLogout} style={{ color: '#ef4444', fontWeight: '900', background: 'none', border: 'none', letterSpacing: '2px' }}>LOGOUT</button>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;