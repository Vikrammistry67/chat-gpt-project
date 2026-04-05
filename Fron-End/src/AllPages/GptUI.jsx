import React, { useState, useEffect, useRef } from 'react';

const GPTUI = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [input, setInput] = useState('');
    const [messages] = useState([
        { role: 'bot', content: 'Header removed. The chat now utilizes 100% of the vertical screen real estate.' }
    ]);

    const scrollRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    console.log('')

    const isMobile = windowWidth < 768;

    const IconMenu = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
    const IconSend = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>;

    return (
        <div style={{ display: 'flex',height: '100dvh', width: '100vw', backgroundColor: '#050505', color: '#ececec', overflow: 'hidden', margin: 0, padding: 0 }}>

            {/* 1. SIDEBAR */}
            <aside
                style={{
                    width: '260px',
                    marginTop: '100px',
                    backgroundColor: '#0D0D0D',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    zIndex: 1000,
                    position: isMobile ? 'fixed' : 'relative',
                    height: '100%',
                    transform: (isMobile && !isSidebarOpen) ? 'translateX(-100%)' : 'translateX(0)',
                }}
            >
                {/* Brand & New Chat Section */}
                <div style={{ padding: '40px 16px 20px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', padding: '0 8px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>V</div>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px' }}>VIKRAM.GPT</span>
                    </div>
                    <button style={{ width: '100%', padding: '14px', backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
                        + New Chat
                    </button>
                </div>

                {/* History */}
                <nav style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
                    <p style={{ fontSize: '10px', color: '#444', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px', paddingLeft: '8px' }}>History</p>
                    {['Project Beta', 'Auth Fix', 'UI Design'].map((t, i) => (
                        <div key={i} style={{ padding: '12px', fontSize: '14px', color: '#888', borderRadius: '8px', cursor: 'pointer', transition: '0.2s' }}>{t}</div>
                    ))}
                </nav>

                {/* Bottom Sidebar Actions */}
                <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button style={{ width: '100%', padding: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                        LOGOUT
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, position: 'relative' }}>

                {/* FLOATING MOBILE MENU BUTTON */}
                {isMobile && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, background: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}
                    >
                        <IconMenu />
                    </button>
                )}

                {/* CHAT MESSAGES - Now starts from the very top */}
                <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '80px 16px 20px 16px' : '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '760px' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                    backgroundColor: msg.role === 'user' ? '#4F46E5' : '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)'
                                }}>
                                    <span style={{ fontSize: '10px', fontWeight: 'bold' }}>{msg.role === 'user' ? 'U' : 'AI'}</span>
                                </div>
                                <div style={{ color: msg.role === 'user' ? 'white' : '#d1d1d1', fontSize: '15px', lineHeight: '1.7', flex: 1, paddingTop: '4px' }}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div style={{ height: '150px' }} />
                    </div>
                </div>

                {/* INPUT BAR */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: isMobile ? '20px 16px 30px 16px' : '30px 20px 50px 20px',
                    background: 'linear-gradient(transparent, #050505 50%)',
                    display: 'flex', justifyContent: 'center'
                }}>
                    <div style={{ width: '100%', maxWidth: '760px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#0D0D0D', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px', padding: '8px 12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message Vikram.GPT..."
                                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', padding: '12px', fontSize: '15px' }}
                            />
                            <button style={{ padding: '12px', backgroundColor: 'white', border: 'none', borderRadius: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconSend />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Overlay */}
                {isMobile && isSidebarOpen && (
                    <div
                        onClick={() => setSidebarOpen(false)}
                        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 900 }}
                    />
                )}
            </main>
        </div>
    );
};

export default GPTUI;