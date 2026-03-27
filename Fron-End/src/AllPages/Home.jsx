import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Animation Styles
    const animations = `
        @keyframes meshMove {
            0% { transform: translate(0,0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0,0) scale(1); }
        }
        @keyframes textReveal {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .bento-card { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); cursor: pointer; }
        @media (hover: hover) {
            .bento-card:hover { transform: translateY(-10px); border-color: rgba(59, 130, 246, 0.4) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        }
        .bento-card:active { transform: scale(0.96); }
    `;

    return (
        <div style={{
            backgroundColor: '#000',
            color: '#fff',
            minHeight: '100vh',
            fontFamily: '"Space Grotesk", sans-serif',
            overflowX: 'hidden'
        }}>
            <style>{animations}</style>

            {/* --- DYNAMIC MESH BACKGROUND --- */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                <div style={{
                    position: 'absolute', top: '-10%', left: '-10%', width: '70%', height: '70%',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)',
                    filter: 'blur(80px)', animation: 'meshMove 15s infinite linear'
                }} />
                <div style={{
                    position: 'absolute', bottom: '0%', right: '-10%', width: '60%', height: '60%',
                    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)',
                    filter: 'blur(100px)', animation: 'meshMove 10s infinite linear reverse'
                }} />
            </div>

            {/* --- FLOATING NAV --- */}
            <nav style={{
                position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)',
                width: '90%', maxWidth: '1200px', zIndex: 1000,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 24px', borderRadius: '100px',
                background: scrolled > 20 ? 'rgba(10, 10, 10, 0.7)' : 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(15px)', border: '1px solid rgba(255,255,255,0.08)',
                transition: '0.4s ease'
            }}>
                <div style={{ fontSize: '20px', fontWeight: '900', letterSpacing: '-1.5px' }}>V.GPT</div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => navigate('/loginUser')} style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>LOGIN</button>
                    <button onClick={() => navigate('/registerUser')} style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '800', cursor: 'pointer' }}>JOIN</button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <section style={{ 
                height: '100vh', display: 'flex', flexDirection: 'column', 
                justifyContent: 'center', alignItems: 'center', textAlign: 'center', 
                padding: '0 24px', position: 'relative', zIndex: 10 
            }}>
                <div style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa', fontSize: '11px', fontWeight: '800', letterSpacing: '1.5px', marginBottom: '32px',
                    animation: 'textReveal 0.8s ease-out'
                }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#60a5fa', boxShadow: '0 0 10px #60a5fa' }}></span>
                    SYSTEM ONLINE_v2.0
                </div>

                <h1 style={{ 
                    fontSize: isMobile ? '68px' : '150px', fontWeight: '950', 
                    letterSpacing: isMobile ? '-4px' : '-12px', lineHeight: '0.82', marginBottom: '32px',
                    background: 'linear-gradient(to bottom, #fff 60%, #475569)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    animation: 'textReveal 1s ease-out 0.2s backwards'
                }}>
                    BEYOND <br /> HUMAN.
                </h1>

                <p style={{ 
                    fontSize: isMobile ? '18px' : '22px', color: '#94a3b8', 
                    maxWidth: '550px', margin: '0 auto 48px', lineHeight: '1.4',
                    animation: 'textReveal 1s ease-out 0.4s backwards'
                }}>
                    The future of synthetic reasoning is here. <br /> Built for Vikram. Vectorized. Infinite.
                </p>

                <div style={{ display: 'flex', gap: '15px', width: isMobile ? '100%' : 'auto', animation: 'textReveal 1s ease-out 0.6s backwards' }}>
                    <button 
                        onClick={() => navigate('/registerUser')}
                        style={{ 
                            flex: 1, padding: '20px 45px', borderRadius: '16px', background: '#3b82f6', 
                            color: '#fff', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer',
                            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.25)'
                        }}
                    >
                        Initialize Link
                    </button>
                </div>
            </section>

            {/* --- RESPONSIVE BENTO SECTION --- */}
            <section style={{ 
                maxWidth: '1200px', margin: '0 auto', padding: '24px', 
                display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)', 
                gap: '16px', position: 'relative', zIndex: 10 
            }}>
                
                {/* Big Card */}
                <div className="bento-card" style={{ 
                    gridColumn: isMobile ? 'auto' : 'span 8', minHeight: '380px', 
                    background: 'rgba(15, 15, 15, 0.4)', backdropFilter: 'blur(40px)', 
                    borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.05)', 
                    padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <div>
                        <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '800', marginBottom: '10px' }}>01_CORE_MASTERY</div>
                        <h2 style={{ fontSize: isMobile ? '32px' : '42px', fontWeight: '900', letterSpacing: '-1.5px' }}>High-Precision <br/> Vector Search.</h2>
                    </div>
                    <div style={{ width: '60px', height: '2px', background: '#3b82f6' }}></div>
                </div>

                {/* Speed Card */}
                <div className="bento-card" style={{ 
                    gridColumn: isMobile ? 'auto' : 'span 4', height: '380px', 
                    background: 'rgba(255, 255, 255, 0.02)', borderRadius: '32px', 
                    border: '1px solid rgba(255, 255, 255, 0.05)', padding: '32px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center'
                }}>
                    <div style={{ fontSize: '72px', fontWeight: '950', color: '#3b82f6' }}>0.2s</div>
                    <div style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '4px', color: '#475569' }}>LATENCY_P99</div>
                </div>

                {/* Full Width Call-to-Action */}
                <div className="bento-card" style={{ 
                    gridColumn: isMobile ? 'auto' : 'span 12', padding: isMobile ? '60px 24px' : '100px 40px', 
                    background: 'linear-gradient(135deg, #0f172a, #000)', borderRadius: '32px', 
                    border: '1px solid rgba(255, 255, 255, 0.05)', textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: isMobile ? '36px' : '64px', fontWeight: '900', marginBottom: '40px', letterSpacing: '-3px' }}>The Evolution Begins.</h3>
                    <button 
                        onClick={() => navigate('/registerUser')}
                        style={{ padding: '20px 50px', borderRadius: '100px', background: '#fff', color: '#000', border: 'none', fontSize: '16px', fontWeight: '800', cursor: 'pointer' }}
                    >
                        START YOUR SESSION
                    </button>
                </div>
            </section>

            <footer style={{ padding: '80px 24px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.03)', color: '#475569', fontSize: '11px', letterSpacing: '2px' }}>
                © 2026 VIKRAM_GPT_OS // ALL SYSTEMS OPERATIONAL
            </footer>
        </div>
    );
};

export default Home;