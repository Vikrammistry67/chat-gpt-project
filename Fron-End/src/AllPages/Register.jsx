import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { ContextUser } from "../context/UserContext";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const Register = () => {
    const { user, setUser } = useContext(ContextUser);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
        }

        try {
            const response = await axios.post('https://chat-gpt-project-4iip.onrender.com/api/auth/registerUser', newUser);
            if (response.status === 201 || response.status === 200) {
                toast.success('Registration successful!');
                setTimeout(() => navigate('/loginUser'), 1500);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };

    const inputStyle = {
        width: '100%',
        height: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        padding: '0 15px',
        fontSize: '14px',
        outline: 'none',
        marginBottom: '15px',
        transition: 'border 0.3s'
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            backgroundColor: '#050505',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'sans-serif'
        }}>
            {/* BACKGROUND GLOW */}
            <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'rgba(16, 185, 129, 0.1)', filter: 'blur(100px)', zIndex: 0 }}></div>

            <div style={{
                width: '100%',
                maxWidth: '450px',
                backgroundColor: 'rgba(20, 20, 20, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: isMobile ? '30px 20px' : '40px',
                zIndex: 1,
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>
                        Create <span style={{ color: '#10b981' }}>Account</span>
                    </h1>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Join the future of AI conversation</p>
                </div>

                <form onSubmit={submitHandler}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            style={inputStyle}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text" value={firstName} placeholder='First Name' required
                        />
                        <input
                            style={inputStyle}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text" value={lastName} placeholder='Last Name' required
                        />
                    </div>

                    <input
                        style={inputStyle}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" value={email} placeholder='Email Address' required
                    />

                    <input
                        style={inputStyle}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" value={password} placeholder='Password' required
                    />

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            height: '55px',
                            backgroundColor: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontWeight: '700',
                            fontSize: '16px',
                            cursor: 'pointer',
                            marginTop: '10px',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        Sign Up
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '25px' }}>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>
                        Already have an account? {' '}
                        <span
                            onClick={() => navigate('/loginUser')}
                            style={{ color: '#10b981', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Log in
                        </span>
                    </p>
                </div>
            </div>

            <ToastContainer theme="dark" />
        </div>
    )
}

export default Register;