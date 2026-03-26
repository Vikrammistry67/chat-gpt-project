import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinkStyle = {
        background: 'none',
        border: 'none',
        color: '#94a3b8',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.2s'
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#050505',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: '"Inter", system-ui, sans-serif',
            overflowX: 'hidden'
        }}>

            {/* --- PREMIUM NAVIGATION --- */}
            <nav style={{
                width: '100%',
                height: '70px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(5, 5, 5, 0.7)',
                backdropFilter: 'blur(12px)',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>


            </nav>

            {isMobile && isMenuOpen && (
                <div style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #1f2937', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <button onClick={() => navigate('/registerUser')} style={{ textAlign: 'left', ...navLinkStyle, fontSize: '18px' }}>Register</button>
                    <button onClick={() => navigate('/loginUser')} style={{ textAlign: 'left', ...navLinkStyle, fontSize: '18px' }}>Login</button>
                </div>
            )}

            <main style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: isMobile ? '60px 24px' : '100px 24px', textAlign: 'center', position: 'relative'
            }}>

                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', background: 'rgba(16, 185, 129, 0.15)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }}></div>

                <div style={{ maxWidth: '850px', zIndex: 1 }}>
                    {/* Mini Badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '100px',
                        backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '32px', fontSize: '12px', fontWeight: '500', color: '#10b981'
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                        Built with Gemini 1.5 Pro
                    </div>

                    <h1 style={{
                        fontSize: isMobile ? '42px' : '82px', fontWeight: '800', lineHeight: '1',
                        marginBottom: '24px', letterSpacing: '-2px'
                    }}>
                        Design the <span style={{ color: '#94a3b8' }}>Future</span> with <br />
                        <span style={{
                            background: 'linear-gradient(to right, #10b981, #3b82f6)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Intelligent AI.</span>
                    </h1>

                    <p style={{
                        fontSize: isMobile ? '16px' : '20px', color: '#94a3b8', lineHeight: '1.6',
                        maxWidth: '600px', margin: '0 auto 48px auto'
                    }}>
                        Your personal workspace upgraded with vector memory and state-of-the-art reasoning. Experience the next generation of GPT.
                    </p>

                    <div style={{
                        width: '100%', maxWidth: '420px', margin: '0 auto', padding: '40px',
                        borderRadius: '32px', backgroundColor: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                    }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '28px' }}>Get Started for Free</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <button
                                onClick={() => navigate('/registerUser')}
                                style={{
                                    padding: '16px', background: '#10b981', color: 'white', borderRadius: '14px',
                                    fontWeight: '700', fontSize: '16px', border: 'none', cursor: 'pointer',
                                    transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                                }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Create Account
                            </button>

                            <button
                                onClick={() => navigate('/loginUser')}
                                style={{
                                    padding: '16px', background: 'rgba(255,255,255,0.05)', color: 'white',
                                    borderRadius: '14px', fontWeight: '600', fontSize: '16px',
                                    border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
                                }}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '13px', color: '#475569' }}>© 2026 Vikram GPT. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;