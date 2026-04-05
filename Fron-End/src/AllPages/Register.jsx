import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../context/UserContext";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Register = () => {
    const { setUser } = useContext(ContextUser);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            id: nanoid(),
            fullName: { firstName, lastName },
            email: email,
            password: password
        };

        try {
            const response = await axios.post('https://chat-gpt-project-4iip.onrender.com/api/auth/registerUser', newUser);
            if (response.status === 201 || response.status === 200) {
                toast.success('Welcome aboard! 🚀');
                setTimeout(() => navigate('/loginUser'), 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const inputStyle = {
        width: '100%',
        height: '52px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '14px',
        color: '#fff',
        padding: '0 18px',
        fontSize: '15px',
        outline: 'none',
        marginBottom: '18px',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box'
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#030712', // Deep Navy Black
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'Inter', system-ui, sans-serif",
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* AMBIENT BACKGROUND ELEMENTS */}
            <div style={{
                position: 'absolute', top: '10%', left: '15%',
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
                filter: 'blur(80px)', zIndex: 0
            }}></div>
            <div style={{
                position: 'absolute', bottom: '10%', right: '10%',
                width: '350px', height: '350px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                filter: 'blur(80px)', zIndex: 0
            }}></div>

            {/* MAIN CARD */}
            <div style={{
                marginTop: '90px',
                height: 'fit-content',
                width: '100%',
                maxWidth: '480px',
                backgroundColor: 'rgba(17, 24, 39, 0.7)', // Slate 900
                backdropFilter: 'blur(16px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '32px',
                padding: isMobile ? '40px 24px' : '50px',
                zIndex: 1,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '12px',
                        borderRadius: '16px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        marginBottom: '20px'
                    }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'white', letterSpacing: '-0.025em', margin: 0 }}>
                        Get <span style={{ color: '#10b981' }}>Started</span>
                    </h1>
                    <p style={{ color: '#9ca3af', fontSize: '15px', marginTop: '10px' }}>Experience the next generation of AI.</p>
                </header>

                <form onSubmit={submitHandler}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            style={inputStyle}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            type="text" value={firstName} placeholder='First Name' required
                        />
                        <input
                            style={inputStyle}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#10b981'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                            type="text" value={lastName} placeholder='Last Name' required
                        />
                    </div>

                    <input
                        style={inputStyle}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        type="email" value={email} placeholder='Email address' required
                    />

                    <input
                        style={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        type="password" value={password} placeholder='Password' required
                    />

                    <button
                        type="submit"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            width: '100%',
                            height: '55px',
                            backgroundColor: isHovered ? '#059669' : '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontWeight: '600',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                            boxShadow: isHovered ? '0 10px 25px -5px rgba(16, 185, 129, 0.4)' : '0 4px 12px rgba(16, 185, 129, 0.2)'
                        }}
                    >
                        Create Account
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                        Already a member? {' '}
                        <span
                            onClick={() => navigate('/loginUser')}
                            style={{
                                color: '#10b981',
                                cursor: 'pointer',
                                fontWeight: '600',
                                textDecoration: 'none',
                                borderBottom: '1px solid transparent',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.borderBottom = '1px solid #10b981'}
                            onMouseLeave={(e) => e.target.style.borderBottom = '1px solid transparent'}
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </div>

            <ToastContainer theme="dark" pauseOnFocusLoss={false} />
        </div>
    );
};

export default Register;