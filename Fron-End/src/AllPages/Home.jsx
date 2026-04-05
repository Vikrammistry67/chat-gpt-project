import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion'; // Install via: npm install framer-motion
import { ArrowRight, Cpu, Zap, Shield, ChevronRight } from 'lucide-react'; // Install via: npm install lucide-react

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(0);
    const { scrollY } = useScroll();

    // Parallax values for hero elements
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const premiumStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
        
        body { background-color: #000; margin: 0; overflow-x: hidden; }
        
        .noise {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: url('https://grainy-gradients.vercel.app/noise.svg');
            opacity: 0.05; pointer-events: none; z-index: 9999;
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(59, 130, 246, 0.3);
            transform: translateY(-5px);
        }

        .hero-gradient {
            background: radial-gradient(circle at 50% 50%, #1e40af 0%, transparent 50%);
            filter: blur(120px);
            opacity: 0.15;
        }

        .glow-btn {
            position: relative;
            overflow: hidden;
            transition: 0.3s;
        }
        
        .glow-btn::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transform: translateX(-100%);
            transition: 0.5s;
        }

        .glow-btn:hover::after { transform: translateX(100%); }
    `;

    return (
        <div style={{ color: '#fff', paddingTop: '30px', fontFamily: '"Space Grotesk", sans-serif' }}>
            <style>{premiumStyles}</style>
            <div className="noise" />

            {/* Background Orbs */}
            <div className="hero-gradient" style={{ position: 'fixed', width: '100vw', height: '100vh', zIndex: -1 }} />

            {/* --- NAVBAR --- */}
            <nav style={{
                position: 'fixed', top: '24px', left: '50%', transform: 'translateX(-50%)',
                width: '90%', maxWidth: '1000px', zIndex: 1000,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 20px', borderRadius: '100px',
                background: scrolled > 50 ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)',
                transition: '0.4s'
            }}>
                <div style={{ fontWeight: '700', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px' }} />
                    V_GPT
                </div>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#64748b', cursor: 'pointer' }} onClick={() => navigate('/loginUser')}>LOG IN</span>
                    <button
                        onClick={() => navigate('/registerUser')}
                        className="glow-btn"
                        style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
                    >
                        GET STARTED
                    </button>
                </div>
            </nav>

            {/* --- HERO --- */}
            <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <motion.div style={{ opacity }}>
                    <div style={{ color: '#3b82f6', fontSize: '12px', fontWeight: '700', letterSpacing: '4px', marginBottom: '20px' }}>
                        NEXT-GEN COGNITION
                    </div>
                    <h1 style={{
                        fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: '700', lineHeight: 0.9,
                        letterSpacing: '-0.05em', marginBottom: '30px'
                    }}>
                        UNLIMITED <br /> <span style={{ color: '#475569' }}>INTELLIGENCE.</span>
                    </h1>
                    <p style={{ maxWidth: '600px', color: '#94a3b8', fontSize: '1.2rem', marginBottom: '40px', lineHeight: 1.6 }}>
                        Designed for the elite. Vectorized reasoning at the speed of thought.
                        Join the Vikram-exclusive neural network.
                    </p>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button
                            onClick={() => navigate('/registerUser')}
                            style={{
                                background: '#3b82f6', padding: '18px 36px', borderRadius: '12px',
                                border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '10px'
                            }}
                        >
                            Start Session <ArrowRight size={18} />

                        </button>
                    </div>
                </motion.div>
            </section>

            {/* --- BENTO GRID --- */}
            <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>

                {/* Main Feature */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card"
                    style={{ gridColumn: 'span 8', padding: '40px', borderRadius: '32px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                    <Cpu color="#3b82f6" size={32} />
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Neural Architecture</h2>
                        <p style={{ color: '#94a3b8' }}>Proprietary models optimized for extreme logic tasks and real-time synthesis.</p>
                    </div>
                </motion.div>

                {/* Metric Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="glass-card"
                    style={{ gridColumn: 'span 4', padding: '40px', borderRadius: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                >
                    <div style={{ fontSize: '4rem', fontWeight: '700', color: '#3b82f6' }}>99.9</div>
                    <div style={{ fontSize: '12px', color: '#475569', letterSpacing: '2px' }}>ACCURACY_SCORE</div>
                </motion.div>

                {/* Sub Features */}
                {['Security', 'Velocity', 'Scalability'].map((item, i) => (
                    <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={{ gridColumn: 'span 4', padding: '30px', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '15px' }}
                    >
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {i === 0 ? <Shield size={20} color="#3b82f6" /> : i === 1 ? <Zap size={20} color="#3b82f6" /> : <ChevronRight size={20} color="#3b82f6" />}
                        </div>
                        <span style={{ fontWeight: '600' }}>{item}</span>
                    </motion.div>
                ))}
            </section>

            {/* --- CTA SECTION --- */}
            <section style={{ padding: '150px 24px', textAlign: 'center' }}>
                <div style={{
                    maxWidth: '800px', margin: '0 auto', padding: '80px 40px', borderRadius: '40px',
                    background: 'linear-gradient(to bottom, #111, #000)', border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>Ready to interface?</h2>
                    <button
                        onClick={() => navigate('/registerUser')}
                        style={{ background: '#fff', color: '#000', padding: '20px 50px', borderRadius: '100px', border: 'none', fontWeight: '800', cursor: 'pointer' }}
                    >
                        JOIN THE WAITLIST
                    </button>
                </div>
            </section>

            <footer style={{ padding: '40px', textAlign: 'center', opacity: 0.4, fontSize: '12px' }}>
                V_GPT // ENCRYPTED CONNECTION ESTABLISHED // 2026
            </footer>
        </div>
    );
};

export default Home;